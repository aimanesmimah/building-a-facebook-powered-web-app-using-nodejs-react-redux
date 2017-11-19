/**
 * Created by cloudStrife on 18/09/2017.
 */
import C from './constants';

export const user = (state={},action) => {
  switch (action.type) {
    case C.UPDATE_USER:
      return {
        ...state,
        id : action.id,
        email : action.email ,
        photo : action.photo
      }
    case C.UPDATE_USER_CONNECTION :
      return {
        ...state,
        connected : action.connected
      }
    default:
      return state ;

  }
}

export const userFB = (state={},action) => {
  switch (action.type) {
    case C.UPDATE_USERFB:
      return {
        available : action.available,
        accountId : action.accountId ,
        displayName : action.displayName,
        email : action.email ,
        profilePic : action.profilePic
      }
    default:
      return state ;
  }
}

export const photos = (state = [] , action) => {
  switch (action.type) {
    case C.ADD_PHOTO:
      return [
        ...state,
        photo({},action)
      ]
    case C.UPDATE_CHECKED_PHOTO :
      return state.map(pic => photo(pic,action)) ;
    case C.REMOVE_ALL_PHOTOS :
      return []
    default:
      return state ;

  }
}

export const photo = (state = {} ,action ) => {
  switch (action.type) {
    case C.ADD_PHOTO:
      return {
        id : action.id,
        src : action.src,
        url : action.url,
        checked : false
      }
    case C.UPDATE_CHECKED_PHOTO :
      return (state.id !== action.id)?
         state : {
           ...state,
           checked : action.checked
         }
    default:
      return state ;

  }
}

export const signup = (state = {} ,action) => {
  switch (action.type) {
    case C.UPDATE_SIGNUP:
      return {
        ...state,
        success : action.success,
        error : action.error ,
        message : action.message,
        email : action.email ,
        password : action.password
      }
    case C.UPDATE_SIGNUP_FIELD_ERROR :
      return {
        ...state,
        fieldErrorMessage : action.fieldErrorMessage
      }
    default:
      return state;

  }
}

export const signin = (state = {} , action) => {
  switch (action.type) {
    case C.UPDATE_SIGNIN:
      return {
        error : action.error,
        message : action.message
      }
    default:
      return state;

  }
}

export const userDashboard = (state = {},action) => {
  switch (action.type) {
   case C.UPDATE_ERROR_USER_DASHBOARD :
     return {
       ...state,
       error : action.error,
       errorMessage : action.errorMessage
     }
   case C.UPDATE_LOADING:
     return {
       ...state,
       loading : action.loading,
       loadingMessage : action.message
     }
   case C.UPDATE_LOADED:
     return {
       ...state,
       loaded : action.loaded
     }
   case C.UPDATE_UPLOAD :
     return {
       ...state,
       upload : action.upload
     }
   case C.UPDATE_UPLOADED :
     return {
         ...state,
         uploaded : action.uploaded
     }
   case C.UPDATE_LOADING_LOADED :
     return {
           ...state,
           loading : action.loading,
           loaded: action.loaded
       }
   case C.UPDATE_LOADED_UPLOAD :
     return {
         ...state,
         loaded : action.loaded,
         upload : action.upload
     }
   case C.UPDATE_LOADING_UPLOADED :
     return {
       ...state,
       loading : action.loading,
       uploaded : action.uploaded
     }
   case C.RESET_USER_DASHBOARD :
     return {
       loading : false ,
       loaded : false ,
       upload : false ,
       uploaded : false
     }
   case C.UPDATE_LIGHTBOX :
     return {
       ...state,
       isLightboxOpen : action.isOpen
     }
   case C.UPDATE_PHOTO_INDEX :
     return {
        ...state,
        photoIndex : action.photoIndex
     }
   default :
     return state;

 }
}
