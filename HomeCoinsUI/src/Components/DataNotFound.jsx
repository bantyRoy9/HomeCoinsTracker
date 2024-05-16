import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { useTheme } from 'react-native-paper'

const DataNotFound = () => {
    const {colors} = useTheme();
  return (
      <View style={{justifyContent:'center',flexDirection:'row',height:'auto'}}>
        <CustomText title="Activity not found!" color={colors.error}/>
    </View>
  )
}

export default DataNotFound

const styles = StyleSheet.create({})