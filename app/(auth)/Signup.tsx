import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Dividor from "@/components/Dividor";
import AuthHeader from "@/features/Auth/Components/AuthHeader";
import {
  signUpSchema,
  signUpSchemaType,
} from "@/features/Auth/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const router = useRouter();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const handleSubmitForm = (data: signUpSchemaType) => {
    console.log("Submitted data: ", data);
  };

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
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          // scrollEnabled={isKeyboardVisible}
          showsVerticalScrollIndicator={false}
          style={styles.flexContainer}
        >
          <View>
            <SafeAreaView style={styles.container}>
              <AuthHeader
                title="Create Your VBee Pass Account"
                subtitle="Securely store your tickets, generate QR passes, and get ready for future flight bookings."
              />
              <View>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      iconName="person-outline"
                      label="Username"
                      placeholder="Enter a username"
                      onBlur={onBlur}
                      value={value ?? ""}
                      onChangeText={onChange}
                      error={errors.username?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      iconName="mail"
                      label="Email"
                      placeholder="Enter your email"
                      onBlur={onBlur}
                      value={value ?? ""}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      error={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      iconName="lock-closed"
                      label="Password"
                      placeholder="Create a password"
                      secureTextEntry
                      onBlur={onBlur}
                      value={value ?? ""}
                      onChangeText={onChange}
                      error={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      iconName="lock-closed"
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      secureTextEntry
                      onBlur={onBlur}
                      value={value ?? ""}
                      onChangeText={onChange}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />
              </View>
              <View>
                <CustomButton
                  firstColor="#333333"
                  secondColor="#444444"
                  thirdColor="#000000"
                  buttonText={isSubmitting ? "Creating" : "Sign Up"}
                  icon="person-add-outline"
                  handlePress={handleSubmit(handleSubmitForm)}
                />
                <Dividor dividerText="Or" textColor="grey" />
                <CustomButton
                  isGradient={false}
                  buttonText="Login"
                  icon="log-in-outline"
                  backgroundColor="grey"
                  handlePress={() => router.push("/(auth)/Signin")}
                />
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Signup;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
  },
});
