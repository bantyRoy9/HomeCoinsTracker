const NODE_ENV = "developm"
const REACT_LOCAL_URL = "http://192.168.1.4:8000"
// const REACT_LOCAL_URL = "http://192.168.43.167:8000"
//const REACT_LOCAL_URL = "http://192.168.1.14:8000"
REACT_PROD_URL = "https://homecoinstracker.onrender.com"
export const accountControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController`;
export const userControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/userController`;
export const activityControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/activityController`;
