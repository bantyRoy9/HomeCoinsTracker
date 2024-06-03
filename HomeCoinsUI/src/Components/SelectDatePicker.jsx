import {StyleSheet, Text, View,FlatList} from 'react-native';
import React, {memo} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from './Modal';
import { getMonthLists } from '../Utils/CommonAuthFunction';

const CustomSelectDateModal = ({mode}) => {
  const monthList = getMonthLists(2024)
  console.log(monthList);
  return (
    <View style={styles.container}>
      <FlatList
        data={monthList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
      />
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