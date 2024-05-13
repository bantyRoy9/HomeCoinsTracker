import React,{memo} from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux';
import {CustomText} from '../../Components';
import { MaterialCommunityIcons, dateFormat, filterKeyIncludeArr, getElementByIndex, stringTransform } from '../../Utils';
import { DataTable, useTheme } from 'react-native-paper';

const ViewEarnExpend = ({viewData}) => {
  const {colors} = useTheme();
  const source = useSelector(state=>state.source);
  const {member} = useSelector(state=>state.member);
  const isEarn = viewData.data.earnBy ? true : false;
  const backgroundStyle = {
    tableHeaderStyle:{
      backgroundColor:colors.HeaderBg,
      color:colors.HeaderText,
      borderBottomWidth:0,
    },
    tableBodyStyle:{
      backgroundColor: colors.surfaceVariant,
      borderBottomWidth:1,
      color:colors.text
    }
  };
  return (
    <View>
      <View style={{justifyContent:'center',backgroundColor:isEarn?colors.successOverlay:colors.errorOverlay,borderRadius:4,marginTop:-15,marginBottom:15}}>
          <View style={{alignItems:'center',paddingVertical:10}}>
            <MaterialCommunityIcons name={`${isEarn?"bank-transfer-in":"bank-transfer-out"}`} size={45} color={isEarn?colors.success:colors.error}/>
            <CustomText title={`₹${viewData.data.amount}.00`} fontSize={25} color={isEarn?colors.success:colors.error}/>
          </View>
      </View>
      <View>
        <DataTable>
          <DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell textStyle={{color:colors.text}}>{isEarn?"Earn":"Add"} by</DataTable.Cell>
            <DataTable.Cell textStyle={{color:colors.text}}>{stringTransform(getElementByIndex(filterKeyIncludeArr(member,"_id",viewData.data[isEarn?"earnBy":"expendBy"]),0).name,'c') || "--"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell textStyle={{color:colors.text}}>{isEarn?"Source":"Expend Type"}</DataTable.Cell>
            <DataTable.Cell textStyle={{color:colors.text}}>{stringTransform(getElementByIndex(filterKeyIncludeArr(source[isEarn?"source":"expendType"],"_id",viewData.data[isEarn?"source":"expendType"]),0)[isEarn?"sourceName":"expendName"],'c') || "--"}</DataTable.Cell>
          </DataTable.Row>
          {isEarn ? <DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell centered={true} textStyle={{color:colors.text}}>Created by</DataTable.Cell>
            <DataTable.Cell centered={true} textStyle={{color:colors.text}}>{stringTransform(getElementByIndex(filterKeyIncludeArr(member,"_id",viewData.data["createdBy"]),0).name,'c')}</DataTable.Cell>
          </DataTable.Row>:<DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell textStyle={{color:colors.text}}>Descriptions</DataTable.Cell>
            <DataTable.Cell textStyle={{color:colors.text}}>{stringTransform(viewData.data["description"],'c')}</DataTable.Cell>
          </DataTable.Row>}
          <DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell textStyle={{color:colors.text}}>Created On</DataTable.Cell>
            <DataTable.Cell textStyle={{color:colors.text}}>{dateFormat("DD MMM YYYY hh:mm A",viewData.data.createdAt)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={backgroundStyle.tableBodyStyle}>
            <DataTable.Cell textStyle={{color:colors.text}}>Updated On</DataTable.Cell>
            <DataTable.Cell textStyle={{color:colors.text}}>{dateFormat("DD MMM YYYY hh:mm A",viewData.data.updatedAt)}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  )
}

export default memo(ViewEarnExpend)

const styles = StyleSheet.create({})