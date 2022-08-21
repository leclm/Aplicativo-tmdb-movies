import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import carouselData from '../../assets/scripts/carouselData';

const { width } = Dimensions.get('screen');

const InitialScreen = ({ navigation }) => {
  return (
    <>
      <View style={ styles.container }>
        <StatusBar hidden />
        <FlatList 
          horizontal
          pagingEnabled
          data={ carouselData }
          onScroll={ Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX }}}],
            { useNativeDriver: true }
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return <>
                <View style={ styles.imgContainer }>
                  <Image
                    source={require(`../../assets/images/` + item.source)}
                    title={item.title}
                    style={ styles.images }
                  />
                  <Text style={styles.description}>
                    {item.description}
                  </Text>
                </View>
              </>
          }}>
        </FlatList>
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
    paddingTop: 100
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
    flex:1   
  },
  btnLogar: {
    backgroundColor: '#97d5c9',
    borderRadius: 5,
    height: 30,
    width: 180,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20302d',
    textAlign: 'center',
    marginTop: 0
  }
});

export default InitialScreen;