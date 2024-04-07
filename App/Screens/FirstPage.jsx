import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const backgroundImage = require('../../assets/login_image.jpg');

const FirstPage = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.overlay} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>My Attendance</Text>
              <Text style={styles.subtitle}>For daily attendance</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={[styles.button, styles.loginButton]}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={[styles.button, styles.signUpButton]}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  title: {
    fontSize: 48,
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'orange',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  signUpButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default FirstPage;
