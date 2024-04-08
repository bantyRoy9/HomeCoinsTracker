import React from 'react';
import {Modal, StyleSheet, View, TouchableWithoutFeedback, Text, Pressable} from 'react-native';
import {AddEarn} from '../Screens';
import { FontAwesome5 } from '../Utils';
import { useTheme }  from 'react-native-paper';
const Modals = ({Component,modalVisible,type, modalVisibleHandler}) => {
  const { colors } = useTheme();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={modalVisibleHandler}>
      <TouchableWithoutFeedback onPress={modalVisibleHandler}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <>
            {Component && <View style={styles.centeredView}>
              <View style={{justifyContent:'center',display:'flex',alignItems:'center',borderRadius:30}}>
                <Pressable style={{backgroundColor:"red",alignItems:'center',gap:10,flexDirection:'row',paddingHorizontal:25,paddingVertical:15,position:'absolute',top:-60,borderRadius:50}}>
                <FontAwesome5 name='trash-alt' color={colors.HeaderText} size={20}/>
                <Text style={{color:colors.HeaderText,fontSize:15}}>Delete {type}</Text>
                </Pressable>
              </View>
              {Component}
            </View>}</>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(1, 66, 131,.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    // margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingTop:35,
    width:'100%',
    height:'auto',
    position:'absolute',
    bottom:0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modals;
