import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { useTheme,HelperText } from 'react-native-paper'
import Icons from 'react-native-vector-icons/FontAwesome'
import { defaultStyle } from '../Utils'

const SelectPicker = (props) => {
  const { colors } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  return (
    <View style={defaultStyle.selectpickerContainer}>
      <RNPickerSelect
        placeholder={{label:props?.placeholder,value: null,color: colors.text}}
        items={props.items} 
        onValueChange={props?.onValueChange}
        itemKey={props.key}
        textInputProps={{}}
        style={{
          ...pickerSelectStyles,
          iconContainer:{position:'absolute',left:10,top:18,width:30,color:colors.text},
          viewContainer:{backgroundColor:colors.surfaceVariant,paddingLeft:30,color:colors.text},
          inputAndroid:{color:colors.text,borderWidth:1,borderColor:'red'},
          modalViewMiddleDark:{borderColor:'red',borderWidth:1,color:"red"},
          modalViewTop:{borderColor:'red !important',borderWidth:1,color:"red !important"},
          modalViewBottom:{borderColor:'red',borderWidth:1,color:"red"},
          modalViewBottomDark:{borderColor:'red',borderWidth:1,color:"red"},
          modalViewMiddle:{borderColor:'red',borderWidth:1,color:"red"},
          placeholder: {
            fontSize: 15,
            color:colors.text,
          },
        }}
        Icon={()=> <Icons name={props.icon} size={20} color={colors.text}/>}
        
      /> 
      {props.isHelper && <HelperText type={props.helperType}>{props.errorMsg}</HelperText>}
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