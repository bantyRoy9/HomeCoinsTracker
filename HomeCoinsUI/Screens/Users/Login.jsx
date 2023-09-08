import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import Input from '../../Components/Input';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  Colors.darker = darkColorProps.background;
  Colors.lighter = lightColorProps.background;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color:isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const btnStyle = {
    backgroundColor: isDarkMode ? darkColorProps.btnBackground : lightColorProps.btnBackground,
    color: isDarkMode ? darkColorProps.btnPrimary : lightColorProps.btnPrimary
  }
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{
          flex:1,
          height:800,
          marginHorizontal:15
        }}>
          <View style={styles.loginContainer}>
            <View style={{
              alignItems: 'center',
              marginVertical:10
            }}>
              <Image source={require('../../Assets/Icons/login.webp')}
                style={{
                  width: 210,
                  height: 210
                }}
              />
            </View>
            <View>
              <Text style={{
                fontSize: 35,
                fontWeight: 700,
                color: backgroundStyle.color,
                marginVertical:10
              }}>Login</Text>
              <Text>Please sign in to continue</Text>
            </View>
            <View style={{marginVertical:5}}>
              <Input props={{
                placeholder: "Email",
                label: "Email :",
                isLabel: false,
                value: user.email,
                autoFocus: false,
                icons: 'envelope-o'
              }} />
            </View>
            <View style={{marginVertical:5}}>
              <Input props={{
                secureTextEntry: true,
                placeholder: "Enter secure password",
                label: "Password",
                isLabel: false,
                value: user.password,
                autoFocus: false,
                icons: 'lock'
              }} />
            </View>
            <View style={{ width: "auto", alignItems: 'center' }}>
              <Pressable style={{...styles.button,...btnStyle}} onPress={""}>
                <Text style={{...styles.text,...btnStyle.color}}>{"LOGIN"}</Text>
              </Pressable>
              <Text style={btnStyle.color}>
                Forget Password?
              </Text>
            </View>
          </View>
          <View style={{height:100,position:'relative'}}>
            <View style={{ display: 'flex', flexDirection: 'row',position:'absolute',bottom:10,left:60 }}>
              <Text style={{ fontSize: 16 }}>Don't have an account? </Text><Text style={{ color: btnStyle.color, fontSize: 16, fontWeight: 600,textDecorationLine:'underline' }}>Sing up</Text>
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
    paddingHorizontal: 8,
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
