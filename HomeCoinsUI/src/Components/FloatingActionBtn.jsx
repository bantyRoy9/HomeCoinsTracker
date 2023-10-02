import React,{ useState } from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { defaultStyle } from '../Utils/defaultCss';

const FloatingActionBtn = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const onStateChange = () => {
    setOpen(!open);
  };

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group 
        style={{
          backgroundColor:'rgba(52, 52, 52, 0.1)'
        }} open={open} visible icon={open ? 'close' : 'plus'}
          actions={[{
            icon: 'home-plus',
            label: 'Add Earn',
            labelStyle:{
              backgroundColor:'green',
              marginRight:-34,
              marginBottom:-30,
              padding:6,
              borderTopLeftRadius:10,
              borderBottomLeftRadius:10
            },
            style: {
              backgroundColor:'green',
              marginBottom:-30
            },
            onPress: () => navigation.navigate('AddEarn')
          },{
            icon: 'home-minus',
            label: 'Add Expend',
            labelStyle:{
              backgroundColor:'red',
              marginRight:-34,
              marginBottom:-30,
              padding:6,
              borderTopLeftRadius:10,
              borderBottomLeftRadius:10
            },
            style: {
              backgroundColor:'red',
              marginBottom:-30
            },
            onPress: () => navigation.navigate('AddExpend'),
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