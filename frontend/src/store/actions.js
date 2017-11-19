import C from './constants';



export const addPhoto = (src) =>
({
   type : C.ADD_PHOTO,
   src
})

export const updatePhotos = (id,url) =>
({
  type : C.ADD_PHOTO,
  id,
  url
})

export const updateCheckedPhoto = (id,checked) =>
({
  type : C.UPDATE_CHECKED_PHOTO,
  id,
  checked
})

export const removeAllPhotos = () =>
({
  type : C.REMOVE_ALL_PHOTOS
})

export const updateUser = (id,email,photo=null) =>
({
  type : C.UPDATE_USER,
  id,
  email,
  photo
})

export const updateUserConnection = (connected) =>
({
  type : C.UPDATE_USER_CONNECTION,
  connected
})

export const updateUserFB = (available,accountId,displayName,email,profilePic) =>
({
  type : C.UPDATE_USERFB,
  available,
  accountId,
  displayName,
  email,
  profilePic
})

export const updateSignin = (error,message="") =>
({
  type : C.UPDATE_SIGNIN ,
  error,
  message
})

export const updateSignup = (success,error,message="",email= "",password= "") =>
({
  type : C.UPDATE_SIGNUP ,
  success,
  error,
  message,
  email,
  password
})

export const updateSignupFieldError = (fieldErrorMessage) =>
({
  type : C.UPDATE_SIGNUP_FIELD_ERROR,
  fieldErrorMessage
})


export const updateLoading = (loading,message="") =>
({
  type : C.UPDATE_LOADING,
  loading,
  message
})

export const updateLoaded = (loaded) =>
({
  type : C.UPDATE_LOADED,
  loaded
})

export const updateUpload = (upload) =>
({
  type : C.UPDATE_UPLOAD,
  upload
})

export const updateUploaded = (uploaded) =>
({
  type : C.UPDATE_UPLOADED,
  uploaded
})

export const updateLoadingLoaded = (loading,loaded) =>
({
  type : C.UPDATE_LOADING_LOADED,
  loading,
  loaded
})

export const updateLoadedUpload = (loaded,upload) =>
({
  type : C.UPDATE_LOADED_UPLOAD,
  loaded,
  upload
})

export const updateLoadingUploaded = (loading,uploaded) =>
({
  type : C.UPDATE_LOADING_UPLOADED,
  loading,
  uploaded
})

export const resetUserDashboard = () =>
({
  type : C.RESET_USER_DASHBOARD
})

export const updateErrorUserDashboard = (error,errorMessage="") =>
({
  type : C.UPDATE_ERROR_USER_DASHBOARD ,
  error,
  errorMessage
})

export const updateLighbox = (isOpen) =>
({
  type : C.UPDATE_LIGHTBOX ,
  isOpen
})

export const updatePhotoIndex = (photoIndex) =>
({
  type : C.UPDATE_PHOTO_INDEX,
  photoIndex
})
