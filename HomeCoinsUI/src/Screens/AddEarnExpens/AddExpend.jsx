import React, { useState } from 'react'
import { View } from 'react-native'
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux';
import { defaultStyle,updateErrors,validateForm } from '../../Utils';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import {Input,DatePicker, SelectPicker, Modals} from '../../Components';
import Button from '../../Components/Button';
import CreateSourceExpendType from '../../Components/CreateSourceExpendType';

const AddExpend = ({navigation,editData}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state=> state.account);
  const { expendType,isLoading:sourceLoading } = useSelector(state=> state.source);
  const { user } = useSelector(state=>state.user);

  const initialState = {amount:"",description:"",expendType:"",date:moment(new Date()).format('YYYY-MM-DD')};
  if(editData && editData.data){
    Object.keys(initialState).map(el=>initialState[el]=editData.data[el]);
  };
  const [selectedDate, setSelectedDate] = useState((editData && editData.data ) ? new Date(editData.data.date) : new Date());
  const [details, setDetails] = useState(initialState);
  const [errors,setErrors] = useState({});
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [modalVisible,setModalVisible]=useState(false);
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
          details["id"]=editData.data._id
        }
        console.log(details);
        dispatch(addEarnExpend(details,'expend',navigation));
        setDetails(initialState);
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
            icons={'money'}
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
            items={expendType.map(el=>({label:el.name,value:el._id}))}
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
          key="Date"
          value ={selectedDate}
          onPress={showDatePicker}
          date={selectedDate}
          isVisible={datePickerVisible}
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          pointerEvents={isLoading ? "none" : "auto"}
          onChangeText={(text)=>changeHandler("date" , text)}
          isHelper={errors.date ? true : false}
          errorMsg={errors?.date}
          helperType={'error'}
          isInputBox={true}
          />
          
        </View>
        <Button isLoading={isLoading} onPress={submitHandler} title={`${(editData && editData.status) ? "Update" : "Add"} expend`}/>
      </View>
      {user && user.role === "admin" && <><View style={defaultStyle.viewBottom}>
        <View style={defaultStyle.screenContainer}>
          <Button isLoading={sourceLoading} onPress={modalVisibleHandler} title={"Create New Expend Type"} btnType={"Secondary"}/>
        </View>
      </View>
      <Modals Component={<CreateSourceExpendType/>} modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler} /></>
      }
      </>
  )
}

export default AddExpend
