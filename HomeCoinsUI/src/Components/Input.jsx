import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState,useRef } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { HelperText, TextInput, useTheme } from 'react-native-paper';
const Input = (props) => {
  const { colors } = useTheme();
  const [isFocuse, setIsFocuse] = useState(defualtProperty);
  const defualtProperty = {
    backgroundColor: colors.surfaceVariant,
    color: colors.text
  };
  const onFocuse = () =>{
    setIsFocuse({
      backgroundColor: colors.surfaceVariant,
      color: colors.text,
      borderBottomWidth:0
    })
  };
  const onBlur =()=>{
    setIsFocuse(defualtProperty)
  };

  const backgroundStyle = {
    backgroundColor:colors.surfaceVariant,
    colors:colors.text
  };
  
  const first = useRef();
  const second = useRef();
  const third = useRef();
  const forth = useRef();
  return (
    <View style={styles.inputContainer} pointerEvents={props?.pointerEvents}>
      {props.isLabel && <Text style={styles.inputLabel}>{props.label}</Text>}
      {props.icons && <Icons style={{...styles.inputIcons,color:colors.text}} name={props.icons} size={20} />}  
        <TextInput
                keyboardType={props?.keyboardType}
                onBlur={onBlur}
                onFocus={onFocuse}
                value= {props?.value}
                style={{
                  ...styles.inputBox,
                  ...backgroundStyle
                }}
                maxLength={props?.maxLength}
                ref={props?.ref}
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
        padding:1,
        paddingLeft:30,
        fontSize:18
    }
})