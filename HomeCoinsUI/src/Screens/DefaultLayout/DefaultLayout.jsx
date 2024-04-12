import {ScrollView, StatusBar, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
import { Header } from '../../Components';
const DefaultLayout = ({ Component,...props }) => {
  const {colors, dark} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    marginBottom:0
  };
  return (<>
    <SafeAreaView style={{...backgroundStyle, height: '100%'}}>
      <StatusBar
        barStyle={!dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.HeaderBg}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={props.isFlexCenter && {flex:1,height:'100%',justifyContent:'center'}}
        >
        <Component {...props}/>
      </ScrollView>
      {props.isFlexCenter && props.route.name !=="Login" && <View><Header title={props.route.name}/></View>}
    </SafeAreaView>
    </>
  );
};

export default DefaultLayout;
