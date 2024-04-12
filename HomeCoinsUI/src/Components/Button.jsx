import {View, Text, Pressable, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
const Button = ({
  onPress,
  isLoading,
  title,
  btnType="Primary"
}) => {
  const { colors } = useTheme();
  const btnStyle = {
    backgroundColor: colors[`btn${btnType}Background`],
    color: colors[`btn${btnType}Color`]
  }
  return (
    <Pressable style={{...styles.button, ...btnStyle}} onPress={onPress} pointerEvents={isLoading?"none":"auto"}>
      <Text style={{...styles.text, color:btnStyle.color}}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.loaderColor} />
        ) : (
          title
        )}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        width: "100%",
        marginVertical: 15
      },
      text: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        letterSpacing: 0.25,
      },
});