import React,{lazy} from "react";
import DefaultLayout from "./DefaultLayout/DefaultLayout";

const Login = (props) => <DefaultLayout Component={lazy(()=>import("./Users/Login"))} {...props} isFlexCenter={true}/>
const Signup = (props) => <DefaultLayout Component={lazy(()=>import("./Users/Signup"))} {...props}/>
const EditProfile = (props) => <DefaultLayout Component={lazy(()=>import("./Users/EditProfile"))} {...props}/>
const Profile = (props) => <DefaultLayout Component={lazy(()=>import("./Users/Profile"))} {...props}/>

const Home = (props) => <DefaultLayout Component={lazy(()=>import("./Dashboard/Home"))} {...props} isFlexCenter={true} />
const Members = (props) => <DefaultLayout Component={lazy(()=>import("./Members/Members"))} {...props} isFlexCenter={true}/>
const Activity = (props) => <DefaultLayout Component={lazy(()=>import("./Activity/Activity"))} {...props} isFlexCenter={true}/>
const AddEarn = (props) => <DefaultLayout Component={lazy(()=>import("./AddEarnExpens/AddEarn"))} {...props} />
const AddExpend = (props) => <DefaultLayout Component={lazy(()=>import("./AddEarnExpens/AddExpend"))} {...props}/>
const CreateGroup = (props) => <DefaultLayout Component={lazy(()=>import("./CreateGroup/CreateGroup"))} {...props} isFlexCenter={true}/>
const OtpVerification = (props) => <DefaultLayout Component={lazy(()=>import("./Users/OtpVerification"))} {...props}/>

export { EditProfile, Login, Profile, Signup,Home,Members,Activity,AddEarn,AddExpend,CreateGroup,OtpVerification}