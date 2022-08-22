import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import BtnFilter from '../components/BtnFilter';
import tmdb from '../api/tmdb';

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchTmdbMovie("jones");
  }, [])

  function getType(item) {
    if ("original_title" in item) {
      return ('/movie/');
    } else if ("original_name" in item) {
      return ('/tv/');
    } else if ("name" in item) {
      return ('/person/');
    }
  }

  async function searchTmdbMovie(query) {
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResults(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function searchTmdbTV(query) {
    try {
      const response = await tmdb.get('/search/tv', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResults(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function searchTmdbPerson(query) {
    try {
      const response = await tmdb.get('/search/person', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResults(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <SearchBar onChangeText={(t) => setText(t)} onEndEditing={(t) => searchTmdbMovie(t)} value={text} />
      <View style={styles.filter}>
        <TouchableOpacity onPress={() => searchTmdbMovie(text)}>
          <BtnFilter value="Movies" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchTmdbTV(text)}>
          <BtnFilter value="TV" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchTmdbPerson(text)}>
          <BtnFilter value="People" />
        </TouchableOpacity>
      </View>
      <FlatList data={results} keyExtractor={item => `${item.id.toString}`} renderItem={({ item }) => {
        return (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", {
                id: item.id,
                type: getType(item)
              })}>
              <Image style={styles.poster}
                source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path || item.profile_path}` }} />
              <Text>{item.original_title || item.original_name || item.name}</Text>
            </TouchableOpacity>
            <View style={styles.btns}>
              <TouchableOpacity onPress={() => console.log("favoritou")}>
                <Feather name="star" size={22} color="#96d5c9" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("curtiu")}>
                <Feather name="thumbs-up" size={20} color="#96d5c9" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("não curtiu")}>
                <Feather name="thumbs-down" size={20} color="#96d5c9" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", {
                  id: item.id,
                  type: getType(item)
                })}>
                <Feather name="plus-circle" size={20} color="#96d5c9" />
              </TouchableOpacity>
            </View>
          </View>
        )
      }} />
    </>
  )
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'space-between'
  },
  card: {
    alignSelf: 'center',
    alignContent: 'space-between',
    margin: 30,
    width: 350,
    height: 200,
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    boxShadow: "0 0 1em black",
  },
  poster: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    alignContent: 'space-between'
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
  }
});

export default HomeScreen;