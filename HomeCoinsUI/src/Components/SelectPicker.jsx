import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectedPicker from 'react-native-picker-select'

const SelectPicker = ({items,onValueChange}) => {
  return (
    <View>
      <SelectedPicker items={items} onValueChange={onValueChange}/> 
    </View>
  )
}

export default SelectPicker

const styles = StyleSheet.create({})