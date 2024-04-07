import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Card from '../components/Card';
const backgroundImage = require('../../assets/login_image.jpg');


const Home = () => {
    const navigation = useNavigation();

    const handleClockIn = () => {
        navigation.navigate('RecordAttendance');
    };

    const handleBirthday = () => {
        navigation.navigate('BirthdayScreen');
    };

    const handleApplyLeave = () => {
        navigation.navigate('ApplyLeaveScreen');
    };

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
                    <View >
                        <ScrollView style={styles.cardContainer}>
                            <Card
                                title="Mark Attendance"
                                description="For daily attendance, login here"
                                showButton={true}
                                buttonTitle="Clock-in"
                                onButtonPress={handleClockIn}
                                backgroundColor="#c6def1"
                            />
                            <Card
                                title="Birthday"
                                description="Celebrate your birthday with us"
                                showButton={true}
                                buttonTitle="View Details"
                                onButtonPress={handleBirthday}
                                backgroundColor="#f2c6de"
                            />
                            <Card
                                title="Apply for Leave"
                                description="Request for leave here"
                                showButton={true}
                                buttonTitle="Apply Now"
                                onButtonPress={handleApplyLeave}
                                backgroundColor="#dbcdf0"
                            />
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cardContainer: {
        margin: 16,
        paddingBottom: 120
    },
    overlay: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
});

export default Home;
