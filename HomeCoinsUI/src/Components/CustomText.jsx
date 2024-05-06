import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle } from '../Utils';

const CustomText = ({title,type}) => {
    const colors = useTheme();
  return (
    <View>
      <Text style={[defaultStyle.text,{color:colors.text}]}>{title}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({

})