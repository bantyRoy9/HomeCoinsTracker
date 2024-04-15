import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { defaultStyle, filterKeyIncludeArr, getElementByIndex, updateErrors, validateForm } from '../Utils';
import { useTheme } from 'react-native-paper';
import SelectPicker from './SelectPicker';
import { getSourceList } from '../Redux/Action/sourceAction';
const tabs = [{expendType:"Source",active:true,details:{source:"",expendName:""}},{expendType:"Custom",active:false,details:{expendType:"",expendName:""}}];
const CreateSourceExpendType = ({modalVisibleHandler,pageType}) => {
  const { colors } = useTheme(),dispatch = useDispatch();
  const { isLoading,source,expendType } = useSelector(state=>state.source)
  const [pageDetails,setPageDetails]=useState({
    details:tabs[0].details,
    activeTab:'Source',
    errors:{}
  });
  
  const defaultColors={
    backgroundColor:colors.btnPrimaryBackground,
    color:colors.btnPrimaryColor,
    borderRadius:10
  }
  const tabHandler = (activeTab) =>{
    setPageDetails({...pageDetails,errors:{},details:getElementByIndex(filterKeyIncludeArr(tabs,"expendType",activeTab),0,'details'),activeTab});
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
    setPageDetails({...pageDetails,errors:validation.error});
    try {
      if(validation.valid){
        let expendPrefix = pageDetails.details?.expendType
        if(pageDetails.activeTab === "Source"){
          expendPrefix = getElementByIndex(filterKeyIncludeArr(source,'_id',pageDetails.details.source),0,'sourceName');
        }
        expendPrefix = expendPrefix +" "+pageDetails.details.expendName;
        dispatch(getSourceList("expendType",{...pageDetails.details,expendName:expendPrefix}));
        modalVisibleHandler();
      }
    } catch (err) {}
  };
  return (
    <>
      <View style={[defaultStyle.flexRow,styles.navContainer,{backgroundColor:colors.surfaceVariant,borderWidth:0,borderColor:colors.borderSecondary}]}>
          {tabs.map(el=>(
          <Pressable key={el.expendType} onTouchStart={()=>tabHandler(el.expendType)} style={[defaultStyle.flex1,(el.expendType === pageDetails.activeTab) && defaultColors]}>
            <Text style={[(el.expendType === pageDetails.activeTab) && defaultColors]}>{el.expendType}</Text>
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
        key={'expend Type'}
        placeholder={'Expend Type'}
        name={'expendType'}
        icons={'barcode'}
        value={pageDetails.details?.expendType}
        secureTextEntry={false}
        autoFocus={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        onChangeText={text => changeHandler('expendType', text)}
        isHelper={pageDetails.errors?.expendType ? true : false}
        errorMsg={pageDetails.errors?.expendType}
        helperType={'error'}
      />}
      <Input
        key={'expendName'}
        placeholder={'Expend Name'}
        name={'expendName'}
        icons={'barcode'}
        value={pageDetails.details?.expendName}
        secureTextEntry={false}
        autoFocus={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        onChangeText={text => changeHandler('expendName', text)}
        isHelper={pageDetails.errors?.expendName ? true : false}
        errorMsg={pageDetails.errors?.expendName}
        helperType={'error'}
      />
      <Button title={`Create new ${pageType} type`} isLoading={isLoading} onPress={submitHandler}/>
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
