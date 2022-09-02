import React from "react";
import { StyleSheet, Text } from "react-native";

const BtnFilter = ({ value }) => {
  return <Text style={styles.txt}>{value}</Text>;
};

const styles = StyleSheet.create({
  txt: {
    color: "#6bada0",
    borderRadius: 100,
    borderColor: "#6bada0",
    borderWidth: 1,
    width: 80,
    margin: 30,
    textAlign: "center",
  },
});

export default BtnFilter;
