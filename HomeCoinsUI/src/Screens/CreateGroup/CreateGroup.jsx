import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { FontAwesome5, defaultStyle } from '../../Utils';
import Group from './Group';

const CreateGroup = ({ navigation,route }) => {
  const { colors, dark } = useTheme();
  const backgroudStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  
  const navigatePage=(pageName)=>{
    navigation.navigate(pageName);
  };
  return (
    <SafeAreaView style={{ ...backgroudStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
        <View style={defaultStyle.screenContainer}>
          { route.name == "CreateGroup" && <View style={styles.createGroupSection}>
            <Pressable style={{...styles.sectionCircle,backgroundColor:colors.lightBackground,color:colors.text}} onPress={()=>navigatePage('CreateNewGroup')}>
              <View style={styles.sectionText}>
                <FontAwesome5 name='user-plus' size={30} color={colors.text}/>
                <Text style={{...defaultStyle.textBold,color:colors.text}}>Create New Group</Text>
              </View>
            </Pressable>
            <View>
              <Text style={{...defaultStyle.textBold,...styles.sectionOr,color:colors.text}}>OR</Text>
            </View>
            <Pressable style={{...styles.sectionCircle,backgroundColor:colors.lightBackground}} onPress={()=>navigatePage('ExistingGroup')}>
              <View style={styles.sectionText}>
                <FontAwesome5 name='users' size={30}  color={colors.text}/>
                <Text style={{...defaultStyle.textBold,color:colors.text}}>Existing Group</Text>
              </View>
            </Pressable>
          </View>}
          { route.name == "CreateNewGroup" && <Group pageName={route.name} colors={colors} />}
          { route.name == "ExistingGroup" && <Group pageName={route.name} colors={colors} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  createGroupSection: {
    alignItems:'center',
    height:"100%",
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  sectionCircle: {
    width:200,
    height:200,
    borderRadius:100,
    textAlign:'center',
  },
  sectionText:{
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    fontSize:20,
    gap:5
  },
  sectionOr:{
    paddingVertical:5,
    paddingHorizontal:15,
    fontSize:24
  }
})