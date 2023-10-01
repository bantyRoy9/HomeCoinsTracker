import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button,Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from './Input';
import moment from 'moment';
const DatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  return (
    
      <View style={{position:'relative'}}>
        <View pointerEvents='none'>
        {selectedDate && <Input
            placeholder={"Date"}
            label={"Enter Date"}
            isLabel={false}
            name={'date'}
            icons={'calendar'}
            value={moment(props?.value)?.format('YYYY-MM-DD')}
            secureTextEntry={false}
            autoFocus={false}
          />}
        </View>
        <View style={{position:'absolute',width:'100%',height:50,top:12}}>
          <Pressable onPress={props?.onPress??showDatePicker} style={{height:'100%',alignItems:'center',borderRadius:10}}></Pressable>
        </View>
        <DateTimePickerModal
          date={props?.date??selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
  );
};

export default DatePicker;
