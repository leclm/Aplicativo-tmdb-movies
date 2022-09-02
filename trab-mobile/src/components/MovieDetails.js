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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BtnFilter from "./BtnFilter";
import tmdb from "../api/tmdb";

import { Title, Button, Paragraph, Caption } from "react-native-paper";
import Secao from "./Secao";
import Slide from "./Slide";

const MovieDetails = ({ type }) => {
  const [movie, setMovie] = useState("");
  const [credits, setCredits] = useState([]);
  const [similiar, setSimiliar] = useState([]);
  useEffect(() => {
    content();
    getCredits();
    getSimiliar();
  }, [type.id]);

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
            <TouchableOpacity onPress={() => console.log("favoritou")}>
              <Feather name="star" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("curtiu")}>
              <Feather name="thumbs-up" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("não curtiu")}>
              <Feather name="thumbs-down" size={27} color="#a4d7c8" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  type: getType(item),
                })
              }
            >
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
