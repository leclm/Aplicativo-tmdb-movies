import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
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

  let starList;


  useEffect(() => {
    getItemsSave(emailUser,"star",categoryType);
  }, []);

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
      
      console.log("StarList ver o que tem....",starList)


      let listTmdb = starList.map(async function (queryc){
        try {
          console.log("queryc.id....",queryc.id)
          const response = await tmdb.get(`/${mediaType}/${queryc.id}`);
          return response.data;
        } catch (err) {
          console.log("erro response...",err);
        }

      })
      let listOjects = await Promise.all(listTmdb);

      console.log('PROMISES ALL RESOLVED: ', listOjects);
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
          <TouchableOpacity onPress={() => getItemsSave(emailUser,"star",categoryType)}>
            <BtnFilter value="Favoritos" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => getItemsSave(emailUser,"watch",categoryType)}>
            <BtnFilter value="Assistir mais tarde" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getItemsSave(emailUser,"like",categoryType)}>
            <BtnFilter value="Curtidos" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getItemsSave(emailUser,"dislike",categoryType)}>
            <BtnFilter value="Não curtidos" />
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
                  <TouchableOpacity onPress={() => console.log("favoritou")}>
                    <Feather name="star" size={22} color="#a4d7c8" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("curtiu")}>
                    <Feather name="thumbs-up" size={20} color="#a4d7c8" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("não curtiu")}>
                    <Feather name="thumbs-down" size={20} color="#a4d7c8" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.id,
                        type: getType(item),
                      })
                    }
                  >
                    <Feather name="plus-circle" size={20} color="#a4d7c8" />
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
