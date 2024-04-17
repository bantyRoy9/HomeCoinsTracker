import React,{memo} from 'react';
import {Modal, StyleSheet, View, TouchableWithoutFeedback, Text, Pressable, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '../Utils';
import { useTheme }  from 'react-native-paper';
const Modals = memo(({Component,modalVisible,type,modalVisibleHandler,bottomView=true,onDelete}) => {
  const { colors } = useTheme();
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={modalVisibleHandler}>
      <TouchableWithoutFeedback onPress={modalVisibleHandler}>
        <View style={[styles.overlay,{backgroundColor:colors.modalOverlayColor}]}>
          <TouchableWithoutFeedback>
            <> 
            {Component && <View style={[styles.centeredView,bottomView && styles["bottomView"],{backgroundColor:colors.background}]}>
              <View style={{justifyContent:'center',display:'flex',alignItems:'center',borderRadius:30}}>
                {onDelete ? <Pressable onPress={onDelete} style={{backgroundColor:"red",alignItems:'center',gap:10,flexDirection:'row',paddingHorizontal:25,paddingVertical:15,position:'absolute',top:-60,borderRadius:50}}>
                <FontAwesome5 name='trash-alt' color={colors.HeaderText} size={20}/>
                <Text style={{color:colors.HeaderText,fontSize:15}}>Delete {type}</Text>
                </Pressable> : <Pressable style={{height:40,position:'absolute',top:-33}} onTouchStart={modalVisibleHandler}><View style={{width:120,height:5,backgroundColor:colors.surfaceVariant}}></View></Pressable>}
              </View>
              {Component}
            </View>}</>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    padding: 15,
    paddingTop:35,
    borderRadius:10,
    width:'95%',
    height:'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 15,
  },
  bottomView:{
    position:'absolute',
    width:'100%',
    bottom:0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }
});

export default Modals;
