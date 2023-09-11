import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'react-native';
import Input from '../../Components/Input';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import Icons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
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
  const [user, setUser] = useState({ email: "", password: "", confirmPassword: "" });

  const changeHandler = (name, value) => {
    setUser({ ...user, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      const res = await axios.post('http://192.168.1.5:8000/api/v1/userController/createUser', user, header);
      if(res.status)
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentContainerStyle={{ flex: 1 }} showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={styles.signupContainer}>
          <View style={styles.arrowBack}>
            <Icons name='arrow-back' size={30} onPress={() => navigation.navigate('Login')} color={'#3d3d3d'} />
          </View>
          <View style={styles.pageTitle}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.subHeaderTitle}>Please fill the input below here</Text>
          </View>
          <View>
            <Input
              placeholder={"Full Name"}
              label={"Full Name"}
              isLabel={false}
              name={'name'}
              icons={'user'}
              value={user.name}
              secureTextEntry={false}
              autoFocus={true}
              onChangeText={(text) => changeHandler("name", text)}
            />
          </View>
          <View>
            <Input
              placeholder={"Phone"}
              label={"Phone"}
              isLabel={false}
              name={'mobile'}
              icons={'phone'}
              value={user.mobile}
              secureTextEntry={false}
              autoFocus={false}
              onChangeText={(text) => changeHandler("mobile", text)}
            />
          </View>
          <View>
            <Input
              placeholder={"Email"}
              label={"Email"}
              isLabel={false}
              name={'email'}
              icons={'envelope-o'}
              value={user.email}
              secureTextEntry={false}
              autoFocus={false}
              onChangeText={(text) => changeHandler("email", text)}
            />
          </View>
          <View>
            <Input
              placeholder={"Password"}
              label={"Password"}
              isLabel={false}
              name={'password'}
              icons={'lock'}
              value={user.password}
              secureTextEntry={true}
              autoFocus={false}
              onChangeText={(text) => changeHandler("password", text)}
            />
          </View>
          <View>
            <Input
              placeholder={"Confirm Password"}
              label={"Confirm Password"}
              isLabel={false}
              name={'confirmPassword'}
              icons={'lock'}
              value={user.confirmPassword}
              secureTextEntry={true}
              autoFocus={false}
              onChangeText={(text) => changeHandler("confirmPassword", text)}
            />
          </View>
          <View style={{ width: "auto", alignItems: 'center' }}>
            <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
              <Text style={{ ...styles.text, ...btnStyle.color }}>{"SIGN UP"}</Text>
            </Pressable>
          </View>
          <View style={{ position: 'relative', height: 50 }}>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 16, color: backgroundStyle.color }}>Allready have an accounts? </Text><Text onPress={() => navigation.navigate('Login')} style={{ color: btnStyle.color, fontSize: 16, fontWeight: 600, textDecorationLine: 'underline' }}>Login</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup


const styles = StyleSheet.create({
  signupContainer: {
    paddingHorizontal: 20,
    flex: 1
  },
  arrowBack: {
    paddingVertical: 20,
  },
  pageTitle: {
    paddingVertical: 10
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  subHeaderTitle: {},
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
});
