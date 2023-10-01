import { StatusBar,Image ,Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Input from '../../Components/Input';
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector} from 'react-redux';
import { loging } from '../../Redux/Action/userAction';
import { defaultStyle } from '../../Utils/defaultCss';
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLoading,isAuthenticated} = useSelector(state=>state.user);
  const isDarkMode = useColorScheme() === 'dark';
  Colors.darker = darkColorProps.background;
  Colors.lighter = lightColorProps.background;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const btnStyle = {
    backgroundColor: isDarkMode ? darkColorProps.btnBackground : lightColorProps.btnBackground,
    color: isDarkMode ? darkColorProps.btnBackground : "#FFF"
  }
  const [user, setUser] = useState({ email: "", password: "" });
  const changeHandler = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      dispatch(loging(user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentContainerStyle={{ flex: 1 }} showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
          <View style={styles.loginContainer}>
            <View style={{
              alignItems: 'center',
              marginVertical: 10
            }}>
              <Image source={require('../../../Assets/Icons/login.webp')}
                style={{width: 200,height: 200
                }}
              />
            </View>
            <View>
              <Text style={{
                fontSize: 35,
                fontWeight: 700,
                color: backgroundStyle.color,
                marginVertical: 10
              }}>Login</Text>
              <Text style={{ color: backgroundStyle.color }}>Please sign in to continue</Text>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Input
                pointerEvents={isLoading ? 'none' : 'auto'}
                placeholder={"Email"}
                label={"Email :"}
                isLabel={false}
                name={"email"}
                autoFocus={true}
                icons={'envelope-o'}
                value={user.email}
                onChangeText={(text) => changeHandler("email", text)}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              <Input
                pointerEvents={isLoading ? 'none' : 'auto'}
                secureTextEntry={true}
                placeholder={"Enter secure password"}
                label={"Password"}
                isLabel={false}
                name={'email'}
                autoFocus={false}
                icons={'lock'}
                value={user.password}
                onChangeText={(text) => changeHandler("password", text)}
              />
            </View>
            <View style={{ width: "auto", alignItems: 'center' }} pointerEvents={isLoading ? 'none' : 'auto'}>
              <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
                <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'large'} color={isDarkMode?darkColorProps.loaderColor:lightColorProps.loaderColor}/> : "LOGIN"}</Text>
              </Pressable>
              <Text style={{ color: btnStyle.color }}>
                Forget Password?
              </Text>
            </View>
          <View style={{ position: 'relative', height: 50 }}>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Don't have an account? </Text><Text onPress={() => navigation.navigate('Signup')} style={{ color: btnStyle.color, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Sing up</Text>
              </View>
            </View>
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login


const styles = StyleSheet.create({
  loginContainer: {
    marginHorizontal:20,
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 3,
    width: "70%",
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
});
