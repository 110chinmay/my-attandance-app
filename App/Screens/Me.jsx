import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
const backgroundImage = require('../../assets/login_image.jpg');

const Me = () => {
    const empDetails = useSelector((state)=>state.auth.userDetails);
    const [name, setName] = useState(empDetails.firstname);
    const [email, setEmail] = useState(empDetails.email);
    const [phoneNumber, setPhoneNumber] = useState('1234567');
    const [organization, setOrganization] = useState(empDetails.organization);
    const [imageUri, setImageUri] = useState('');

    const handleSave = () => {
        
    };

    const handleEditImage= () =>{
       
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <Header />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Profile</Text>
                        <TouchableOpacity onPress={handleEditImage}>
                            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="organization"
                            value={organization}
                            onChangeText={setOrganization}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flex: 1,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    overlay: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        organization: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    formContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#ffffff",
        margin:20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Me;
