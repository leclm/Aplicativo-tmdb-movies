import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BtnFilter from "./BtnFilter";
import tmdb from "../api/tmdb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlerts } from "react-native-paper-alerts";

import { Title, Button, Paragraph, Caption } from "react-native-paper";
import Secao from "./Secao";
import Slide from "./Slide";

const MovieDetails = ({ type }) => {
  const [movie, setMovie] = useState("");
  const [credits, setCredits] = useState([]);
  const [similiar, setSimiliar] = useState([]);
  const alerts = useAlerts();
  let emailUser = "username@email.com";

  useEffect(() => {
    content();
    getCredits();
    getSimiliar();
  }, [type.id]);

  async function setItemSave(typeId, section) {
    try {
      //Data
      let user = emailUser;
      let itemId = typeId;
      let itemToAdd = { id: itemId };
      let itemToRemove = parseInt(itemId);
      let dataType = section;
      let keyUser = user + ":" + dataType;
      let starListObj = [{}];
      let result;
      let title;

      if (section == "star") {
        title = "favoritos";
      }
      if (section == "watch") {
        title = "assistir mais tarde";
      }
      if (section == "like") {
        title = "curtidos";
      }
      if (section == "dislike") {
        title = "não curtidos";
      }

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
        console.log("Novo item adicionado ao AsyncStorage: ", itemToAdd);
        alerts.alert("Adicionado em " + title + "!");
        //Alert.alert("Adicionado em " + title + "!");
      }
      //Add movie to AsyncStorage if there are no favorite movies list
      if (result === -2) {
        starListObj = [itemToAdd];
        console.log("Primeiro item adicionado ao AsyncStorage: ", itemToAdd);
        alerts.alert("Adicionado em " + title + "!");
        //Alert.alert("Adicionado em " + title + "!");
      }
      //Remove movie from AsyncStorage if can find the selected movie id among the favorite ones
      if (result >= 0) {
        const itemRemoved = starListObj.splice(
          starListObj.findIndex((x) => x.id === itemToRemove),
          1
        );
        console.log("Item removido do AsyncStorage: ", itemRemoved);
        alerts.alert("Removido de " + title + "!");
        //Alert.alert("Removido de " + title + "!");
      }

      //SetItem to update AsyncStorage with new movies
      let starSetNew = JSON.stringify(starListObj);
      await AsyncStorage.setItem(keyUser, starSetNew);

      //GetItem to get the movie list from AsyncStorage
      let starGetNew = await AsyncStorage.getItem(keyUser);
      let starListNew = JSON.parse(starGetNew);
      console.log("Lista nova do " + keyUser, starListNew);

      //Remove all Items from AsyncStorage from a keyUser
      //await AsyncStorage.removeItem(keyUser)
    } catch (e) {
      console.log("Ocorreu um erro: " + e);
    }
  }

  const content = async () => {
    try {
      const response = await tmdb.get(`/movie/${type.id}/videos`, {
        params: {},
      });
      setMovie(response.data.results[0].key);
    } catch (err) {
      console.log(err);
    }
  };

  const getCredits = async () => {
    try {
      const response = await tmdb.get(`/movie/${type.id}/credits`, {
        params: {},
      });
      setCredits(response.data.cast);
    } catch (err) {
      console.log(err);
    }
  };

  const getSimiliar = async () => {
    try {
      const response = await tmdb.get(`/movie/${type.id}/similar`, {
        params: {},
      });
      setSimiliar(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(similiar);

  return (
    <>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/original${type.poster_path}`,
          }}
          style={styles.capa}
        />
        <View style={styles.containerPadding}>
          <Title style={styles.tit}>{type.original_title}</Title>
          <Button
            style={styles.buttonPlay}
            icon="play"
            uppercase={false}
            mode="contained"
            color="#fff"
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${movie}`)
            }
          >
            Assistir trailer
          </Button>
          <Paragraph style={styles.tit}>{type.overview}</Paragraph>

          <Caption style={styles.captionInfos}>
            Idade:{" "}
            {type.adult == true ? (
              <Caption style={styles.captionWhite}>+18</Caption>
            ) : (
              <Caption style={styles.captionWhite}>Todas idades</Caption>
            )}
            {"      "}
            Data de estreia:{" "}
            <Caption style={styles.captionWhite}>{type.release_date}</Caption>
          </Caption>

          <Caption style={styles.captionInfos}>
            Popularidade:{" "}
            <Caption style={styles.captionWhite}>{type.popularity}</Caption>
            {"      "}
            N° de votos:{" "}
            <Caption style={styles.captionWhite}>{type.vote_count}</Caption>
            {"    "}
          </Caption>

          <View style={styles.btns}>
            <TouchableOpacity onPress={() => setItemSave(type.id, "star")}>
              <Feather name="star" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setItemSave(type.id, "like")}>
              <Feather name="thumbs-up" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setItemSave(type.id, "dislike")}>
              <Feather name="thumbs-down" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setItemSave(type.id, "watch")}>
              <Feather name="plus-circle" size={27} color="#a4d7c8" />
            </TouchableOpacity>
          </View>
          <Secao title={"Elenco"} list={credits} />
          <Secao title={"Filmes Relacionados"} list={similiar} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  capa: {
    height: 200,
    width: "100%",
  },
  containerPadding: {
    color: "white",
    padding: 20,
  },
  tit: {
    color: "white",
  },
  buttonPlay: {
    marginVertical: 20,
  },
  btns: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 38,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  // btns: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   paddingTop: 20,
  //   paddingBottom: 0,
  //   marginBottom: 0,
  // },
  captionInfos: {
    marginTop: 20,
    color: "white",
  },
  captionWhite: {
    color: "#fff",
  },
});

export default MovieDetails;
