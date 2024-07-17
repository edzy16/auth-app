import React from "react";
import { View, Button } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function GeoLocationVerification() {
  const verifyLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // Implement geo-location verification logic
    router.push("/home");
  };

  return (
    <View>
      <Button title="Login with Geo-Location" onPress={verifyLocation} />
    </View>
  );
}
