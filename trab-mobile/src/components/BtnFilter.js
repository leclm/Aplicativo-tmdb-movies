import React from 'react';
import { StyleSheet, Text } from 'react-native';

const BtnFilter = ({ value }) => {
  return (    
    <Text style={styles.txt}>{value}</Text>
  )
}

const styles = StyleSheet.create({
  txt: {
    color: 'red',
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
    width: 80,
    margin: 30,
    textAlign: 'center',
  }
});

export default BtnFilter;