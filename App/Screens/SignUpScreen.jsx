import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const backgroundImage = require('../../assets/login_image.jpg');
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [userToken, setUserToken] = useState('');

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!firstName) {
            isValid = false;
            errors.firstName = 'First name is required';
        }
        if (!lastName) {
            isValid = false;
            errors.lastName = 'Last name is required';
        }
        if (!phoneNumber) {
            isValid = false;
            errors.phoneNumber = 'Phone number is required';
        }
        if (!email) {
            isValid = false;
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors.email = 'Email address is invalid';
        }
        if (!organization) {
            isValid = false;
            errors.organization = 'Organization is required';
        }
        if (!password) {
            isValid = false;
            errors.organization = 'Organization is required';
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            axios.post(`http://192.168.1.4:3001/api/employee-details`, {
                firstname: firstName,
                lastname: lastName,
                phone_number: phoneNumber,
                email,
                organization,
                password
            })
                .then(function (response) {
                    console.log("Response",response.data);
                })
                .catch(function (error) {
                    console.log("error",error.data);
                });
        };
    };

    const onLoadLogin = () => {
      navigation.navigate('LoginScreen');
}

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                    <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                            <Text style={styles.title}>SignUp</Text>
                            <Text style={{margin:5}}></Text>
                            <TouchableOpacity style={styles.buttonContainer} onPress={onLoadLogin}>
                            <Text style={styles.title}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholder="First Name"
                        placeholderTextColor="#999"
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                    <TextInput
                        style={styles.input}
                        onChangeText={setLastName}
                        value={lastName}
                        placeholder="Last Name"
                        placeholderTextColor="#999"
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <TextInput
                        style={styles.input}
                        onChangeText={setOrganization}
                        value={organization}
                        placeholder="Organization"
                        placeholderTextColor="#999"
                    />
                    {errors.organization && <Text style={styles.errorText}>{errors.organization}</Text>}

                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#999"
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form: {
        width: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 10,
        // marginTop: 20,
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
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default SignUpScreen;
