import React, {memo, useEffect, useState, useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { defaultStyle, stringTransform } from '../../Utils';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Modals } from '../../Components';
import AddEarn from '../AddEarnExpens/AddEarn';
import AddExpend from '../AddEarnExpens/AddExpend';
import { filterKeyIncludeArr, getElementByIndex, showAlert } from '../../Utils/CommonAuthFunction';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import IncomeExpendSection from './IncomeExpendSection';
import ViewEarnExpend from '../AddEarnExpens/ViewEarnExpend';

const Daily = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const backgroundStyle = useMemo(() => ({ backgroundColor: colors.background, color: colors.text }), [colors]);
    const { isLoading, account } = useSelector(state => state.account);
    const { source } = useSelector(state => state.source);
    const { user } = useSelector(state => state.user);
    const initialState = { status: false, element: null, data: null,longPress:false };
    const [modalVisible, setModalVisible] = useState(initialState);

    useEffect(() => {
      setModalVisible(initialState);
    }, [account]);

    const modalVisibleHandler = useCallback((type, data,longPress) => {
      if(longPress){
        let isEdit = true;
        if(data.createdBy && data.createdBy !== user["_id"]){
          isEdit=false;
        }else if(data.expendBy && data.expendBy !== user["_id"]){
          isEdit=false;
        };
        if(user.role == "admin"){
          isEdit=true
        }
        if(!isEdit){
          showAlert("you don't have permission to update other activity");
          return false;
        }
      }
      setModalVisible(prev => ({ ...prev, status: !prev.status, element: type, data: data,longPress }));
    }, [user]);

    const deleteHandler = useCallback(() => {
      if (modalVisible.data) {
        modalVisible.data['isDelete'] = true;
        dispatch(addEarnExpend(modalVisible.data, modalVisible.element));
      }
    },[modalVisible]);
    
    const bodyStyle={...styles.bodyTextStyle,backgroundColor:colors.surfaceVariant};
    const renderList = useCallback((list, type) => list.length && list.map((el, idx) => (
      <Pressable key={idx + type} onPress={() => modalVisibleHandler(type, el,false)} onLongPress={()=>modalVisibleHandler(type,el,true)}>
        <View style={bodyStyle}>
          <Text style={{ color: colors.text }}>{el.createdBy ? (el.createdBy === user?._id || user?.role === "admin") ? <Text>🟢 </Text>:"": (el.expendBy === user?._id || user?.role === "admin") ? <Text>🔴 </Text>:""}{stringTransform(type === "Earn" ? getElementByIndex(filterKeyIncludeArr(source, "_id", el.source), 0, "sourceName") : el.description, 'c')}</Text>
          <Text style={{ color: colors.text }}>₹{parseFloat(el?.amount ?? 0).toFixed(2)}</Text>
        </View>
      </Pressable>
    )),[user,source]);

    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {isLoading ? (
            <View style={defaultStyle.activityIndicator}>
              <ActivityIndicator size="large" color={colors.text} />
            </View>
          ) : (
            <View style={defaultStyle.viewSection}>
              <IncomeExpendSection account={account} colors={colors} renderList={renderList} type="Earn" />
              <IncomeExpendSection account={account} colors={colors} renderList={renderList} type="Expend" />
              <Modals 
                Component={modalVisible.longPress ? modalVisible.element === "Earn" ?  <AddEarn editData={modalVisible} isDelete={true} /> : <AddExpend editData={modalVisible} /> : <ViewEarnExpend viewData={modalVisible}/>} 
                modalVisible={modalVisible.status} 
                modalVisibleHandler={() => modalVisibleHandler(null, null)} 
                onDelete={modalVisible.longPress && deleteHandler}
                modalType={!modalVisible.longPress ? "Secondary" :"Primary"} 
                bottomView={true}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    bodyTextStyle: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 }
});

export default memo(Daily);
