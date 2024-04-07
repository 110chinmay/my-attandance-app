import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const Me = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [position, setPosition] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access the photo library');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  const handleUpload = () => {
    if (!name || !address || !technologies || !position) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    // Perform upload logic here
    Alert.alert('Success', 'Details uploaded successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Upload Details</Text>
        <Text style={styles.subtitle}>Please fill in your details</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={require('../../assets/no_image.png')} style={styles.profileImage} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          value={technologies}
          onChangeText={(text) => setTechnologies(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          value={position}
          onChangeText={(text) => setPosition(text)}
        />
        {userImage && <Image source={{ uri: userImage }} style={styles.image} />}
        <Button title="Upload" onPress={handleUpload} color="#81C784" />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
          <Button title="Take Photo" onPress={() => {}} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F7',
  },
  card: {
    width: '90%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    backgroundColor: '#FAFAFA',
    width: '90%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
});

export default Me;
