import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState,useRef, memo } from 'react'
import { HelperText, TextInput, useTheme } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '../Utils';
const Input = ({
  pointerEvents,
  isLabel,
  label,
  icons,
  rightIcon,
  rightIconHandler,
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
      {icons && <FontAwesome5 style={{...styles.inputIcon,color:isHelper ? colors.error : colors.text}} name={icons} size={19} />}  
        <TextInput
                keyboardType={keyboardType}
                onBlur={onBlur}
                onFocus={onFocuse}
                value= {value}
                style={{
                  ...styles.inputBox,
                  ...backgroundStyle,
                }}
                placeholderTextColor={colors.placeholderColor}
                activeUnderlineColor={colors.text}
                underlineColor={colors.text}
                textColor={colors.text}
                activeOutlineColor={colors.text}
                outlineColor={colors.text}
                error={isHelper}
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
              {rightIcon && <FontAwesome5 style={{...styles.inputIconRight,color:isHelper ? colors.error : colors.text}} name={rightIcon} size={18} onPress={rightIconHandler}/>}
              {isHelper && <HelperText type={helperType}>{errorMsg}</HelperText>}

    </View>
  )
}

export default memo(Input)

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:5,
        position:'relative',

    },
    inputLabel:{
        fontWeight: 'bold', 
        fontSize: 18,
        marginBottom: 5
    },
    inputIcon:{
      position:'absolute',
      zIndex:1,
      top:20,
      left:15,
    },
    inputIconRight:{
      position:'absolute',
      zIndex:1,
      top:20,
      right:20,
    },
    inputBox:{
        padding:1,
        paddingLeft:30,
        fontSize:18
    }
})