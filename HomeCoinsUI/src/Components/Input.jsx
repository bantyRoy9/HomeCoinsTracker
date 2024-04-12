import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState,useRef } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { HelperText, TextInput, useTheme } from 'react-native-paper';
const Input = ({
  pointerEvents,
  isLabel,
  label,
  icons,
  keyboardType,
  value,
  maxLength,
  ref,
  autoFocus,
  name,
  secureTextEntry,
  placeholder,
  onChangeText,
  onPress,
  editable,
  isHelper,
  helperType,
  errorMsg
}) => {
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
    color:colors.text,
    borderBottomWidth:0
  };
  
  return (
    <View style={styles.inputContainer} pointerEvents={pointerEvents}>
      {isLabel && <Text style={styles.inputLabel}>{label}</Text>}
      {icons && <Icons style={{...styles.inputIcons,color:colors.text}} name={icons} size={20} />}  
        <TextInput
                keyboardType={keyboardType}
                onBlur={onBlur}
                onFocus={onFocuse}
                value= {value}
                style={{
                  ...styles.inputBox,
                  ...backgroundStyle,
                }}
                maxLength={maxLength}
                ref={ref}
                autoFocus={autoFocus}
                label={label}
                name={name}
                mode='flat'
                cursorColor= {backgroundStyle.color}
                secureTextEntry={secureTextEntry??false}
                placeholder={placeholder}
                onChangeText={onChangeText}
                onPressIn={onPress}
                editable={editable}
              />
              {isHelper && <HelperText type={helperType}>{errorMsg}</HelperText>}

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
      top:20,
      left:15,
      fontSize:20
    },
    inputBox:{
        padding:1,
        paddingLeft:30,
        fontSize:18
    }
})