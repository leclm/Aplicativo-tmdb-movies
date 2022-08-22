import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import carouselData from '../../assets/scripts/carouselData';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const InitialScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={carouselData}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <>
              <View style={styles.imgContainer}>
                <Image
                  source={require(`../../assets/images/` + item.source)}
                  title={item.title}
                  style={styles.images}
                />
                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </>
          }}>
        </FlatList>
        <View style={styles.dots}>
          <Feather name="circle" size={5} color="#96d5c9" />
          <Feather name="circle" size={5} color="#96d5c9" />
          <Feather name="circle" size={5} color="#96d5c9" />
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
    backgroundColor: '#fff'
  },
  imgContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150
  },
  images: {
    width: 150,
    height: 150
  },
  description: {
    width: 200,
    textAlign: 'center',
    color: '#20302d',
  },
  btnLogarCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  btnLogar: {
    backgroundColor: '#96d5c9',
    borderRadius: 5,
    height: 30,
    width: 180,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20302d',
    textAlign: 'center',
    marginTop: 0
  },
  dots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: 50
  }
});

export default InitialScreen;