import {ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
const DefaultLayout = ({ Component,...props }) => {
  const {colors, dark} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text,
  };
  
  return (
    <SafeAreaView style={{...backgroundStyle, height: '100%'}}>
      <StatusBar
        // barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.HeaderBg}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <Component {...props}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DefaultLayout;
