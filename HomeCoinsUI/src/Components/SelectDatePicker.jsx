import {StyleSheet, Text, View,FlatList, Pressable} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from './Modal';
import { getMonthLists, getYearLists } from '../Utils/CommonAuthFunction';
import SelectPicker from './SelectPicker';
import moment from 'moment';

const CustomSelectDateModal = ({mode}) => {
  const [yearLists,setYearList]=useState([]);
  const [monthList,setMonthList]=useState([]);
  const [year,setYear]=useState({label:2024,value:2024});
  const onValueChange=()=>{

  };
  const pressHandler = (idx) =>{

  }
  useEffect(()=>{
    const currentYear = new Date().getFullYear();
    setYear({label:currentYear,value:currentYear});
    setYearList(getYearLists(currentYear,currentYear - 10));
    setMonthList(getMonthLists(2024,"M"));
  },[])
  console.log(yearLists,monthList);
  return (
    <View style={styles.container}>
      <View>
        {(yearLists && yearLists.length) ? <SelectPicker value={"2023"} placeholder={"Select Year"} icon={'calendar'} items={yearLists.map(el=>({label:el,value:el}))} onValueChange={(e)=>onValueChange(e,"year")}/>:<Text></Text>}
      </View>
      <View>
        <View>
          {monthList.map((el,idx)=>(
            <Pressable onPress={pressHandler}><Text>{el}</Text></Pressable>
          ))}
        </View>
      </View>
      {/* <FlatList
        data={monthList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

const SelectDatePicker = ({
  mode,
  date,
  datePickerVisible,
  handleConfirm,
  hideDatePicker,
  dateModalVisible,
  dateModalhandler,
}) => {
  return (
    <>
      {mode === 'Daily' ?
        <DateTimePickerModal
          date={new Date(date)}
          isVisible={datePickerVisible}
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
        />:<Modal
          Component={<CustomSelectDateModal mode={mode} />}
          modalVisible={datePickerVisible}
          modalVisibleHandler={dateModalhandler}
          bottomView={false}
        />
      }
    </>
  );
};

export default memo(SelectDatePicker);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});