import React,{lazy} from "react";
import DefaultLayout from "./DefaultLayout/DefaultLayout";
const EditProfile = lazy(()=>import("./Users/EditProfile"));
const LoginScreen = lazy(()=>import("./Users/Login"));
const Profile = lazy(()=>import("./Users/Profile"));
// const Signup = lazy(()=>import("./Users/Signup"));

const Home = lazy(()=>import("./Dashboard/Home"));
const Members = lazy(()=>import("./Members/Members"));
const Activity = lazy(()=>import("./Activity/Activity"));
const AddEarn = lazy(()=>import("./AddEarnExpens/AddEarn"));
const AddExpend = lazy(()=>import("./AddEarnExpens/AddExpend"));
const CreateGroup = lazy(()=>import("./CreateGroup/CreateGroup"));
const OtpVerification = lazy(()=>import("./Users/OtpVerification"));

const Login = (props) => <DefaultLayout Component={lazy(()=>import("./Users/Login"))} {...props}/>
const Signup = (props) => <DefaultLayout Component={lazy(()=>import("./Users/Signup"))} {...props}/>

export { EditProfile, Login, Profile, Signup,Home,Members,Activity,AddEarn,AddExpend,CreateGroup,OtpVerification}