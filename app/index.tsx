import { Redirect } from "expo-router";
import "./globals.css";

export default function Index() {
  const isSignedIn = false;

  if (isSignedIn) {
    return <Redirect href={"/(tabs)/Home"} />;
  }

  return <Redirect href={"/(auth)/Signin"} />;
}
