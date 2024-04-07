import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';

export default function GoogleMap({handleMapDetails}) {
  const { latitude, longitude } = useSelector((state) => state.location);
  const [loading, setLoading] = useState(true);


  const fetchAddress = async (lat, lng) => {
    try {
      const AddressDetails = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      const address = AddressDetails[0].formattedAddress;
      handleMapDetails(address,{ latitude: lat, longitude: lng });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined && latitude !== null) {
      setLoading(false);
      fetchAddress(latitude, longitude);
    }
  }, [latitude, longitude]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={{alignItems:"center"}}>
      <MapView
        zoomEnabled={true}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        <Marker
          title="CHINDHA, Inc."
          description="Web Design and Development"
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    width: Dimensions.get('screen').width * 0.85,
    height: Dimensions.get('screen').height * 0.2,
  },
  address: {
    margin: 10,
    textAlign: 'center',
    fontSize: 10
  }
});
