import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Dividor from "@/components/Dividor";
import AuthHeader from "@/features/Auth/Components/AuthHeader";
import {
  signInSchema,
  signInSchemaType,
} from "@/features/Auth/schemas/auth-schema";
import useIsKeyboardVisible from "@/hooks/utils/useIsKeyboardVisible";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const Signin = () => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const { isKeyboardVisible } = useIsKeyboardVisible();
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const handleSubmitForm = async (data: signInSchemaType) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: data.emailOrUsername,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/Home");
      } else {
        Toast.show({
          type: "error",
          text1: "Sign In Failed",
          text2: "Unable to complete sign in. Please try again.",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
        });
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error signing in: ", error);
      Toast.show({
        type: "error",
        text1: "Sign In Failed",
        text2: error?.message || "Please check your credentials and try again.",
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#4A90E2"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <LinearGradient
      colors={["#1A1A1A", "#F5F5F5", "#7c818a"]}
      start={{ x: 0, y: 1.1 }}
      end={{ x: 0, y: 0 }}
      style={styles.flexContainer}
    >
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.flexContainer}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          scrollEnabled={isKeyboardVisible}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <SafeAreaView style={styles.container}>
              <AuthHeader
                title={"Welcome Back to VBee Pass"}
                subtitle={
                  "Access your saved tickets, QR passes, and upcoming trips – all in one place."
                }
              />

              <View>
                <Controller
                  control={control}
                  name="emailOrUsername"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Email or Username"
                      placeholder="Enter your email or username"
                      iconName="mail"
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.emailOrUsername?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      label="Password"
                      placeholder="Enter your password"
                      iconName="lock-closed"
                      secureTextEntry={showPassword}
                      value={value ?? ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                    />
                  )}
                />
              </View>
              <View>
                <CustomButton
                  firstColor="#333333"
                  secondColor="#444444"
                  thirdColor="#000000"
                  buttonText="Sign In"
                  icon="log-in-outline"
                  handlePress={handleSubmit(handleSubmitForm)}
                  disabled={isSubmitting || isLoading}
                />
                <Dividor dividerText="Or" textColor="grey" />
                <CustomButton
                  isGradient={false}
                  buttonText="Create Account"
                  icon="person-add-outline"
                  backgroundColor="grey"
                  handlePress={() => router.push("/(auth)/Signup")}
                />
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Signin;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  container: {
    marginHorizontal: 25,
  },
});
