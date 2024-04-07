import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TeamCard = ({ member }) => {
  return (
    <View style={styles.card}>
      <Image source={member.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.position}>{member.position}</Text>
        <Text style={styles.phoneNumber}>{member.phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  position: {
    color: '#666666',
  },
  phoneNumber: {
    color: '#666666',
  },
});

export default TeamCard;
