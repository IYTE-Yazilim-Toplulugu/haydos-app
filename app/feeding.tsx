import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { mapstyles } from '@/constants/Styles'
import Appbar from '@/components/Appbar';
import { listFeedingLocations } from '@/service/feedingLocationServices';
import {volunteerRequest, isVolunteered ,VolunteerRequestint, isVolunteeredint, feedingDoneRequestint, feedingDoneRequest} from "@/service/volunteerServices"
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

const symbols = [
  require("../assets/images/GreenFeedingMarker.png"),
  require("../assets/images/RedFeedingMarker.png"),
];

const FeedingScreen = () => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const watchPositionSubscription = useRef<Location.LocationSubscription | null>(null);
  const [markersList, setMarkers] = useState<MarkerInfo[]>([]);
  const [userMarker, setUserMarker] = useState<MarkerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tracksViewChangesValue, setTracksViewChanges] = useState<boolean>(true);
  const [Volunteered, setVolunteered] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        await getFeedingLocations();
        await getUserLocation();
        await getUserVolunteerStatus();
      } catch (error) {
        console.error("Error initializing screen:", error);
      } finally {
        console.log("in finally")
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      setTracksViewChanges(false);
    }, 3000); 
    initializeScreen();

    return () => {
      if (watchPositionSubscription.current) {
        watchPositionSubscription.current.remove(); 
        watchPositionSubscription.current = null; 
      }
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    console.log("Volunteered state changed:", Volunteered);
  }, [Volunteered]); //for debuging

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
  const getUserVolunteerStatus = async () => {
    console.log("in getUserVolunteerStatus")
    const message: isVolunteeredint = {
      timestamp: new Date().toISOString(),
      username: "YourUsername",
    };
    try {
      const response = await isVolunteered(message);
      console.log("Feeding locations fetched:", response.data.location);
      if(response.data.location.trim()){
        setVolunteered(true);
        setSelectedMarker(response.data.location);
      }
    } catch (error) {
      console.error("Error fetching feeding locations:", error);
    }
  }
  
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
    if(!connecting){
      if (selectedMarker === marker.title && !Volunteered) {
        setSelectedMarker(null);
      } else {
          if (!Volunteered){
            console.log("in the volunteered check line:120");
            if(marker.title == "Your Location"){
              console.log("user marker can't be sellected for volunteering");
            } else{
              setSelectedMarker(marker.title);
            }
          }
          mapRef.current?.animateToRegion({
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
          }, 1000);
      } 
    } else{
      console.log("Why am I working.")}
  }, [selectedMarker, Volunteered, connecting]);

  const handleVolunteer = async () => {
    if (selectedMarker && !Volunteered) {
      const volunteerData: VolunteerRequestint = {
            timestamp: new Date().toISOString(),
            username: "YourUsername",
            location: selectedMarker,
            volunteer: true,
        };
        try {
            setConnecting(true);
            const response = await volunteerRequest(volunteerData);
            console.log("Volunteer request response:", response);
            if (response.status == "accepted"){
              setVolunteered(true);
            }
        } catch (error) {
            console.error("Error sending volunteer request:", error);
        } finally {
          setConnecting(false)}
    } else {
        if (!selectedMarker) {
            console.log("A marker isn't selected"); // for debug
        }
        if (Volunteered) {
            console.log("Already volunteered");}
        console.log(Volunteered); // for debug
    }
  }
  const handleNotVolunteer = async() => {
    if (selectedMarker && Volunteered) {
      const volunteerData: VolunteerRequestint = {
            timestamp: new Date().toISOString(),
            username: "YourUsername", 
            location: selectedMarker, 
            volunteer: false, 
        };
        try {
            setConnecting(true); 
            const response = await volunteerRequest(volunteerData);
            console.log("Not volunteer request response:", response);
            if (response.status == "accepted"){
              setVolunteered(false);
            }
        } catch (error) {
            console.error("Error sending not volunteer request:", error);
        } finally {
          setConnecting(false); 
        }

      setVolunteered(false);
      console.log("sended newvolunteer request. Not volunteered")
    } else {
      if(!selectedMarker){
        console.log("a marker isn't sellected"); //for debug
      }
      console.log(Volunteered);//for debug
    }
  }

  const handlefeedingDone = async() => {
    if(Volunteered){
      const feedingData: feedingDoneRequestint ={
        timestamp: new Date().toISOString(),
        username: "YourUsername",
      }
      try{
        setConnecting(true)
        const response = await feedingDoneRequest(feedingData);
        if(response.status){
          setVolunteered(false);
          setSelectedMarker(null);
        }
      } catch (error) {
        console.error("Error sending not volunteer request:", error);
      } finally {
          setConnecting(false); 
        }
    }
  }

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
            source={isSelected ? symbols[0] : symbols[1]}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain'
            }}
          />
        )}
      </Marker>
    );
  }, [selectedMarker, tracksViewChangesValue, handleMarkerPress]);

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
            <TouchableOpacity 
              style={[mapstyles.volunteerButtonContainer, { backgroundColor: Volunteered ? '#4D9F56' : '#C6152C' }]} 
              onPress={handleNotVolunteer}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>NOT VOLUNTEER TODAY</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[mapstyles.volunteerButtonContainer, { backgroundColor: Volunteered ? '#C6152C' : '#4D9F56' }]} 
              onPress={handleVolunteer}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>BE VOLUNTEER</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={mapstyles.locationButtonsContainer}>
          {markersList
            .filter(marker => !marker.isUser)
            .map((marker, index) => (
              <TouchableOpacity 
                key={index} 
                style={[mapstyles.locationButtonContainer, selectedMarker === marker.title && { backgroundColor: '#4D9F56' }]}
                onPress={() => handleMarkerPress(marker)}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>{marker.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={mapstyles.feedingDoneButton} onPress={handlefeedingDone}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>FEEDING DONE</Text>
          </TouchableOpacity>
      </View>
      <Appbar backButton={true}/>
    </View>
  )
}

export default FeedingScreen