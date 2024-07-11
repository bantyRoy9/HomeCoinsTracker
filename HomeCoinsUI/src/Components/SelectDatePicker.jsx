import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from 'react-native-paper';
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
  const {colors,dark} = useTheme();
  return (
    <>
      {mode === 'Daily' ?
        <DateTimePickerModal
          themeVariant='dark'
          isDarkModeEnabled={true}
          date={new Date(date)}
          isVisible={datePickerVisible}
          mode={'date'}
          onConfirm={(date)=>handleConfirm(date,mode)}
          onCancel={hideDatePicker}
          maximumDate={new Date()}
         textColor={dark?'white':'black'}
         style={true}
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
    // backgroundColor: '#f9c2ff',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});