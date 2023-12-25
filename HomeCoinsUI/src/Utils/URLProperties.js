const NODE_ENV = process.env.NODE_ENV//"production"
// const REACT_LOCAL_URL = "http://192.168.1.5:8000" //manikarn
// const REACT_LOCAL_URL = "http://192.168.43.167:8000" //manikarn
const REACT_LOCAL_URL = "http://192.168.1.73:8000" //note7
// const REACT_PROD_URL = "https://homecoinstracker.onrender.com"
const REACT_PROD_URL = "http://13.232.227.0";
console.log(NODE_ENV);
const accountControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController`;
const userControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/userController`;
const activityControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/activityController`;
const groupControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/groupController`;
const sourceControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/sourceController`;
export { accountControllerURL , userControllerURL, activityControllerURL, groupControllerURL,sourceControllerURL}