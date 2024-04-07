import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
        const navigation = useNavigation();
    const handleLogout = async () => {
    try {
        console.log("Called");
        await AsyncStorage.removeItem('userToken');
        dispatch(logout());

    } catch (error) {
        console.error('Failed to logout:', error);
    }
};


    return (
        <View style={styles.container}>
            <Image source={require("../../assets/no_image.png")} style={styles.logo} />
            <TextInput style={styles.input} placeholder='Search' placeholderTextColor="#999" />
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;
