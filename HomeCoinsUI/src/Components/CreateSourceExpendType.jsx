import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useSelector } from 'react-redux';

const CreateSourceExpendType = () => {
    const [details,setDetails]=useState({});
    const [errors,setErrors]=useState({});
    const {isLoading}=useSelector(state=>state.source);

  const changeHandler = () => {};
  return (
    <>
      <Input
        key={'name'}
        placeholder={'Name'}
        name={'name'}
        icons={'barcode'}
        value={details?.name}
        secureTextEntry={false}
        autoFocus={false}
        pointerEvents={isLoading ? 'none' : 'auto'}
        onChangeText={text => changeHandler('name', text)}
        isHelper={errors.name ? true : false}
        errorMsg={errors?.name}
        helperType={'error'}
      />
      <Input />
      <Button title={'Create New Expend Type'} />
    </>
  );
};

export default CreateSourceExpendType;

const styles = StyleSheet.create({});
