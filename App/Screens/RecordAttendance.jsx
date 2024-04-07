import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import GoogleMap from '../components/GoogleMap';
import CurrentLocation from '../components/CurrentLocation';
import CameraComponent from '../components/CameraComponent';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
require('dotenv').config();


const RecordAttendance = () => {
  const empDetails = useSelector((state)=>state.auth.userDetails);
  const [isCameraClicked, setCameraClicked] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [completeAddress, setCompleteAddress] = useState(null);
  const [getLatLongDetails, setGetLanLongDetails] = useState({});

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
      const response = await axios.post(`${process.env.SERVER_API}/api//add-employee-attendance`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload failed', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isCameraClicked == false ?
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login for Attendance</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
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
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

          </View>
        </>
        : null}
      {isCameraClicked && <CameraComponent onPhotoCaptured={handlePhotoCaptured} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  titleContainer: {
    padding: 30,
    backgroundColor: '#5EAAA8',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: 20,
    backgroundColor: '#e4f4e3',
    padding: 20,
    marginTop:20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
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
