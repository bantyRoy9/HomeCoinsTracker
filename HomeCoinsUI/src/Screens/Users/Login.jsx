import { Image ,Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from '../../Components/Input';
import { useDispatch,useSelector} from 'react-redux';
import { loging } from '../../Redux/Action/userAction';
import { useTheme } from 'react-native-paper';
import { defaultStyle } from '../../Utils';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import Button from '../../Components/Button';
const initialState = { email: "", password: "" }
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state=>state.user);
  const { colors } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const [user, setUser] = useState(initialState);
  const [errors,setErrors] = useState({});
  const [passwordPressIn,setPasswordPressOut] = useState(false)
  const rightIconHandler = () =>{
    setPasswordPressOut(prev=>!prev);
  }

  const changeHandler = (name, value) => {
    setErrors(updateErrors(errors,name));
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async(e) => {
    e.preventDefault()
    const validation = validateForm(user);
    setErrors(validation.error);
    if(validation.valid){
    try {
        dispatch(loging(user));
      } catch (err) {
        showAlert(err);
      }
    }
  };
  return (
    <View style={defaultStyle.screenContainer}>
            <View style={{ alignItems: 'center',marginBottom:10}}>
              <Image source={require('../../../Assets/Icons/coinsTracker.png')} style={{width: 250,height: 180}}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginVertical: 5 }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Input
                placeholder={"Email"}
                label={"Email"}
                isLabel={false}
                name={"email"}
                autoFocus={false}
                icons={'envelope'}
                value={user.email}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email?true:false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
            <View style={{ marginVertical: 5 }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Input
                secureTextEntry={!passwordPressIn}
                rightIcon={passwordPressIn?'eye':'eye-slash'}
                placeholder={"Enter secure password"}
                label={"Password"}
                isLabel={false}
                name={'password'}
                autoFocus={false}
                icons={'lock'}
                value={user.password}
                rightIconHandler={rightIconHandler}
                onChangeText={(text) => changeHandler("password", text)}
                isHelper={errors.password?true:false}
                errorMsg={errors.password}
                helperType={'error'}
              />
            </View>
            </ScrollView>
            <View style={{ width: "auto", alignItems: 'center' }} >
              <Button onPress={submitHandler} isLoading={isLoading} title='Login'/>
              <Button onPress={()=>navigation.navigate("Signup",{isForgotPassword:true,isOTPVerified:false})} title="Forgot Password?" btnType='tertiary'/>
            </View>
          <View style={{ position: 'relative', height: 50 }}>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={styles.btnSignup}>
                <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Don't have an account? </Text><Text onPress={() => navigation.navigate('Signup',{isForgotPassword:false})} style={{ color: colors.text, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Sign up</Text>
              </View>
            </View>
          </View>
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  forgetBtn:{flexDirection:'row',justifyContent:'space-between'},
  btnSignup:{flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  
  modalView: {
    margin: 20,
    // borderColor:'white',
    // borderWidth:1,
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader:{
    paddingVertical:10,
  },
  modalHeaderText:{
    fontSize:18,
    fontWeight: 'bold',
  },
  modalFooter: {
    paddingVertical:10,
    marginBottom: 15,
    borderRadius:4,
  },
  modalFooterBtn:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  modalFooterBtnText:{
    fontSize:15,
    fontWeight:'bold'
  }
});

