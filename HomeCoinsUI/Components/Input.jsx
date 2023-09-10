import { StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { darkColorProps, lightColorProps } from '../src/Utils/colorProp';
const Input = (props) => {
  const isDarkMode = useColorScheme() == 'dark';
  const [isFocuse, setIsFocuse] = useState(defualtProperty);
  
  const defualtProperty = {
    backgroundColor: isDarkMode ? darkColorProps.inputBackground : lightColorProps.inputBackground,
    color: isDarkMode ? darkColorProps.inputTextColor : lightColorProps.inputTextColor
  };

  const onFocuse = () =>{
    setIsFocuse({
      backgroundColor: isDarkMode ? darkColorProps.inputFocusBackground : lightColorProps.inputFocusBackground,
      color: isDarkMode ? darkColorProps.inputTextColorOnFocus : lightColorProps.inputTextColorOnFocus,
      borderBottomWidth:0
    })
  };
  const onBlur =()=>{
    setIsFocuse(defualtProperty)
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  }
  return (
    <View style={styles.inputContainer}>
      {props.isLabel && <Text style={styles.inputLabel}>{props.label}</Text>}
      {props.icons && <Icons style={styles.inputIcons} name={props.icons} size={20} />}  
        <TextInput 
                onBlur={onBlur}
                onFocus={onFocuse}
                value= {props.value}
                style={props?.styles?? { ...styles.inputBox, ...isFocuse,borderColor: isDarkMode? lightColorProps.inputBackground : darkColorProps.inputBackground}}
                autoFocus={props.autoFocus}
                label={props.label}
                name={props.name}
                cursorColor= {backgroundStyle.color}
                secureTextEntry={props?.secureTextEntry??false}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
              />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:10,
        position:'relative',

    },
    inputLabel:{
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 18,
        marginBottom: 5
    },
    inputIcons:{
      position:'absolute',
      zIndex:1,
      top:18,
      left:12,
      fontSize:20
    },
    inputBox:{
        borderRadius:15,
        padding:15,
        paddingLeft:40,
        fontSize:18
    }
})