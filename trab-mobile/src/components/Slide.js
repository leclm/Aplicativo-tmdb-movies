import React, { Component } from "react";
import { Text, View, Image, Dimensions } from "react-native";

import Swiper from "react-native-swiper/src";

const { width } = Dimensions.get("window");

const Slider = (props) => (
  <View style={styles.lista}>
    <Image style={styles.capa} source={props.uri} />
  </View>
);

const styles = {
  //   container: {
  //     width: "100%",
  //     height: 180,
  //     // flex: 1,
  //     // justifyContent: "center",
  //   },
  //   image: {
  //     width: "100%",
  //     height: 180,
  //   },

  container: {
    width: "100%",
  },
  secaoTitle: {
    marginLeft: 20,
    color: "white",
  },
  lista: {
    width: "100%",
    height: 300,
    marginTop: 10,
    marginBottom: 30,
  },
  capa: {
    width: "100%",
    height: 300,
    borderRadius: 4,
    padding: 5,
    overflow: "hidden",
  },
};

const Slide = ({ value }) => {
  const imagesSlider = [1, 3, 4, 5];
  return (
    <View style={styles.container}>
      <Swiper autoplay height={200}>
        {imagesSlider.map((item, i) => (
          <Slider uri={"https://i.imgur.com/EJyDFeY.jpg"} key={i} />
        ))}
      </Swiper>
    </View>
  );
};

export default Slide;
