import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraComponent({ onPhotoCaptured }) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  let camera = Camera;

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.front ? CameraType.back : CameraType.front));
  }

  const clickPicture = async () => {
    if (!camera && !permission.granted && !permission) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    onPhotoCaptured(photo);
    camera = false;
  }

  return (
    <View style={styles.container}>
      <Camera ref={(r) => { camera = r; }} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.reverseButton} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={clickPicture} style={styles.captureButton} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  permissionText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  reverseButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 10,
  },
});
