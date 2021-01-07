import { Dispatch, SetStateAction } from "react";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { Dimensions } from "react-native";

const screen = Dimensions.get("window");

const ASPECT_RATIO: number = screen.width / screen.height;
const LATITUDE_DELTA: number = 0.0022;
const LONGITUDE_DELTA: number = LATITUDE_DELTA * ASPECT_RATIO;
const metersPerSecond130Kph: number = 36.1111; //130kph

export const getCurrentPosition = async (
  setState: Dispatch<SetStateAction<LocationObject | null>>
) => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    return;
  }
  const locationResult: LocationObject = await Location.getCurrentPositionAsync(
    {}
  );
  setState(locationResult);
};

export const incrementDelta = (location: LocationObject) => {
  if (
    location &&
    location.coords.speed &&
    location.coords.speed > metersPerSecond130Kph
  ) {
    const LATITUDE_DELTA: number = 0.02;
    const LONGITUDE_DELTA: number = LATITUDE_DELTA * ASPECT_RATIO;
    return { LATITUDE_DELTA, LONGITUDE_DELTA };
  }
  return { LATITUDE_DELTA, LONGITUDE_DELTA };
};
