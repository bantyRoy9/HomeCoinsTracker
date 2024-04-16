import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';

const DateNavigation = ({ dateRange, onChange }) => {
  const navPressHandle = (navPress) => {
    onChange(navPress);
  };

  return (
    <View style={styles.navigationContainer}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Pressable onPress={() => navPressHandle({ label: 'Daily', dateRange: '2024-04-17' })} style={styles.navButton}>
          <Text style={dateRange.label === 'Daily' ? styles.activeNavText : styles.navText}>Daily</Text>
        </Pressable>
        <Pressable onPress={() => navPressHandle({ label: 'Monthly', dateRange: '2024-04-01_2024-04-30' })} style={styles.navButton}>
          <Text style={dateRange.label === 'Monthly' ? styles.activeNavText : styles.navText}>Monthly</Text>
        </Pressable>
        <Pressable onPress={() => navPressHandle({ label: 'Yearly', dateRange: '2024-01-01_2024-12-31' })} style={styles.navButton}>
          <Text style={dateRange.label === 'Yearly' ? styles.activeNavText : styles.navText}>Yearly</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  activeNavText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default DateNavigation;
