export const HOST = import.meta.env.VITE_SERVER_URL


// Auth Routes
export const AUTH_ROUTES = "api/v1/auth";
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`
export const LOG_OUT = `${AUTH_ROUTES}/logout`



// Contact Routes
export const CONTACT_ROUTES = "api/v1/contact"
export const SEARCH_ROUTES = `${CONTACT_ROUTES}/search`