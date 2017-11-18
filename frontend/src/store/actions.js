import C from './constants';



export const addPhoto = (src) =>
({
   type : C.ADD_PHOTO,
   src
})

export const updatePhotos = (src,url,id) =>
({
  type : C.ADD_PHOTO,
  id,
  src,
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
