let NODE_ENV = process.env.NODE_ENV,ApiContextURL = "https://homecoinstracker.banti.cloud";
// NODE_ENV="production";
if(NODE_ENV ==="development"){
    ApiContextURL = "http://192.168.113.167:8000"
};
const accountControllerURL = `${ApiContextURL}/api/v1/accountController`;
const userControllerURL = `${ApiContextURL}/api/v1/userController`;
const activityControllerURL = `${ApiContextURL}/api/v1/activityController`;
const groupControllerURL = `${ApiContextURL}/api/v1/groupController`;
const sourceControllerURL = `${ApiContextURL}/api/v1/sourceController`;
export { accountControllerURL , userControllerURL, activityControllerURL, groupControllerURL,sourceControllerURL}