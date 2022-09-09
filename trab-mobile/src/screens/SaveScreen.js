import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../assets/scripts/colors.js";
import BtnFilter from "../components/BtnFilter";
import tmdb from "../api/tmdb";
import Slide from "../components/Slide.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState([]);
  let emailUser = "username@email.com";
  let categoryType = "movie";
  const count = "star";
  let starList;

  useEffect(() => {
    getItemsSave(emailUser,count,categoryType);
  }, []);


  async function save(typeId, section) {
    try {

      //Data
      let user = "username@email.com";
      let itemId = typeId;
      let itemToAdd = { id: itemId };
      let itemToRemove = parseInt(itemId);
      let dataType = section;
      let keyUser = user + ":" + dataType;
      let starListObj = [{}];
      let result;
      let title;

      if(section=='star'){title='favoritos'}
      if(section=='watch'){title='assistir mais tarde'}
      if(section=='like'){title='curtidos'}
      if(section=='dislike'){title='não curtidos'}

      //GetItem from AsyncStorage to get favorite movies
      let starGet = await AsyncStorage.getItem(keyUser);

      //Verify if AsyncStorage return null or if there are favorite movies
      if (starGet === null) {
        result = -2;
      } else {
        //If there are favorite movies, try to find the id of the movie clicked among them
        starListObj = JSON.parse(starGet);
        result = starListObj.findIndex((x) => x.id === itemId);
        console.log("Encontrou o filme clicado no AsyncStorage? ", result);
      }

      //Add movie to AsyncStorage if it can't find the selected movie id among the favorite ones
      if (result === -1) {
        starListObj.splice(0, 0, itemToAdd);
        console.log("Novo item adicionado ao AsyncStorage: ",itemToAdd);
        Alert.alert("Adicionado em "+title+"!");
      }
      //Add movie to AsyncStorage if there are no favorite movies list
      if (result === -2) {
        starListObj = [itemToAdd];
        console.log("Primeiro item adicionado ao AsyncStorage: ",itemToAdd);
        Alert.alert("Adicionado em "+title+"!");
      }
      //Remove movie from AsyncStorage if can find the selected movie id among the favorite ones
      if(result >= 0) {
        const itemRemoved = starListObj.splice(starListObj.findIndex((x) => x.id === itemToRemove),1);
        console.log("Item removido do AsyncStorage: ",itemRemoved);
        Alert.alert("Removido de "+title+"!");
      }

      //SetItem to update AsyncStorage with new movies
      let starSetNew = JSON.stringify(starListObj);
      await AsyncStorage.setItem(keyUser, starSetNew);

      //GetItem to get the movie list from AsyncStorage
      let starGetNew = await AsyncStorage.getItem(keyUser);
      let starListNew = JSON.parse(starGetNew);
      console.log("Lista nova do "+keyUser,starListNew);

      //Remove all Items from AsyncStorage from a keyUser
      //await AsyncStorage.removeItem(keyUser)

    } catch (e) {
      console.log("Ocorreu um erro: " + e);
    }
  }

  async function getItemsSave(email, section, category){
    try {
      //Data
      //console.log("parametro="+params)
      let user = email;
      let dataType = section;
      let keyValue = user + ":" + dataType;
      let mediaType = category;

      //GetItem - object
      try{
        let starGet = await AsyncStorage.getItem(keyValue);
      starList = JSON.parse(starGet);
      
      }catch(err){console.log("EERRROOOO.....",err)}
      
      let listTmdb = starList.map(async function (queryc){
        try {
          const response = await tmdb.get(`/${mediaType}/${queryc.id}`);
          return response.data;
        } catch (err) {
          console.log("erro response...",err);
        }

      })
      let listOjects = await Promise.all(listTmdb);
      setSaved(listOjects)

    } catch (e) {
      console.log("Ocorreu um erro: " + e);
      let listObjectsEmpty = null;
      setSaved(listObjectsEmpty)
    }
  };

  function getType(item) {
    if ("original_title" in item) {
      return "/movie/";
    } else if ("original_name" in item) {
      return "/tv/";
    } else if ("name" in item) {
      return "/person/";
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity style={styles.btnFav} onPress={() => getItemsSave(emailUser,"star",categoryType)}>
            <BtnFilter value="Favoritos" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFav} onPress={() => getItemsSave(emailUser,"watch",categoryType)}>
            <BtnFilter value="Pretendo ver" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnFav} onPress={() => getItemsSave(emailUser,"dislike",categoryType)}>
            <BtnFilter value="Não curtidos" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFav} onPress={() => getItemsSave(emailUser,"like",categoryType)}>
            <BtnFilter value="Curtidos" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={saved}
          keyExtractor={(item) => `${item.id.toString}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Details", {
                      id: item.id,
                      type: getType(item),
                    })
                  }
                >
                  <Image
                    style={styles.posterImg}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original${
                        item.poster_path || item.profile_path
                      }`,
                    }}
                  />
                  <Text style={styles.description}>
                    {item.original_title || item.original_name || item.name}
                  </Text>
                </TouchableOpacity>
                <View style={styles.btns}>
                <TouchableOpacity onPress={() => save(item.id, "star")}>
              <Feather name="star" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => save(item.id, "like")}>
              <Feather name="thumbs-up" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => save(item.id, "dislike")}>
              <Feather name="thumbs-down" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => save(item.id, "watch")}>
              <Feather name="plus-circle" size={27} color="#a4d7c8" />
            </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
  },
  filter: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "space-between",
  },
  btnFav:{
    padding:0,
    margin:0,
  },
  card: {
    alignSelf: "center",
    alignContent: "space-between",
    margin: 30,
    width: 350,
    height: 200,
    padding: 10,
    textAlign: "center",
    borderRadius: 20,
    boxShadow: "0 0 1em black",
    backgroundColor: Colors.lightGray,
  },
  posterImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    alignContent: "space-between",
  },
  description: {
    color: Colors.white,
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

export default SaveScreen;
