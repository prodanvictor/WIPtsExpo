import React from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { CustomMarker } from "../../components/CustomMarker";
import { LocationObject } from "expo-location";
import { getCurrentPosition, incrementDelta } from "../../helpers/MapHelper";
import { styles } from "./styles";

const Map: React.FC = () => {
  const [location, setLocation] = React.useState<LocationObject | null>(null);

  React.useEffect(() => {
    getCurrentPosition(setLocation);
  }, []);

  Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, timeInterval: 1000 },
    (loc) => setLocation(loc)
  );

  return (
    <View style={styles.container}>
      {location ? (
        <View style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            zoomEnabled={false}
            zoomTapEnabled={false}
            rotateEnabled={false}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: incrementDelta(location).LATITUDE_DELTA,
              longitudeDelta: incrementDelta(location).LONGITUDE_DELTA,
            }}
          ></MapView>
          <CustomMarker heading={location.coords.heading || 0} />
        </View>
      ) : (
        <Text>Coordinates are being collected...</Text>
      )}
    </View>
  );
};

export default Map;
