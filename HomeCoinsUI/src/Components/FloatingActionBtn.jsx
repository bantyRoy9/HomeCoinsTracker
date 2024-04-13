import React, { useState } from 'react';
import { FAB, Portal, PaperProvider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { defaultStyle } from '../Utils/defaultStyle';

const FloatingActionBtn = ({dateRange}) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();
  const onStateChange = () => {
    setOpen(!open);
  };

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          style={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
          backdropColor='rgba(52, 52, 52, 0.1)'
          open={open} visible icon={open ? 'close' : 'plus'}
          actions={[{
            icon: 'home-plus',
            label: 'Earn    ',
            labelTextColor:colors.text,
            color:colors.text,
            labelStyle: {
              backgroundColor: '#5aa16d',
              marginRight: -50,
              marginBottom: -30,
              paddingVertical:8,
              paddingHorizontal: 20,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10
            },
            style: {
              backgroundColor: '#5aa16d',
              marginBottom: -30,
              
            },
            onPress: () => navigation.navigate('AddEarn',dateRange)
          }, {
            icon: 'home-minus',
            label: 'Expend   ',
            labelTextColor:colors.text,
            color:colors.text,
            labelStyle: {
              backgroundColor: '#a15a76',
              marginRight: -50,
              marginBottom: -30,
              paddingVertical: 8,
              paddingHorizontal:20,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
            style: {
              backgroundColor: '#a15a76',
              marginBottom: -30,
            },
            onPress: () => navigation.navigate('AddExpend',dateRange),
          },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};

export default FloatingActionBtn;