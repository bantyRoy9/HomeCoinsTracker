import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useSelector } from 'react-redux';
import { defaultStyle, updateErrors, validateForm } from '../Utils';
import { useTheme } from 'react-native-paper';
import SelectPicker from './SelectPicker';
const tabs = [{title:"Source",active:true},{title:"Custom",active:false}];
const initialState={source:"",title:""}
const CreateSourceExpendType = () => {
  const { colors } = useTheme();
  const { isLoading,source } = useSelector(state=>state.source)
  const [pageDetails,setPageDetails]=useState({
    details:initialState,
    activeTab:'Source',
    errors:{}
  });
  const defaultColors={
    backgroundColor:colors.btnPrimaryBackground,
    color:colors.btnPrimaryColor,
    borderRadius:10
  }
  const tabHandler = (activeTab) =>{
    setPageDetails({...pageDetails,activeTab})
  };
  const changeHandler = (name, value) => {
    let errors = updateErrors(pageDetails.errors,name);
    let details ={...pageDetails.details,[name]:value};
    setPageDetails({...pageDetails,details,errors});
  };
  const selectPickerChangleHandler = (e,selectType) =>{
    let errors = updateErrors(pageDetails.errors,selectType);
    let details = {...pageDetails.details,[selectType]:e};
    setPageDetails({...pageDetails,details,errors});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(pageDetails.details);
    pageDetails.errors=validation.error;
    setPageDetails({pageDetails});
    try {
      if(validation.valid){
        
      }
    } catch (err) {}
  };
  console.log(pageDetails);
  return (
    <>
      <View style={[defaultStyle.flexRow,styles.navContainer,{backgroundColor:colors.surfaceVariant,borderWidth:0,borderColor:colors.borderSecondary}]}>
          {tabs.map(el=>(
          <Pressable key={el.title} onTouchStart={()=>tabHandler(el.title)} style={[defaultStyle.flex1,(el.title === pageDetails.activeTab) && defaultColors]}>
            <Text style={[(el.title === pageDetails.activeTab) && defaultColors]}>{el.title}</Text>
          </Pressable>
          ))}
      </View>
       {pageDetails.activeTab === "Source" ? <SelectPicker
            onValueChange={(e)=>selectPickerChangleHandler(e,"source")}
            placeholder="Source"
            items={source.map(el=>({label:el.sourceName,value:el._id}))}
            value={pageDetails.details?.source}
            icon={"soundcloud"}
            isHelper={pageDetails.errors?.source ? true : false}
            errorMsg={pageDetails.errors?.source}
            helperType={'error'}
        /> : <Input
        key={'type'}
        placeholder={'Type'}
        name={'type'}
        icons={'barcode'}
        value={pageDetails.details?.type}
        secureTextEntry={false}
        autoFocus={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        onChangeText={text => changeHandler('type', text)}
        isHelper={pageDetails.errors?.type ? true : false}
        errorMsg={pageDetails.errors?.type}
        helperType={'error'}
      />}
      <Input
        key={'title'}
        placeholder={'Title'}
        name={'title'}
        icons={'barcode'}
        value={pageDetails.details?.title}
        secureTextEntry={false}
        autoFocus={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        onChangeText={text => changeHandler('title', text)}
        isHelper={pageDetails.errors?.title ? true : false}
        errorMsg={pageDetails.errors?.title}
        helperType={'error'}
      />
      <Button title={'Create New Expend Type'} isLoading={isLoading} onPress={submitHandler}/>
    </>
  );
};

export default CreateSourceExpendType;

const styles = StyleSheet.create({
  navContainer:{
    marginBottom:5,
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:5
  },  
  activeTab:{
    
  }
});
