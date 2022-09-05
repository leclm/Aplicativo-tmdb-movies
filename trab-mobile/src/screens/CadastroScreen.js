import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from '../api/firebaseConnection';

export default function CadastroScreen(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (value) => {
      navigation.navigate('Home', { user: value.user.email })
      //Navegando usuario para Home e levando o email do usuario para a tela home
    })
    .catch( (error) => {
        alert('Ops algo deu errado!');
        console.log(error);
        return;
    })

    setEmail('');
    setPassword('');
  }

  return(
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <Text style={styles.texto}>Email</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEmail(texto) }
      value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setPassword(texto) }
      secureTextEntry={true}
      value={password}
      />

      <Button
      title="Cadastrar"
      onPress={cadastrar}
      />

      <TouchableOpacity style={{marginTop: 25 }} onPress={ () => navigation.navigate('Login')}>
        <Text style={{textAlign: 'center' }}>Já tenho uma conta</Text>
      </TouchableOpacity>


    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin: 10,
    justifyContent: 'center'
  },
  title:{
    textAlign: 'center', 
    fontSize: 29, 
    fontWeight: 'bold'
  },
  texto: {
    fontSize: 20,
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});