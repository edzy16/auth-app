import React from "react";
import { View, Button } from "react-native";
import { router } from "expo-router";

export default function FaceVerification() {
  return (
    <View>
      <Button
        title="Login with Face Verification"
        onPress={() => router.push("/home")}
      />
    </View>
  );
}
