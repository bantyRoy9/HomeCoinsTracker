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
  };

  return (<>
    <SafeAreaView style={{...backgroundStyle,height:"100%"}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.HeaderBg}
      />
      {props.isFlatList ? <Component {...props}/> : <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle} contentContainerStyle={props.isFlexCenter ? {justifyContent:'center',height:'100%'} : {height:'100%'}}>
        <Component {...props}/>
      </ScrollView>}
      {/* {props.isFlexCenter && props.route.name !=="Login" && <View><Header title={props.route.name}/></View>} */}
    </SafeAreaView>
    </>
  );
};

export default DefaultLayout;
