import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

type RegisterUserProps = {
  username: string;
  password: string;
  email: string;
  location: any;
  setLocation: any;
};

export const registerUser = async ({
  username,
  password,
  email,
  location,
  setLocation,
}: RegisterUserProps) => {
  const router = useRouter();
  try {
    if (!location) {
      alert("Please verify your location");
      await verifyLocation(setLocation);
      return;
    }
    // Perform any necessary validation checks on the input values

    // Save the user data to async storage
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("location", JSON.stringify(location));

    // Redirect to the login screen
    router.push("/(auth)/index");
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
const verifyLocation = async (setLocation: any) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let locationData = await Location.getCurrentPositionAsync({});
  setLocation(locationData);
  alert("Location verified");
};

export const loginUser = async (username: string, password: string) => {
  const router = useRouter();
  try {
    // Perform any necessary validation checks on the input values

    // Retrieve the user data from async storage
    const storedUsername = await AsyncStorage.getItem("username");
    const storedPassword = await AsyncStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      // Redirect to the home screen
      router.push("/home");
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
