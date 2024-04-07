import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeamCard from '../components/TeamCard';

const MyTeam = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([
    { id: '1', name: 'John Doe', position: 'Software Engineer', phoneNumber: '123-456-7890', image: require('../../assets/no_image.png') },
    { id: '2', name: 'Jane Doe', position: 'Product Manager', phoneNumber: '987-654-3210', image: require('../../assets/no_image.png') },
    { id: '3', name: 'Alice Smith', position: 'Designer', phoneNumber: '456-789-0123', image: require('../../assets/no_image.png') },
    // Add more dummy members here
  ]);

  const renderMemberCard = ({ item }) => (
    <TeamCard member={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Team</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search members..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={members.filter(member =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderMemberCard}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default MyTeam;
