import { StatusBar,Image ,Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../../Components/Input';
import { useDispatch,useSelector} from 'react-redux';
import { forgotPassword, loging } from '../../Redux/Action/userAction';
import { Divider, Modal, PaperProvider, Portal, useTheme } from 'react-native-paper';
import { FontAwesome, Ionicons } from '../../Utils/VectorIcons';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { defaultStyle } from '../../Utils';
const initialState = { email: "", password: "" }
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading,isAuthenticated} = useSelector(state=>state.user);
  const { colors,dark } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color:colors.text
  }
  const [user, setUser] = useState(initialState);
  const [errors,setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setUser({});
    setErrors({});
    setModalVisible(true)
  };
  const hideModal = () => {
    setUser({});
    setErrors({});
    setModalVisible(false);
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
        modalVisible ? dispatch(forgotPassword(user)) : dispatch(loging(user));
      } catch (err) {
        showAlert(err);
      }
    }
  };
  return (
    <PaperProvider>
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle} contentContainerStyle={{flex:1,justifyContent:'center'}}>
          <View style={defaultStyle.screenContainer}>
            <View style={{ alignItems: 'center'}}>
              <Image source={require('../../../Assets/Icons/login1.png')} style={{width: 250,height: 180}}/>
            </View>
            <View>
              <Text style={{fontSize: 35,fontWeight: 700,color: backgroundStyle.color,marginVertical: 10}}>Login</Text>
              <Text style={{ color: backgroundStyle.color }}>Please sign in to continue</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginVertical: 5 }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Input
                placeholder={"Email"}
                label={"Email"}
                isLabel={false}
                name={"email"}
                autoFocus={false}
                icons={'envelope-o'}
                value={user.email}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email?true:false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
            <View style={{ marginVertical: 5 }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Input
                secureTextEntry={true}
                placeholder={"Enter secure password"}
                label={"Password"}
                isLabel={false}
                name={'password'}
                autoFocus={false}
                icons={'lock'}
                value={user.password}
                onChangeText={(text) => changeHandler("password", text)}
                isHelper={errors.password?true:false}
                errorMsg={errors.password}
                helperType={'error'}
              />
            </View>
            </ScrollView>
            <View style={{ width: "auto", alignItems: 'center' }} >
              <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} >
                <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'small'} color={colors.text}/> : "LOGIN"}</Text>
              </Pressable>
              <Pressable onPress={showModal}>
              <Text style={{ color: colors.btnBackground }} >
                Forgot Password?
              </Text>
              </Pressable>
            </View>
          <View style={{ position: 'relative', height: 50 }}>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={styles.btnSignup}>
                <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Don't have an account? </Text><Text onPress={() => navigation.navigate('Signup')} style={{ color: colors.btnBackground, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Sign up</Text>
              </View>
            </View>
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
      <Portal>
        <Modal onDismiss={hideModal} visible={modalVisible} contentContainerStyle={{...backgroundStyle,...styles.modalView}}>
          <View style={styles.modalHeader}>
              <View style={styles.forgetBtn}>
                <Text style={styles.modalHeaderText}>Forget Password</Text>
                <View><FontAwesome name='close' size={15} onPress={hideModal}/></View>
          </View>
          </View>
          <Divider/>
          <View Style={styles.modalBody}>
          <View style={{ marginVertical: 5 }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Input
                placeholder={"Enter your email"}
                label={"Enter your email"}
                isLabel={false}
                name={"email"}
                autoFocus={false}
                icons={'envelope-o'}
                value={user.email}
                onChangeText={(text) => changeHandler("email", text)}
                isHelper={errors.email?true:false}
                errorMsg={errors?.email}
                helperType={'error'}
              />
            </View>
          </View>
          <View style={{...btnStyle,...styles.modalFooter}}>
              <Pressable style={styles.modalFooterBtn}>
                <Text style={styles.modalFooterBtnText}>Next</Text>
                <Ionicons name='send' size={20}/>
              </Pressable>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
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

