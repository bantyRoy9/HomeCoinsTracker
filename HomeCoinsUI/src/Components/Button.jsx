import {View, Text, Pressable, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
const Button = ({
  onPress,
  isLoading,
  title
}) => {
  const { colors } = useTheme();
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.text
  }
  return (
    <Pressable style={{...styles.button, ...btnStyle}} onPress={onPress} pointerEvents={isLoading?"none":"auto"}>
      <Text style={{...styles.text, ...btnStyle.color}}>
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
        borderRadius: 10,
        width: "100%",
        marginVertical: 15
      },
      text: {
        color:'rgb(255,255,255)',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
      },
});