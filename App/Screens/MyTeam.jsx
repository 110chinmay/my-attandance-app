import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import TeamCard from '../components/TeamCard';
const backgroundImage = require('../../assets/login_image.jpg');

const MyTeam = () => {
    const navigation = useNavigation();
const teamMembers = [
    { id: 1, name: 'John Doe', position: 'Developer', phoneNumber: '123-456-7890', imageUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jane Smith', position: 'Designer', phoneNumber: '987-654-3210', imageUrl: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Alice Johnson', position: 'Manager', phoneNumber: '555-555-5555', imageUrl: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Bob Brown', position: 'Engineer', phoneNumber: '444-444-4444', imageUrl: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Eve Williams', position: 'Analyst', phoneNumber: '333-333-3333', imageUrl: 'https://i.pravatar.cc/150?u=5' },
];



    const renderTeamMember = ({ item }) => (
        <TeamCard member={item} />
    );

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
                </View>
                <View style={styles.teamDetails}>
                    <FlatList
                        data={teamMembers}
                        renderItem={renderTeamMember}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.teamList}
                    />
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    teamDetails: {
        flex: 1,
        paddingTop: 100,
    },
    teamList: {
        padding: 16,
    },
});

export default MyTeam;
