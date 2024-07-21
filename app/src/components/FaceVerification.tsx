import React from "react";
import { View, Button } from "react-native";
import { router } from "expo-router";

export default function FaceVerification() {
  const handleFaceVerification = () => {
    // Perform face verification
    alert("This feature is not yet implemented");
  };
  return (
    <View>
      <Button
        title="Login with Face Verification"
        onPress={handleFaceVerification}
      />
    </View>
  );
}
