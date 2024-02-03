import React, { useState } from 'react';
import { View,Pressable } from 'react-native';
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
        {selectedDate && props.isInputBox && <View pointerEvents='none'>
         <Input
            placeholder={"Date"}
            label={"Enter Date"}
            isLabel={false}
            name={'date'}
            icons={'calendar'}
            value={moment(props?.value)?.format('YYYY-MM-DD')}
            secureTextEntry={false}
            autoFocus={false}
            onChangeText={props?.onChangeText}
          />
        </View>}
        <View style={{position:'absolute',width:'100%',height:50,top:12}} pointerEvents={props?.pointerEvents}>
          <Pressable onPress={props?.onPress??showDatePicker} style={{height:'100%',alignItems:'center',borderRadius:10}}></Pressable>
        </View>
        <DateTimePickerModal
          date={props?.date??selectedDate}
          isVisible={props?.isVisible??datePickerVisible}
          mode={props?.mode??"datetime"}
          onConfirm={props?.onConfirm??handleConfirm}
          onCancel={props?.onCancel??hideDatePicker}
          maximumDate={new Date()}
          isInputBox={true}
        />
      </View>
  );
};

export default DatePicker;
