import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Title } from "react-native-paper";
import tmdb from "../api/tmdb";
import MovieDetails from "../components/MovieDetails";

const Secao = (props) => {
  const [movie, setMovie] = useState([]);

  async function searchTmdbMovie(id) {
    console.log(id);
    try {
      const response = await tmdb.get(`/movie/${id}`);
      return <MovieDetails type={response.data} />;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(movie);
  return (
    <View style={styles.container}>
      <View style={styles.borderTop} />
      <Title style={styles.secaoTitle}>{props.title}</Title>
      <FlatList
        horizontal
        style={styles.lista}
        data={props.list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              searchTmdbMovie(item.id);
            }}
          >
            <ImageBackground
              style={[
                styles.capa,
                { marginRight: 10, marginLeft: index === 0 ? 20 : 0 },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original${
                  item.overview ? item.poster_path : item.profile_path
                }`,
              }}
            >
              <Text style={styles.filmeTitle}>
                {item.overview ? item.title : item.name}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  secaoTitle: {
    marginLeft: 20,
    color: "white",
  },
  lista: {
    width: "100%",
    height: 180,
    marginTop: 10,
    marginBottom: 30,
  },
  capa: {
    width: 120,
    height: 180,
    borderRadius: 4,
    overflow: "hidden",
  },
  filmeTitle: {
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    alignSelf: "center",
    color: "white",
    backgroundColor: "black",
  },
  borderTop: {
    backgroundColor: "red",
    height: 3,
    width: 100,
    left: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Secao;
