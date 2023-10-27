import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle } from '../../Utils';

const CreateGroup = () => {
  const { colors, dark } = useTheme();
  const backgroudStyle = {
    backgroundColor: colors.background,
    color: colors.text
  }
  return (
    <SafeAreaView style={{ ...backgroudStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'dark-content' : 'light-content'} backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
        <View style={defaultStyle.screenContainer}>
          <View style={styles.createGroupSection}>
            <View style={styles.sectionCircle}>

            </View>
            <View style={styles.sectionCircle}>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  createGroupSection: {
    // borderColor:'red',
    // borderWidth:1,
    alignItems:'center',
    height:"100%",
    flexDirection:'column',
    justifyContent:'space-evenly',
    
  },
  sectionCircle: {
    width:200,
    height:200,
    borderRadius:100,
    borderWidth:1,
    borderColor:'#3d3d3d'
  }
})