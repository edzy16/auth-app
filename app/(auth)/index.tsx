import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import FaceVerification from "../src/components/FaceVerification";
import GeoLocationVerification from "../src/components/GeoLocation";
import { loginUser } from "../src/services/authService";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement username/password login logic
    loginUser(username, password);
    // router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login with Username/Password" onPress={handleLogin} />
      <FaceVerification />
      <GeoLocationVerification />
      <Button
        title="Go to Register"
        onPress={() => router.push("/(auth)/register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
