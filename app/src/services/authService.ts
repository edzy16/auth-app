import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

type RegisterUserProps = {
  username: string;
  password: string;
  email: string;
  location: any;
  setLocation: any;
  router: any;
};

export const registerUser = async ({
  username,
  password,
  email,
  location,
  setLocation,
  router,
}: RegisterUserProps) => {
  console.log("Registering user:", username, password, email, location);
  try {
    if (!location) {
      // alert("Please verify your location");
      await verifyLocation(setLocation);
      // return;
    }
    // Perform any necessary validation checks on the input values

    // Save the user data to async storage
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("email", email);

    return "Success";
  } catch (error) {
    console.error("Error registering user:", error);
    return "Error";
  }
};
export const verifyLocation = async (setLocation: any) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }

  let locationData = await Location.getCurrentPositionAsync({});
  await AsyncStorage.setItem("location", JSON.stringify(locationData));

  setLocation(locationData);
  alert("Location verified");
};

export const loginUser = async (username: string, password: string) => {
  try {
    // Perform any necessary validation checks on the input values

    // Retrieve the user data from async storage
    const storedUsername = await AsyncStorage.getItem("username");
    const storedPassword = await AsyncStorage.getItem("password");

    console.log("Stored user data:", storedUsername, storedPassword);

    if (username === storedUsername && password === storedPassword) {
      return "Success";
    } else {
      // alert("Invalid username or password");
      return "Error";
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
