import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import GoogleMap from '../components/GoogleMap';
import CurrentLocation from '../components/CurrentLocation';
import CameraComponent from '../components/CameraComponent';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import * as Burnt from "burnt";
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const backgroundImage = require("../../assets/login_image.jpg");

const RecordAttendance = () => {
  const apiUrl = process.env.EXPO_PUBLIC_SERVER_API;
  const empDetails = useSelector((state)=>state.auth.userDetails);
  const [isCameraClicked, setCameraClicked] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [completeAddress, setCompleteAddress] = useState(null);
  const [getLatLongDetails, setGetLanLongDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const handlePhotoCaptured = (uri) => {
    setPhotoUri(uri.uri);
    setCameraClicked(false);
  };

  const getAllMapDetails = (completeAddress, longLatDetails) => {
    setCompleteAddress(completeAddress);
    setGetLanLongDetails(longLatDetails);
  }

  const onDataSubmit = async () => {
    try {
      setLoader(true);
      if (!photoUri) {
      alert("please click photo");
      return;
    }
    if (completeAddress == false) {
      alert("please make sure your location is on!");
      return;
    } 
    const data = new FormData();
    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: photoUri,
    });
    // Append location data
    data.append('CompleteAddress', completeAddress);
    data.append('LatLongDetails', JSON.stringify(getLatLongDetails));
    data.append('TimeDate',moment().format("DD MM YYYY hh:mm:ss"));
    data.append('emp_id',empDetails.emp_id);
      const response = await axios.post(`${apiUrl}/api//add-employee-attendance`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoader(false);
      if(response.data){
          Burnt.toast({
                title: "Attendance submitted",
                message: "Attendance submitted",
              });
       navigation.navigate('Home')     
      }
     
      return response.data;
    } catch (error) {
      setLoader(false);
      Burnt.toast({
          title: "Attendance failed",
          message: `${error}`,
        });
      console.error('Upload failed', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
      {isCameraClicked == false ?
        <View style={styles.overlay}>
          <View style={styles.header}>
                        <Header />
                    </View>
          
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login for Attendance</Text>
          </View>
              <View style={styles.photoFrame}>
                {photoUri ? (
                  <ImageBackground source={{ uri: photoUri }} style={styles.photo} />
                ) : (
                  <>
                    <TouchableOpacity onPress={() => setCameraClicked(true)} style={styles.captureButton}>
                      <Text style={styles.captureButtonText}>Capture Photo</Text>
                    </TouchableOpacity>
                    <Text style={styles.photoPlaceholderText}>No Photo Captured</Text>
                  </>
                )}
              </View>
              <CurrentLocation />
              <GoogleMap handleMapDetails={getAllMapDetails} />
              <Text style={styles.locationText} numberOfLines={2} ellipsizeMode="tail">{completeAddress}</Text>


              <TouchableOpacity style={styles.submitButton} onPress={onDataSubmit}>
                {loader ? (
                  <ActivityIndicator
                    size="large"
                    animating={loader}
                  />
            ) :
                  <Text style={styles.submitButtonText}>Submit</Text> }
              </TouchableOpacity>
            </View>

          </View>
        </View>
        : null}
        
      {isCameraClicked && <CameraComponent onPhotoCaptured={handlePhotoCaptured} />}
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
    marginBottom:10,
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
    height: Dimensions.get("screen").height * 0.3,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  captureButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F76C6C',
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
  },
  photoPlaceholderText: {
    marginTop: 10,
    color: '#757575',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#5EAAA8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#5EAAA8',
  },
  locationText: {
    color: '#333333',
    fontSize: 16,
    marginTop: 10,
  },
});

export default RecordAttendance;
