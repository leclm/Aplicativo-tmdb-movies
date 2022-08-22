import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import carouselData from '../../assets/scripts/carouselData';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../assets/scripts/colors.js';

const { width } = Dimensions.get('screen');

const InitialScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.logo}>
          <Feather name="film" size={20} color={Colors.lightGreen} />
          <Text style={styles.logoText}>TMBD</Text>
        </View>

        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={carouselData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <>
              <View style={styles.imgContainer}>
                <Feather name={item.icon} size={50} color={Colors.lightGreen} />
                {/*
                 <Image
                  source={require(`../../assets/images/` + item.source)}
                  title={item.title}
                  style={styles.images}
                />
                */}
                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </>
          }}>
        </FlatList>
        <View style={styles.dots}>
          <Feather name="circle" size={5} color={Colors.lightGreen} />
          <Feather name="circle" size={5} color={Colors.lightGreen} />
          <Feather name="circle" size={5} color={Colors.lightGreen} />
        </View>
        <TouchableOpacity
          style={styles.btnLogarCtn}
          onPress={() => navigation.navigate("Home")}>
          <Text style={styles.btnLogar}>Logar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  logoText: {
    color: Colors.white,
    fontSize: 24,
    paddingLeft: 15
  },
  imgContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150
  },
  images: {
    width: 150,
    height: 150,
    borderRadius: 20
  },
  description: {
    width: 200,
    textAlign: 'center',
    color: Colors.white,
    paddingTop: 40
  },
  btnLogarCtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnLogar: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 20,
    height: 27,
    width: 150,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 50,
    marginBottom: 130
  }
});

export default InitialScreen;