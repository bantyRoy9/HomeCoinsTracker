import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { darkColorProps, lightColorProps } from '../Utils/colorProp';
import { HelperText, TextInput } from 'react-native-paper';
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
  };
  return (
    <View style={styles.inputContainer} pointerEvents={props?.pointerEvents}>
      {props.isLabel && <Text style={styles.inputLabel}>{props.label}</Text>}
      {props.icons && <Icons style={styles.inputIcons} name={props.icons} size={20} />}  
        <TextInput
                keyboardType={props?.keyboardType}
                onBlur={onBlur}
                onFocus={onFocuse}
                value= {props?.value}
                // textColor={backgroundStyle.color}
                
                style={{
                  ...styles.inputBox,
                  ...isFocuse,
                  // borderBottomWidth:1,
                  borderColor: isDarkMode? lightColorProps.inputBackground : darkColorProps.inputBackground,
                  ...backgroundStyle
                }}
                // style={{backgroundColor:backgroundStyle.backgroundColor}}
                autoFocus={props.autoFocus}
                label={props.label}
                name={props.name}
                mode='flat'
                cursorColor= {backgroundStyle.color}
                secureTextEntry={props?.secureTextEntry??false}
                placeholder={props?.placeholder}
                onChangeText={props?.onChangeText}
                onPressIn={props?.onPress}
                editable={props?.editable}
              />
              {props.isHelper && <HelperText type={props.helperType}>{props.errorMsg}</HelperText>}

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
      top:21,
      left:12,
      fontSize:20
    },
    inputBox:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:1,
        paddingLeft:30,
        fontSize:18
    }
})