import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import Input from '../../Components/Input';


function Section({ children, title }){
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle,{ color: isDarkMode ? Colors.white : Colors.black}]}>
          {title}
        </Text>
        <Text style={[styles.sectionDescription,{color: isDarkMode ? Colors.light : Colors.dark,},]}>
          {children}
        </Text>
      </View>
    );
  }
  
const Login = () => {
    const isDarkMode = useColorScheme() === 'dark';
    Colors.darker = "#201A31";
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [user,setUser] = useState({email:"",password:""});

    return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor}/>
      <ScrollView showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View>
            <View>
              <Image source={require('../../Assets/Icons/login.webp')}
              style={{width:'auto',height:300}}
              />
            </View>
            <View>
              <Input props={{placeholder:"Email", label:"Email",value:user.email,autoFocus:false}}/>
            </View>
            <View>
              <Input props={{secureTextEntry:true,placeholder:"Enter secure password", label:"Password",value:user.password,autoFocus:false}}/>
            </View>
            <View style={{width:"auto"}}>
              <Pressable style={styles.button} onPress={""}>
                <Text style={styles.text}>{"LOGIN"}</Text>
              </Pressable>
            </View>
            <View style={{height:100}}>
              <View>

              </View>
            </View>
        </View>
      </ScrollView>     
    </SafeAreaView>
  )
}

export default Login


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#0DF5E3',
    width:"40%",
    marginLeft:'28%',
    marginVertical:15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
    inputBox:{
      backgroundColor:"#38304D"
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
  