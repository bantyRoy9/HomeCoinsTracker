import {  View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import { getMemberList } from '../../Redux/Action/memberAction';
import { DatePicker, Input, SelectPicker,Button, Modals } from '../../Components';
import { defaultStyle,updateErrors,validateForm,filterKeyIncludeArr,getElementByIndex, showAlert } from '../../Utils';
import CreateSourceExpendType from '../../Components/CreateSourceExpendType';

const AddEarn = ({navigation,editData,...props}) => {
  const defaultPropsDate=props?.route?.params??moment(new Date()).format("YYYY-MM-DD");
  const dispatch = useDispatch(),defaultDate=defaultPropsDate.split("_")[0];
  let { isLoading } = useSelector(state => state.account);
  const { source,isLoading:sourceLoading } = useSelector(state => state.source);
  const { member } = useSelector(state => state.member);
  const { user } = useSelector(state => state.user);

  const initalState = {amount:'',source:null,earnBy:null,date:defaultDate};
  editData && editData.status && editData.data && Object.keys(initalState).map(el=>initalState[el]=editData.data[el]);
  const [selectedDate, setSelectedDate] = useState(new Date(initalState.date));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [details, setDetails] = useState(initalState);
  const [errors,setErrors] = useState({});
  const [modalVisible,setModalVisible]=useState(false);


  useEffect(()=>{
    member && !member.length && dispatch(getMemberList(user.groupId));
    let userActive = getElementByIndex(filterKeyIncludeArr(member,"email",user.email),0);
    let sourceList = getElementByIndex(filterKeyIncludeArr(source,"sourceName","Auto"),0);
    (userActive || sourceList ) && !editData && setDetails({...details,earnBy:userActive._id,source:sourceList?._id});
    if(source && !source.length){
      showAlert("Need to create earning source.","",()=>{
        setModalVisible(true);
      })
    }
  },[]);

  const modalVisibleHandler =()=>{
    setModalVisible(prev=>!prev)
  }

  const changeHandler = (key, value) => {
    setErrors(updateErrors(errors,key));
    setDetails({ ...details, [key]: value });
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
    setDetails({ ...details, ["date"]: moment(new Date(date)).format('YYYY-MM-DD')});
  };
  const selectPickerChangleHandler = (e,selectType) =>{
      setErrors(updateErrors(errors,selectType));
      setDetails({ ...details, [selectType]: e});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(details,true);
    setErrors(validation.error);
    try {
      if(validation.valid){
        if(editData && editData.data){
          details['id']=editData.data._id;
        };
        dispatch(addEarnExpend(details,'earn',navigation,editData ? editData.data.date:defaultDate));
        setDetails(initalState);
      }
    } catch (err) {}
  };

  isLoading=false;
  return (
    <><View style={defaultStyle.screenContainer}>
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
            onValueChange={(e)=>selectPickerChangleHandler(e,"source")}
            placeholder="Source"
            items={source.map(el=>({label:el.sourceName,value:el._id}))}
            value={details?.source}
            icon={"soundcloud"}
            isHelper={errors.source ? true : false}
            errorMsg={errors?.source}
            helperType={'error'}
        />
      </View>
      <View>
        <SelectPicker
          onValueChange={(e)=>selectPickerChangleHandler(e,"earnBy")}
          placeholder="Earn By"
          items={member.map(el=>({label:el.name,value:el._id}))}
          value={details?.earnBy}
          icon="barcode"
          isHelper={errors.earnBy ? true : false}
          errorMsg={errors?.earnBy}
          helperType={'error'}
        />
      </View>
      <View>
        <DatePicker
          key={"date"}
          value ={selectedDate}
          onPress={showDatePicker}
          date={selectedDate}
          isVisible={datePickerVisible}
          pointerEvents={isLoading ? "none" : "auto"}
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChangeText={(text)=>changeHandler("date", text)}
          isInputBox={true}
        />
      </View>
      <Button isLoading={isLoading} onPress={submitHandler} title={(editData && editData.status) ? "Update Earn" : "Add Earn" }/>
    </View>
    {user && user.role === "admin" && !editData && <><View style={defaultStyle.viewBottom}>
    <View style={defaultStyle.screenContainer}>
      <Button isLoading={sourceLoading} onPress={modalVisibleHandler} title={"Manage earn type"} btnType={"Secondary"}/>
    </View>
  </View>
  <Modals Component={<CreateSourceExpendType modalVisibleHandler={modalVisibleHandler} pageType="source"/>} modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler} positionView={"bottomView"}/></>
  }</>
  )
}

export default AddEarn;