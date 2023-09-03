import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({props}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{props.label}</Text>
        <TextInput 
                value= {props.email}
                style={props?.styles??styles.inputBox}
                autoFocus={props.autoFocus}
                label={props.label}
                cursorColor={"#F2F2F3"}
                //selectionColor={"blue"}
                secureTextEntry={props?.secureTextEntry??false}
                placeholder={props.placeholder}
              />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:10,
    },
    inputLabel:{
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 18,
        marginBottom: 5
    },
    inputBox:{
        backgroundColor:"#38304C",
        borderRadius:15,
        padding:15,
        fontSize:18
    }
})