import {View, Text, Pressable, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({
    onPress,
    btnStyle,
    isLoading,
    colors,
    title
}) => {
  return (
    <Pressable style={{...styles.button, ...btnStyle}} onPress={onPress}>
      <Text style={{...styles.text, ...btnStyle.color}}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.text} />
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
        textTransform:'uppercase',
        color:'rgb(255,255,255)',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
      },
});