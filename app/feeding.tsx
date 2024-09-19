
import { View, Text, TouchableOpacity} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react'
import {mapstyles } from '@/constants/Styles'
import Appbar from '@/components/Appbar';
import { listFeedingLocations } from '@/service/feedingLocationServices';
import * as Location from 'expo-location';

const FeedingScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);

      // Add user location to markersList
      setMarkers(prevMarkers => [
        ...prevMarkers,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          title: "Your Location",
          description: "This is where you are",
          isUser: true
        }
      ]);

      console.log(location);
    })();

    getFeedingLocations();
  }, []);

  interface Marker {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
    isUser: boolean;
  }

  const [markersList, setMarkers] = useState<Marker[]>([]);

  //TODO: implement feeding location services and API coonnection later.
  async function getFeedingLocations() {
    try {
      const response = await listFeedingLocations();
      setMarkers(response.data);
    } catch (error) {
      console.error("Error fetching feeding locations:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  //TODO: implement marker button press.
  const handleMarkerPress = (marker: Marker) => {
    if(selectedMarker === marker.title){
      setSelectedMarker(null);
    }else{
      setSelectedMarker(marker.title);
    }
  };

  interface MapProps {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  const mapProps: MapProps = {
    latitude: 38.318144870016255,
    longitude: 26.639504592535328,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={mapstyles.mainContainer}>
      <View style={mapstyles.contentContainer}>
        <View style={mapstyles.blackContainer}>
          <View style={mapstyles.mapContainer}>
            <MapView 
              style={mapstyles.map}
              initialRegion={mapProps}
              zoomEnabled={true}
              zoomControlEnabled={true}
            >
              {
                markersList.map((marker, index) => (
                  <Marker
                  key={index}
                  coordinate={{ 
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              ))
              }
            </MapView>
          </View>
          <View style={mapstyles.volunteerButtonsContainer}>
            <TouchableOpacity style={[mapstyles.volunteerButtonContainer, {backgroundColor: '#C6152C'}]}>
              <Text style={{color: 'white', fontSize: 12}}>NOT VOLUNTEER TODAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[mapstyles.volunteerButtonContainer, {backgroundColor: '#4D9F56'}]}>
              <Text style={{color: 'white', fontSize: 12}}>BE VOLUNTEER</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={mapstyles.locationButtonsContainer}>
            {markersList
              .filter(marker => !marker.isUser)
              .map((marker, index) => (
              <TouchableOpacity 
              key={index} 
              style={[
                mapstyles.locationButtonContainer,
                selectedMarker === marker.title && {backgroundColor: '#4D9F56'}
              ]}
              onPress={() => handleMarkerPress(marker)}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>{marker.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={mapstyles.feedingDoneButton}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>FEEDING DONE</Text>
          </TouchableOpacity>
      </View>
      <Appbar backButton={true}/>
    </View>
  )
}

export default FeedingScreen