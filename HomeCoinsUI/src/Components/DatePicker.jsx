import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Input from './Input';

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
    
      <View>
        <View pointerEvents='none'>
        {selectedDate && <Input
            placeholder={"Date"}
            label={"Enter Date"}
            isLabel={false}
            name={'date'}
            icons={'calendar'}
            value={selectedDate}
            secureTextEntry={false}
            autoFocus={false}
          />}
        </View>
        <Button title="Select a date" onPress={showDatePicker} />
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
  );
};

export default DatePicker;
