import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';
import { mapstyles } from '@/constants/Styles'
import Appbar from '@/components/Appbar';
import { listFeedingLocations } from '@/service/feedingLocationServices';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

interface MarkerInfo {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  isUser: boolean;
}

const FeedingScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const watchPositionSubscription = useRef<Location.LocationSubscription | null>(null);
  const [markersList, setMarkers] = useState<MarkerInfo[]>([]);
  const [userMarker, setUserMarker] = useState<MarkerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tracksViewChangesValue, setTracksViewChanges] = useState<boolean>(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        await getFeedingLocations();
        await getUserLocation();
      } catch (error) {
        console.error("Error initializing screen:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      setTracksViewChanges(false);
    }, 3000); 
    initializeScreen();

    return () => {
      if (watchPositionSubscription.current) {
        watchPositionSubscription.current.remove(); // Ensure this is called
        watchPositionSubscription.current = null; // Clear the reference
      }
      clearTimeout(timer);
    };
  }, []);

  const getFeedingLocations = async () => {
    try {
      const response = await listFeedingLocations();
      setMarkers(response.data);
      console.log("Feeding locations fetched:", response.data);
    } catch (error) {
      console.error("Error fetching feeding locations:", error);
    }
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    if (watchPositionSubscription.current) {
      console.log("Already watching location");
      return; 
    }
    watchPositionSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval:10000, // Update if 10seconds pass
        distanceInterval: 5, // Update if moved 2 meters
      },
      (newLocation) => {
        updateUserLocation(newLocation);
      }
    );
  };

  const updateUserLocation = (location: Location.LocationObject) => {
    console.log("updated location", location)
    setUserMarker({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      title: "Your Location",
      description: "This is where you are",
      isUser: true,
    });
  };

  const handleMarkerPress = useCallback((marker: MarkerInfo) => {
    if (selectedMarker === marker.title) {
        setSelectedMarker(null);
    } else {
        setSelectedMarker(marker.title);
        mapRef.current?.animateToRegion({
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 1000);

    }
}, [selectedMarker]);


  const renderMarker = useCallback((marker: MarkerInfo) => {
    const isSelected = marker.title === selectedMarker;

    return (
      <Marker
        key={`${marker.latitude}-${marker.longitude}`}
        title= {marker.title}
        description={marker.description}        
        coordinate={{ 
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onPress={() => {handleMarkerPress(marker)}}
        tracksViewChanges={tracksViewChangesValue || isSelected || marker.isUser}
      >
        {marker.isUser ? (
          <MaterialCommunityIcons 
            name="map-marker-account" 
            size={32} 
            color="#4e8a54" 
          />
        ) : (
          <Image
            source={
              isSelected
                ? require("../assets/images/GreenFeedingMarker.png")
                : require("../assets/images/RedFeedingMarker.png")
            }
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain'
            }}
          />
        )}
      </Marker>
      )
    },[selectedMarker, tracksViewChangesValue, handleMarkerPress]);


  if (isLoading) {
    return (
      <View style={[mapstyles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map and locations...</Text>
      </View>
    );
  }

  return (
    <View style={mapstyles.mainContainer}>
      <View style={mapstyles.contentContainer}>
        <View style={mapstyles.blackContainer}>
          <View style={mapstyles.mapContainer}>
            <MapView 
              ref={mapRef}
              style={mapstyles.map}
              initialRegion={mapProps}
              zoomEnabled={true}
              zoomControlEnabled={true}
            >
              {markersList.map(renderMarker)}
              {userMarker && renderMarker(userMarker)}
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