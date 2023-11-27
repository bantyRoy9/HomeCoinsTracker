import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { useTheme } from 'react-native-paper'
import Icons from 'react-native-vector-icons/FontAwesome'


const SelectPicker = (props) => {
  const { colors } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  return (
    <View>
      <RNPickerSelect
        placeholder={{label:props?.placeholder,value: null,color: colors.text}}
        items={props.items} 
        darkTheme={props.darkTheme}
        onValueChange={props?.onValueChange}
        itemKey={props.key}
        textInputProps={{}}
        style={{
          ...pickerSelectStyles,
          
          iconContainer: {top: 10,left: 10},
          placeholder: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
        Icon={()=> <Icons name={props.icon} size={20}/>}
      /> 
    </View>
  )
}

export default SelectPicker

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
});