import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle } from '../Utils';

const CustomText = ({title,fontSize=15,color}) => {
    const colors = useTheme();
  return (
    <View>
      <Text style={[defaultStyle.text,{color:color || colors.text,fontSize:fontSize}]}>{title}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({

})