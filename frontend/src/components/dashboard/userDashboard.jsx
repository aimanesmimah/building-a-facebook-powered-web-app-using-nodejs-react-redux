import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import AppTemplate from '../appTemplate';
import {StyledAppTitle,SuccessMessage,StyledPicsGrid,ErrorMessage} from '../../styledComponents/styledComponents';
import FacebookButton from './facebookButton';
import FacebookAuth from 'react-facebook-auth';
import Cookies from 'universal-cookie';
import Lightbox from 'react-image-lightbox';
import PhotoItem from './photoItem';
import {firebaseStorage} from '../firebase/firebaseConfig';
import {updateUser,updateUserConnection,updateUserFB,updatePhotos,removeAllPhotos,
      updateLoading,updateLoadingLoaded,updateLoadingUploaded,
      updateLoadedUpload,resetUserDashboard,updateErrorUserDashboard,
      updateLighbox,updatePhotoIndex}
      from '../../store/actions';

export default class UserDashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
    }

    this.authenticate = this.authenticate.bind(this);
    this.handleUploadFirebase = this.handleUploadFirebase.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  componentWillMount() {
    //this.setState({loading : true});
    const {store} = this.context;

    const cookies = new Cookies();
    if(cookies.get('userToken') && !store.getState().user.connected){
      store.dispatch(updateUserConnection(true));
    }

    fetch('/index/account',{method: "get",
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization' : cookies.get('userToken') }
       } )
       .then(res =>{  console.log(res); return  res.json(); })
       .then(data => {
            //alert(JSON.stringify(data));
            store.dispatch(updateUser(data.userId,data.email,data.photo));
            //this.setState({loading: false});
       })
       .catch(err => {
            //alert('failure');
            //this.setState({loading: false});
       });

  }

  authenticate(response){
    const {store} = this.context;

    //this.setState({loading : true,loadingMessage:"loading your fb pictures"});
    store.dispatch(updateLoading(true,"loading your fb pictures"));
    fetch('/auth/facebook'  ,{method: "post",
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json' },
         body: JSON.stringify({access_token: response.accessToken})
            })
       .then(res =>{  console.log(res); return  res.json(); })
       .then(data => {
           if(data.success){

                //this.setState({loading : false,loaded :true});
                store.dispatch(updateLoadingLoaded(false,true));
                setTimeout(()=> {
                  //this.setState({loaded : false,upload : true});
                  store.dispatch(updateLoadedUpload(false,true));
                },2000);
                const user = data.user.profile ;

                store.dispatch(
                  updateUserFB(true,user.id,user.displayName,user._json.email,user.photos[0].value)
                );

                store.dispatch(removeAllPhotos());
                data.user.pics.map((pic,i) => {
                  const id = pic.name.toString().split('.')[0];
                  store.dispatch(updatePhotos(pic.name,pic.url,id));
                  return ;
                });

           }
           else{
             //this.setState({loading : false});
             store.dispatch(updateLoading(false));
             store.dispatch(updateErrorUserDashboard(true,"sorry, something went wrong"));
             setTimeout(()=>{
               store.dispatch(updateErrorUserDashboard(false));
             },5000);
           }

       })
       .catch(err => {

            //alert("server doesn't respond : " + err);
            //this.setState({loading : false});
            store.dispatch(updateLoading(false));
            store.dispatch(updateErrorUserDashboard(true,"the server doesn't respond"));
            setTimeout(()=>{
              store.dispatch(updateErrorUserDashboard(false));
            },5000);
       });

  }

  handleUploadFirebase(e){

    const {store} = this.context ;
    const {photos,user} = this.context.store.getState();

    var uploadphotos = photos.filter((photo)=> {
      return photo.checked !== false
    });

    if(uploadphotos.length === 0){
       //alert('you have selected no picture');
       store.dispatch(
         updateErrorUserDashboard(true,"you have selected no picture"));
         setTimeout(()=>{
           store.dispatch(updateErrorUserDashboard(false));
         },5000);
    }
    else{
      //this.setState({loading : true,loadingMessage:"uploading to firebase"});
      store.dispatch(updateLoading(true,"uploading to firebase"));
      uploadphotos.map((photo,i) => {
        fetch(photo.url)
      .then(res => res.blob())
      .then(blob => {
        //alert(user.id);
        var storageRef = firebaseStorage.ref('facebookimages/' + user.id + '/' + photo.id);
        storageRef.put(blob);
        if(i + 1 === uploadphotos.length){
          //this.setState({uploaded : true,loading:false});
          store.dispatch(updateLoadingUploaded(false,true));
          setTimeout(()=>{
            /*this.setState({
              loaded : false,
              upload : false,
              uploaded : false
            });*/
            store.dispatch(resetUserDashboard());
          },2000);
       }


        })
        .catch(err => {
          //alert(err);
          store.dispatch(updateLoading(false));
          store.dispatch(
            updateErrorUserDashboard(true,"an error occured while uploading. Try later"));
            setTimeout(()=>{
              store.dispatch(updateErrorUserDashboard(false));
            },5000);
        });
        return;
      });

    }


  }

  handlePhotoClick(index){
    const {store} = this.context ;
    const {photos} = this.context.store.getState();
    this.images = [];

    photos.map((photo,i)=> {
      this.images.push(photo.url);
    });

    store.dispatch(updatePhotoIndex(parseInt(index)-1));
    store.dispatch(updateLighbox(true));


  }

  componentDidMount() {
  }

  componentWillUnMount(){
  }

  render() {
    const {loading,loaded,upload,uploaded} = this.state ;
    const {store} = this.context;
    const {user,userFB,photos,userDashboard} = this.context.store.getState();
    return (
      (user.connected)?
      <AppTemplate title="dashboard">
        <div>
          <StyledAppTitle>
            start off by uploading your facebook images and manage it all from here
          </StyledAppTitle>
        </div>
        <br/>
        {
          (userDashboard.error)? <ErrorMessage>{userDashboard.errorMessage}</ErrorMessage> : ""
        }
        <div>
          {
            (userDashboard.upload)?
              <FacebookButton onClick={(e)=>this.handleUploadFirebase(e)} /> :
              <FacebookAuth appId="1516102205104324"
                            callback={this.authenticate}
                            component={FacebookButton} />
          }
        </div>
        <StyledPicsGrid>
          { (photos.length)?
               photos.map((photo,i) =>
                      <PhotoItem key={i} onClick={this.handlePhotoClick} url={photo.url}
                        photoId={photo.id} checked={photo.checked} />

                ) : ""
          }
        </StyledPicsGrid>
        {
          userDashboard.isLightboxOpen &&
             <Lightbox
                  mainSrc={this.images[userDashboard.photoIndex]}
                  nextSrc={this.images[(userDashboard.photoIndex + 1) % this.images.length]}
                  prevSrc={this.images[(userDashboard.photoIndex + this.images.length - 1) % this.images.length]}
                  onCloseRequest={() => store.dispatch(updateLighbox(false))}
                  onMovePrevRequest={() => store.dispatch(
                       updatePhotoIndex((userDashboard.photoIndex + this.images.length - 1) % this.images.length)
                                    )
                                     }
                  onMoveNextRequest={() => store.dispatch(
                    updatePhotoIndex((userDashboard.photoIndex + 1) % this.images.length)
                  )  }
             />
        }
      </AppTemplate> :
      <Redirect to='/signIn' />
    );
  }

}

UserDashboard.contextTypes = {
  store : PropTypes.object
}
