import {View, Text, Pressable, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import React, { memo } from 'react';
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
    <Pressable style={btnType === "tertiary" ? { ...styles.resendBtn,color:btnStyle.color }:{...styles.button, ...btnStyle}} onTouchStart={onPress} pointerEvents={isLoading?"none":"auto"}>
      <Text style={btnType === "tertiary" ? { ...styles.text,borderBottomWidth:1,borderBottomColor:btnStyle.backgroundColor,color:btnStyle.color } : {...styles.text, color:btnStyle.color}}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={btnType === "tertiary" ? colors.HeaderBg : colors.loaderColor} />
        ) : (
          title
        )}
      </Text>
    </Pressable>
  );
};

export default memo(Button);

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
      resendBtn:{
        alignItems: 'center',
        paddingVertical: 0,
        marginVertical: 10
      },
      otpHeading: {
        marginVertical: 40,
        gap: 10
      },
      textEmail: {
        fontSize: 18,
        fontWeight: 'normal'
      },
      textBold: {
        fontSize: 25,
        fontWeight: 'bold'
      }
});