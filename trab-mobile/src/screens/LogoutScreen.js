
import { useAlerts } from "react-native-paper-alerts";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function LogoutScreen ({ navigation }) {
  
    const Alerts = useAlerts();

    useEffect(() => {
    Alerts.alert("Você foi desconectado da sua conta.")
     navigation.navigate("Initial")
    }, []);
  
    return(
      <Text></Text>
    )
  }