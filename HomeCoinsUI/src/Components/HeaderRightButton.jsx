import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '../Utils';

const HeaderRightButton = ({ iconName, onPress, colors,notification }) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesome5 name={iconName} size={20} color={colors.HeaderText} />
    {notification && <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 50, backgroundColor: colors.notification, right: 0 }}></View>}
  </TouchableOpacity>
);

export default HeaderRightButton;
