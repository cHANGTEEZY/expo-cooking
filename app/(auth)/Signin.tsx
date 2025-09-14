import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Dividor from "@/components/Dividor";
import { signInSchema, signInSchemaType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const [showPassword, setShowPassword] = React.useState(true);

  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const handleSubmitForm = (data: signInSchemaType) => {
    console.log("Submitted data: ", data);
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#F5F5F5", "#1A1A1A"]}
      start={[0.3, 0.3]}
      end={[1, 1]}
      style={styles.flexContainer}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
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
