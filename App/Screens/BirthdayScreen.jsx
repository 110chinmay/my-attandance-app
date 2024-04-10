import { SafeAreaView, ImageBackground, View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Header from '../components/Header';
const backgroundImage = require("../../assets/login_image.jpg");
const dataDataFoundImg = require('../../assets/no_data_found_img.jpg');

const BirthdayScreen = () => {
 return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Header />
          </View>
          
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Birthday's</Text>
              </View>
              <ImageBackground
                source={dataDataFoundImg}
                resizeMode="cover"
                style={styles.photoFrame}
              ></ImageBackground>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: 20,
    backgroundColor:"#ffffff",
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  photoFrame: {
    width: Dimensions.get("screen").width * 0.8,
    height: Dimensions.get("screen").height * 0.6,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BirthdayScreen;
