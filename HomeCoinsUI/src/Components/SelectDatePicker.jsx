import { StyleSheet, Text, View } from 'react-native'
import React,{memo} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from './Modal';

const CustomSelectDateModal = () =>{
    return(
        <View>
        <Text>
            Yearly | Monthly
            </Text>
        </View>
    )
};

const SelectDatePicker = ({mode,date,datePickerVisible,handleConfirm,hideDatePicker,dateModalVisible,dateModalhandler}) => {
    const modeType = mode;
    console.log(modeType,dateModalhandler,dateModalVisible);
  return (
    <>
    {modeType === "daily" && <DateTimePickerModal date={new Date(date)} isVisible={datePickerVisible} mode={'date'} onConfirm={handleConfirm} onCancel={hideDatePicker} maximumDate={new Date()} />}
    {(modeType === "monthly" || modeType === "Yearly") && <Modal Component={<CustomSelectDateModal modeType={modeType} />} modalVisible={datePickerVisible} modalVisibleHandler={dateModalhandler} bottomView={false} />}
    </>
  )
}

export default memo(SelectDatePicker)

const styles = StyleSheet.create({})