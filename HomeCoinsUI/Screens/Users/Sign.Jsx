import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
function Section({ children, title }) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black }]}>
          {title}
        </Text>
        <Text style={[styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark, },]}>
          {children}
        </Text>
      </View>
    );
  }
const Sign = () => {
  return (
    <View>
      <Text>Sign</Text>
    </View>
  )
}

export default Sign

const styles = StyleSheet.create({})