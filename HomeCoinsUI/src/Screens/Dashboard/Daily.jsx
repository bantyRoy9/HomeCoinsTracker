import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { defaultStyle, stringTransform } from '../../Utils'
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { Modals } from '../../Components'
import AddEarn from '../AddEarnExpens/AddEarn'
import AddExpend from '../AddEarnExpens/AddExpend'
import { filterKeyIncludeArr, getElementByIndex } from '../../Utils/CommonAuthFunction'
import { addEarnExpend } from '../../Redux/Action/accountAction';

const Daily = () => {
    const { colors } = useTheme(),dispatch = useDispatch();
    const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
    const { isLoading, account } = useSelector(state => state.account);
    const { source,expendType } = useSelector(state=>state.source);
    const initialState = {status:false,element:null,data:null};
    const [modalVisible,setModalVisible]=useState(initialState);

    useEffect(()=>{
      setModalVisible(initialState);
    },[account]);

    const modalVisibleHandler =(type,data)=>{
      setModalVisible(prev=> ({...prev,status:!prev.status,element:type,data:data}))
    };
    const deleteHandler = () =>{
      modalVisible.data['isDelete']=true;
      dispatch(addEarnExpend(modalVisible.data,modalVisible.element))
    }

    const headerStyle={...styles.bodyTextStyle,paddingVertical:10,paddingHorizontal:12,backgroundColor:colors.HeaderBg};
    const headerTextStyle={...defaultStyle.text,color:colors.HeaderText};
    const bodyStyle={...styles.bodyTextStyle,backgroundColor:colors.surfaceVariant};
    const noDataFound = {...styles.bodyTextStyle,justifyContent:'center',backgroundColor:colors.surfaceVariant};
    return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
               <View style={{marginBottom:10}}>
                <View style={headerStyle}>
                  <Text style={headerTextStyle}>Total Income</Text>
                  <Text style={headerTextStyle}>₹{(account && account.earnList && account.earnList.length>0) ? (account.earnList.reduce((total,list)=>parseFloat(list?.amount??0)+total,0)).toFixed(2) : "0.00"}</Text>
                </View>
                <View>
                  {(account && account.earnList && account.earnList.length>0) ? account.earnList.map((el,idx)=>(<Pressable key={idx+'earn'} onPress={()=>modalVisibleHandler("Earn",el)}>
                    <View style={bodyStyle}>
                      <Text style={{color:colors.text}}>{stringTransform(getElementByIndex(filterKeyIncludeArr(source,"_id",el.source),0,"sourceName"),'c')}</Text>
                      <Text style={{color:colors.text}}>₹{parseFloat(el?.amount??0).toFixed(2)}</Text>
                    </View>
                  </Pressable>)) : <View style={noDataFound}><Text style={{color:colors.error}}>Income Not Found</Text></View>}
                </View>
               </View>
               <View>
                <View style={headerStyle}>
                  <Text style={headerTextStyle}>Total Expend</Text>
                  <Text style={headerTextStyle}>₹{(account && account.expendList && account.expendList.length>0) ? (account.expendList.reduce((total,list)=>parseFloat(list?.amount??0)+total,0)).toFixed(2):"0.00"}</Text>
                </View>
                <View>
                  {(account && account.expendList && account.expendList.length>0) ? account.expendList.map((el,idx)=>(<Pressable onPress={()=>modalVisibleHandler("Expend",el)} key={idx+'expend'}>
                    <View style={bodyStyle}>
                      <Text style={{color:colors.text}}>{stringTransform(el.description,'c')}</Text>
                      <Text style={{color:colors.text}}>₹{parseFloat(el?.amount??0).toFixed(2)}</Text>
                    </View>
                  </Pressable>)) : <View style={noDataFound}><Text style={{color:colors.error}}>Expend Not Found</Text></View>}
                </View>
                <Modals Component={modalVisible.element === "Earn" ? <AddEarn editData={modalVisible} isDelete={true}/> :<AddExpend editData={modalVisible}/>} modalVisible={modalVisible.status} modalVisibleHandler={modalVisibleHandler} onDelete={deleteHandler}/>
               </View>
            </View></>}
        </View>
      </ScrollView>
  )
}

export default Daily


const styles = StyleSheet.create({
    bodyTextStyle:{flexDirection:'row',justifyContent:'space-between',padding:10}
  })