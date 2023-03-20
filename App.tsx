import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => console.log("Token: ", token));
  }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Home />
    </>
  );
}
