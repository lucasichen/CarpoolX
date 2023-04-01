import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomUserIcon = ({ initials }) => {
    return (
      <View
        style={styles.container}>
        <Text style={{ color: 'white', fontSize: 25 }}>{initials}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 100,
        height: 100,
        marginVertical: 20,
    }
});

export default CustomUserIcon