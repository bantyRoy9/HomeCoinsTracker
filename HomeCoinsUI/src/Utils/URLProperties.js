const NODE_ENV = "productio"
// const REACT_LOCAL_URL = "http://192.168.1.14:8000" //manikarn
const REACT_LOCAL_URL = "http://192.168.43.167:8000" //note7
// const REACT_LOCAL_URL = "http://192.168.1.8:8000"
REACT_PROD_URL = "https://homecoinstracker.onrender.com"
const accountControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController`;
const userControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/userController`;
const activityControllerURL = `${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/activityController`;

export { accountControllerURL , userControllerURL, activityControllerURL}