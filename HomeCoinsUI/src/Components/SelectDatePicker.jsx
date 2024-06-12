import {StyleSheet, Text, View,FlatList, Pressable} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CustomSelectDate, Modals } from '.';

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
        />:<Modals
          Component={<CustomSelectDate mode={mode} handleConfirm={handleConfirm}/>}
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