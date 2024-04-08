let NODE_ENV = process.env.NODE_ENV,
    REACT_LOCAL_URL = "http://192.168.1.73:8000",
    REACT_PROD_URL = "https://homecoinstracker.banti.cloud",
    timeHour=new Date().getHours();
    if(timeHour >= 8 && timeHour <= 20){        
        REACT_PROD_URL = "https://homecoinstracker.onrender.com";
    }
NODE_ENV="production"
const accountControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController`;
const userControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/userController`;
const activityControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/activityController`;
const groupControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/groupController`;
const sourceControllerURL = `${NODE_ENV === 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/sourceController`;
export { accountControllerURL , userControllerURL, activityControllerURL, groupControllerURL,sourceControllerURL}