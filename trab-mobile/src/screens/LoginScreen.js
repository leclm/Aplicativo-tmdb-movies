import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../assets/scripts/colors.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../api/firebaseConnection';
import { useAlerts } from "react-native-paper-alerts";
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const alerts = useAlerts();
    async function logar(){
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then( (value) => {
       global.user = value.user.email;
       navigation.navigate('Start', { user: value.user.email })
       //Navegando usuario para Home e levando o email do usuario para a tela home
  
      })
      .catch( (error) => {
        alerts.alert('Algo deu errado no login! Tente novamente.');
          return;
          //Der algum erro mostrar o alert e barrar aqui.
      })
  
      setEmail('');
      setPassword('');
    }

  return (
    
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.description}>SEJA BEM VINDO!</Text>
        </View>
        <View style={styles.header2}>
            <Text style={styles.description}>___________________________</Text>
        </View>

        <View style={styles.header2}>
            <Text style={styles.description2}>Faça Login em sua conta</Text>
        </View>
        {/*
        <View style={styles.entraFG}>
            <View style={styles.tipodeentrada}>
            <TouchableOpacity onPress={() => navigation.navigate("Initial")}>
                <Icon name="facebook-square" size={16} color="#a4d7c8">
                <Text style={styles.txtTipo}>   Entrar com facebook</Text>
                </Icon>
            </TouchableOpacity>
            </View>

            <View style={styles.tipodeentrada}>
            <TouchableOpacity onPress={() => navigation.navigate("Initial")}>
                <Icon name="google" size={16} color="#a4d7c8">
                <Text style={styles.txtTipo}>     Entrar com Google</Text>
                </Icon>
            </TouchableOpacity>
            </View>
        </View>
        
        */}

        <View style={styles.loginEntrada}>
            <View style={styles.containerbtn}>
            <Feather name="user" size={18} color="#a4d7c8" />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="E-mail"
                    onChangeText={(texto) => setEmail(texto) }
                    value={email}
      
                />
            </View>

            <View style={styles.containerbtn}>
            <Feather name="key" size={18} color="#a4d7c8" />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Senha"
                    onChangeText={(texto) => setPassword(texto) }
                    value={password}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.entrar}>
            <TouchableOpacity title="ENTRAR" onPress={logar}>
                <Text style={styles.txt}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Initial")}>
                <Text style={styles.txt}>SAIR</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.txtTipo2}>
                <TouchableOpacity onPress={ () => navigation.navigate('Cadastro')}>
                     <Text style={styles.register} >Não tem uma conta? Registre-se</Text>
                 </TouchableOpacity>
            </View>
            
        </View>
        
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    padding: 30,
    margin: 'auto',
    borderRadius: 10,
    shadowRadius: 20,

  },
  containerbtn: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    margin: 10,
    alignItems: "center",
  },
  entraFG: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 30,
  },
  register:{
     color: '#ffffff',
  },
  tipodeentrada: {
    width: 180,
    flexDirection: "row",
    justifyContent: 'flex-start',
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginEntrada: {
    flex: 1,
    justifyContent: 'center',
    marginTop:40,
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
    color: Colors.white,
  },
  txt: {
    color: "#6bada0",
    borderRadius: 100,
    borderColor: "#6bada0",
    borderWidth: 1,
    width: 80,
    margin: 30,
    textAlign: "center",
  },
  txtTipo: {
    color: "#6bada0",
    textAlign: "center",
  },
  txtTipo2: {
    color: "#ffffff",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: 'center',
  },
  header: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
  },
  header2: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
  },
  entrar: {
    marginTop:5,
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "space-between",
    marginBottom: 20,
  },
  
  description: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: 600,
  },
  description2: {
    color: Colors.white,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  btns: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
});