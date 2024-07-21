import React from "react";
import { View, Button } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GeoLocationVerification() {
  const verifyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("location", location);
    // Implement geo-location verification logic
    const storedLocation = await AsyncStorage.getItem("location");
    if (storedLocation === null || storedLocation === undefined) {
      console.log("Storage location not found");
      alert("Please register your location");
      return;
    } else {
      console.log("storedLocation", storedLocation);
    }
    // Implement geo-location logic if the user's location is in the 10 meter radius of the stored location
    if (storedLocation) {
      const storedLocationData = JSON.parse(storedLocation);
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        storedLocationData.coords.latitude,
        storedLocationData.coords.longitude
      );
      if (distance < 10) {
        alert("Location verified");
        router.push("/home");
      } else {
        alert("Location not verified");
      }
    } else {
      alert("Please register your location");
    }
    router.push("/home");
  };
  /**
   * Calculates the distance between two points on the Earth.
   * Uses the Haversine formula to calculate the distance.
   * @param lat1 Latitude of the first point in degrees.
   * @param lon1 Longitude of the first point in degrees.
   * @param lat2 Latitude of the second point in degrees.
   * @param lon2 Longitude of the second point in degrees.
   * @returns The distance between the two points in meters.
   */
  function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  return (
    <View>
      <Button title="Login with Geo-Location" onPress={verifyLocation} />
    </View>
  );
}
