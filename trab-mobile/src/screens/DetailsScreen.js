import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ route }) => {
  const [type, setType] = useState({});

  useEffect(() => {
    getContent(route.params.id, route.params.type);
  }, []);

  async function getContent(id, type) {
    try {
      const response = await tmdb.get(`${type}${id}`, {
        params: {
        }
      })
      setType(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
   
  if ( route.params.type == "/movie/" ) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{type.original_title} | ID {type.id}</Text>
        
        <Text style={styles.overview}>
          <Text style={styles.txtBold}>
            Overview: 
          </Text>
          {type.overview}
        </Text>
        
        <Text>
          <Text style={styles.txtBold}>
            Vote Average: 
          </Text>
          {type.vote_average}
        </Text>

        <Text>
          <Text style={styles.txtBold}>
            Release Date: 
          </Text>
          {type.release_date}
        </Text>
      </View>
    )
  } else if ( route.params.type == "/tv/") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{type.original_name} | ID {type.id} | Popularity: {type.popularity}</Text>

        <Text style={styles.overview}>
          <Text style={styles.txtBold}>
            Overview: 
          </Text>
          {type.overview}
        </Text>
        
        <Text>
          <Text style={styles.txtBold}>
            First Air Date:  
          </Text>
          {type.first_air_date}
        </Text>

        <Text>
          <Text style={styles.txtBold}>
            Last Air Date: 
          </Text>
          {type.last_air_date}
        </Text>

        <Text>
          <Text style={styles.txtBold}>
            Number of Episodes: 
          </Text>
          {type.number_of_episodes}
        </Text>

        <Text>
          <Text style={styles.txtBold}>
            Number of Seasons: 
          </Text>
          {type.number_of_seasons}
        </Text>
      </View>
    )
  } else if ( route.params.type == "/person/") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{type.name} | ID {type.id}</Text>

        <Text>
          <Text style={styles.txtBold}>
            Birthday: 
          </Text>
          {type.birthday}
        </Text>

        <Text>
          <Text style={styles.txtBold}>
            Place of Birth: 
          </Text>
          {type.place_of_birth}
        </Text>

        <Text style={styles.overview}>
          <Text style={styles.txtBold}>
            Biography: 
          </Text>
          {type.biography}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  overview: {
    fontSize: 18,
    paddingBottom: 10,
  },
  txtBold: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingRight: 5,
  }
});

export default DetailsScreen;
