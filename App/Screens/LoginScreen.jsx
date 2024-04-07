import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, SafeAreaView } from 'react-native';
import 'react-native-get-random-values'
import { stringify, v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login, userDetails } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';


const backgroundImage = require('../../assets/login_image.jpg');

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch  = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!email) {
            isValid = false;
            errors.email = 'Email is required';
        }
        if (!password) {
            isValid = false;
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return isValid;
    }

    const handleLogin = async () => {
    if (validateForm()) {
        try {
            const response = await axios.post(`http://192.168.1.4:3001/api//login`, {
                email,
                password
            });
           if (response.status === 200) {
                    const token = uuidv4();
                    const stringifyToken = JSON.stringify(token);
                    const userData = JSON.stringify(response.data);
                    await AsyncStorage.multiSet([['userToken', stringifyToken], ['userData', userData]]);
                    dispatch(login(token));
                    dispatch(userDetails(response.data));
            } else {
                // Handle other status codes
                console.log('Failed to login',response);
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log('Login button pressed');
};

const onLoadSignUp = () => {
      navigation.navigate('SignUpScreen');
}

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ImageBackground
                    source={backgroundImage}
                    resizeMode="cover"
                    style={styles.backgroundImage}
                >
                    <View style={styles.overlay} />
                    <View style={styles.container}>
                        <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                            <Text style={styles.title}>Login</Text>
                            <Text style={{margin:5}}></Text>
                            <TouchableOpacity style={styles.buttonContainer} onPress={onLoadSignUp}>
                            <Text style={styles.title}>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#ffffff"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#ffffff"
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',

    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonContainer: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
