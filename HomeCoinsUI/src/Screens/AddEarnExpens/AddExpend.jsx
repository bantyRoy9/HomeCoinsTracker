import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
import { defaultStyle,showAlert,updateErrors,validateForm } from '../../Utils';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import {Input,DatePicker, SelectPicker, Modals} from '../../Components';
import Button from '../../Components/Button';
import CreateSourceExpendType from '../../Components/CreateSourceExpendType';

const AddExpend = ({navigation,editData,...props}) => {
  const defaultPropsDate=props?.route?.params??moment(new Date()).format("YYYY-MM-DD");
  const dispatch = useDispatch(),defaultDate=defaultPropsDate.split("_")[0];
  const { isLoading,account } = useSelector(state=> state.account);
  const { expendType,isLoading:sourceLoading } = useSelector(state=> state.source);
  const { user } = useSelector(state=>state.user);
  const initialState = {amount:"",description:"",expendType:"",date:defaultDate};
  editData && editData.data && Object.keys(initialState).map(el=>initialState[el]=editData.data[el]);
  const [selectedDate, setSelectedDate] = useState(new Date(initialState.date));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [errors,setErrors] = useState({});
  const [modalVisible,setModalVisible]=useState(false);
  useEffect(()=>{
    if(expendType && !expendType.length){
      showAlert("Need to create expend type.","",()=>{
        setModalVisible(true);
      })
    }
  },[])
  const changeHandler = (name, value) => {
    setErrors(updateErrors(errors,name));
    setDetails({ ...details, [name]: value })
  };
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    setDetails({ ...details, date: moment(new Date(date)).format('YYYY-MM-DD')});
  };
  const selectPickerChangleHandler = (e,selectType) =>{
    setErrors(updateErrors(errors,selectType));
    setDetails({ ...details, [selectType]: e});
  };
  const modalVisibleHandler =()=>{
    setModalVisible(prev=>!prev)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(details);
    setErrors(validation.error);
    try {
      if(validation.valid){
        if(editData && editData.data){
          details["id"]=editData.data._id;
        }
        dispatch(addEarnExpend(details,'expend',navigation,editData ? editData.data.date:defaultDate));
      }
    } catch (err) {}
  };
  return (
    <>
    <View style={defaultStyle.screenContainer}>
        <View>
          <Input
            key={"Amount"}
            placeholder={"Amount"}
            label={"Enter Amount"}
            isLabel={false}
            name={'amount'}
            icons={'money-bill-alt'}
            value={details?.amount.toString()}
            secureTextEntry={false}
            autoFocus={false}
            keyboardType={'numeric'}
            pointerEvents={isLoading ? "none" : "auto"}
            onChangeText={(text) => changeHandler("amount", text)}
            isHelper={errors.amount ? true : false}
            errorMsg={errors?.amount}
            helperType={'error'}
          />
        </View>
        <View>
          <SelectPicker
            onValueChange={(e)=>selectPickerChangleHandler(e,"expendType")}
            placeholder="Expend To"
            items={expendType.map(el=>({label:el.expendName,value:el._id}))}
            value={details?.expendType}
            icon={"soundcloud"}
            isHelper={errors.expendType ? true : false}
            errorMsg={errors?.expendType}
            helperType={'error'}
          />
        </View>
        <View>
          <Input
            key={"Description"}
            placeholder={"Description"}
            label={"Enter Description"}
            isLabel={false}
            name={'description'}
            icons={'barcode'}
            value={details?.description}
            secureTextEntry={false}
            autoFocus={false}
            pointerEvents={isLoading ? "none" : "auto"}
            onChangeText={(text) => changeHandler("description", text)}
            isHelper={errors.description ? true : false}
            errorMsg={errors?.description}
            helperType={'error'}
          />
        </View>
        <View>
          <DatePicker 
          key="date"
          value ={selectedDate}
          onPress={showDatePicker}
          date={selectedDate}
          isVisible={datePickerVisible}
          pointerEvents={isLoading ? "none" : "auto"}
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChangeText={(text)=>changeHandler("date" , text)}
          isInputBox={true}
          />
          
        </View>
        <Button isLoading={isLoading} onPress={submitHandler} title={`${(editData && editData.status) ? "Update" : "Add"} expend`}/>
      </View>
      {user && user.role === "admin" && !editData && <><View style={defaultStyle.viewBottom}>
        <View style={defaultStyle.screenContainer}>
          <Button isLoading={sourceLoading} onPress={modalVisibleHandler} title={"Manage expend type"} btnType={"Secondary"}/>
        </View>
      </View>
      <Modals Component={<CreateSourceExpendType modalVisibleHandler={modalVisibleHandler} pageType="expend"/>} modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler} positionView={"bottomView"}/></>
      }
      </>
  )
}

export default AddExpend
