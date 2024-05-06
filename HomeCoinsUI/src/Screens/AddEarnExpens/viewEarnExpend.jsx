import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import CustomText from '../../Components/CustomText';
import { dateFormat, filterKeyIncludeArr, getElementByIndex, stringTransform } from '../../Utils';

const ViewEarnExpend = ({
  viewData
}) => {
  const {source,user,member} = useSelector(state=>state);
  console.log(viewData.data);
  return (
    <View style={{borderColor:'white',borderWidth:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      </View>
      <View style={{justifyContent:'center'}}>
          <View style={{alignItems:'center'}}>
            <CustomText title={viewData.data.amount}/>
            <CustomText title={viewData.data.earnBy ? "Earn" :"Expend"}/>
          </View>
      </View>
      <View>
        <CustomText title={`CreatedBy: ${stringTransform(getElementByIndex(filterKeyIncludeArr(member.member,"_id",viewData.data.createdBy),0).name,'c')}`}/>
        <CustomText title={`Earn By: ${stringTransform(getElementByIndex(filterKeyIncludeArr(member.member,"_id",viewData.data.earnBy),0).name,'c')}`}/>
        <CustomText title={`Source: ${stringTransform(getElementByIndex(filterKeyIncludeArr(source.source,"_id",viewData.data.source),0).sourceName,'c')}`}/>
        <CustomText title={`Created On: ${dateFormat("DD/MM/YYYY HH:mm A",viewData.data.createdDate)}`}/>
      </View>
    </View>
  )
}

export default ViewEarnExpend

const styles = StyleSheet.create({})