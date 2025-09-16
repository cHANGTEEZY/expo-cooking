import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Dividor from "@/components/Dividor";
import AuthHeader from "@/features/Auth/Components/AuthHeader";
import {
  signUpSchema,
  signUpSchemaType,
} from "@/features/Auth/schemas/auth-schema";
import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const Signup = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [showOtpField, setShowOtpField] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const methods = useForm<signUpSchemaType>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      otpCode: "",
    },
  });

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof signUpSchemaType)[] = [];

    switch (activeTab) {
      case 0:
        fieldsToValidate = ["firstName", "lastName", "phoneNumber"];
        break;
      case 1:
        fieldsToValidate = ["username", "email"];
        break;
      case 2:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }

    const isValid = await methods.trigger(fieldsToValidate);
    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Please fill all required fields",
        text2: "Check the form for any validation errors",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && activeTab < 2) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrev = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleSubmitForm = async () => {
    if (!isLoaded) return;

    const isValid = await methods.trigger();
    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Please fill all required fields correctly",
        text2: "Check the form for any validation errors",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    const formData = methods.getValues();
    setShowOtpField(true);
    try {
      await signUp.create({
        username: formData.username,
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      Toast.show({
        type: "info",
        text1: "Verification code sent!",
        text2: "Please check your email for the verification code.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    } catch (error: any) {
      setShowOtpField(false);
      Toast.show({
        type: "error",
        text1: "Sign up failed. Please try again.",
        text2: error?.message || error,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  const verifyOtp = async (otpCode: string) => {
    if (!isLoaded || !otpCode || otpCode.length !== 6) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Account created successfully!",
          text2: "Welcome to VBee Pass!",
          position: "top",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        router.replace("/(tabs)/Home");
      } else {
        Toast.show({
          type: "error",
          text1: "OTP verification failed. Please try again.",
          text2: "Invalid or expired OTP code.",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Verification failed. Please try again.",
        text2: error?.message || "Please check your OTP code.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  const handleTabPress = useCallback((tabIndex: number) => {
    setActiveTab(tabIndex);
  }, []);

  const handleLoginPress = useCallback(() => {
    router.push("/(auth)/Signin");
  }, [router]);

  const getStepTitle = () => {
    switch (activeTab) {
      case 0:
        return "Personal Information";
      case 1:
        return "Account Details";
      case 2:
        return "Security Setup";
      default:
        return "Sign Up";
    }
  };

  const getStepSubtitle = () => {
    switch (activeTab) {
      case 0:
        return "Tell us about yourself";
      case 1:
        return "Choose your username and email";
      case 2:
        return "Secure your account";
      default:
        return "";
    }
  };

  const UserPublicInfo = useCallback(() => {
    return (
      <View style={styles.tabContentInner}>
        <Controller
          control={methods.control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="person-outline"
              label="First Name"
              placeholder="Enter your first name"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={methods.formState.errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="person-outline"
              label="Last Name"
              placeholder="Enter your last name"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={methods.formState.errors.lastName?.message}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="call-outline"
              label="Phone Number"
              placeholder="Enter your phone number"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              error={methods.formState.errors.phoneNumber?.message}
            />
          )}
        />
      </View>
    );
  }, [methods.control, methods.formState.errors]);

  const UserIdInfo = useCallback(() => {
    return (
      <View style={styles.tabContentInner}>
        <Controller
          control={methods.control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="person-outline"
              label="Username"
              placeholder="Enter a username"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={methods.formState.errors.username?.message}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="mail"
              label="Email"
              placeholder="Enter your email"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={methods.formState.errors.email?.message}
            />
          )}
        />
      </View>
    );
  }, [methods.control, methods.formState.errors]);

  const UserSecretInfo = useCallback(() => {
    return (
      <View style={styles.tabContentInner}>
        <Controller
          control={methods.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="lock-closed"
              label="Password"
              placeholder="Create a password"
              secureTextEntry
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={methods.formState.errors.password?.message}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              iconName="lock-closed"
              label="Confirm Password"
              placeholder="Re-enter your password"
              secureTextEntry
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              error={methods.formState.errors.confirmPassword?.message}
            />
          )}
        />
      </View>
    );
  }, [methods.control, methods.formState.errors]);

  const OtpInputSection = useCallback(() => {
    return (
      <View style={styles.otpContainer}>
        <Text style={styles.otpTitle}>Verify Your Email</Text>
        <Text style={styles.otpSubtitle}>
          We've sent a 6-digit code to {methods.getValues("email")}
        </Text>

        <Controller
          control={methods.control}
          name="otpCode"
          render={({ field: { onChange, value } }) => (
            <OtpInput
              numberOfDigits={6}
              autoFocus
              onTextChange={(text) => {
                onChange(text);
                if (text.length === 6) {
                  verifyOtp(text);
                }
              }}
              secureTextEntry={false}
              theme={{
                containerStyle: styles.otpInputContainer,
                pinCodeContainerStyle: styles.otpInputBox,
                pinCodeTextStyle: styles.otpInputText,
                focusedPinCodeContainerStyle: styles.otpInputBoxFocused,
              }}
            />
          )}
        />

        {/* <CustomButton
          isGradient={true}
          firstColor="#FF3B30"
          secondColor="#E02401"
          thirdColor="#B71C1C"
          buttonText="Cancel"
          icon="close-outline"
          handlePress={() => setShowOtpField(false)}
          style={styles.cancelOtpButton}
        /> */}
      </View>
    );
  }, [methods.control, methods.getValues]);

  const renderNavigationButtons = () => {
    if (activeTab === 0) {
      return (
        <View style={styles.navigationContainer}>
          <View style={styles.buttonPlaceholder} />
          <CustomButton
            isGradient={true}
            firstColor="#4A90E2"
            secondColor="#357ABD"
            thirdColor="#2E5A8A"
            buttonText="Next"
            icon="arrow-forward-outline"
            handlePress={handleNext}
            style={styles.navButton}
          />
        </View>
      );
    } else if (activeTab === 1) {
      return (
        <View style={styles.navigationContainer}>
          <CustomButton
            isGradient={true}
            firstColor="#6B7280"
            secondColor="#4B5563"
            thirdColor="#374151"
            buttonText="Previous"
            icon="arrow-back-outline"
            handlePress={handlePrev}
            style={styles.navButton}
          />
          <CustomButton
            isGradient={true}
            firstColor="#4A90E2"
            secondColor="#357ABD"
            thirdColor="#2E5A8A"
            buttonText="Next"
            icon="arrow-forward-outline"
            handlePress={handleNext}
            style={styles.navButton}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <CustomButton
            isGradient={true}
            firstColor="#333333"
            secondColor="#444444"
            thirdColor="#000000"
            buttonText={
              methods.formState.isSubmitting ? "Creating..." : "Sign Up"
            }
            icon="person-add-outline"
            handlePress={handleSubmitForm}
            disabled={methods.formState.isSubmitting}
          />
          <Dividor dividerText="Or" textColor="white" />
          <CustomButton
            isGradient={false}
            buttonText="Login"
            icon="log-in-outline"
            backgroundColor="grey"
            handlePress={handleLoginPress}
          />
        </View>
      );
    }
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
          style={styles.flexContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.container}>
            <AuthHeader title={getStepTitle()} subtitle={getStepSubtitle()} />

            {showOtpField ? (
              <OtpInputSection />
            ) : (
              <>
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 0 && styles.activeTab]}
                    onPress={() => handleTabPress(0)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 0 && styles.activeTabText,
                      ]}
                    >
                      Personal
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 1 && styles.activeTab]}
                    onPress={() => handleTabPress(1)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 1 && styles.activeTabText,
                      ]}
                    >
                      Account
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 2 && styles.activeTab]}
                    onPress={() => handleTabPress(2)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === 2 && styles.activeTabText,
                      ]}
                    >
                      Security
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tabContent}>
                  {activeTab === 0 ? (
                    <UserPublicInfo />
                  ) : activeTab === 1 ? (
                    <UserIdInfo />
                  ) : (
                    activeTab === 2 && <UserSecretInfo />
                  )}
                </View>
                {renderNavigationButtons()}
              </>
            )}
          </SafeAreaView>
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
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    marginVertical: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "700",
  },
  tabContent: {
    flex: 1,
  },
  tabContentInner: {
    flex: 1,
    paddingTop: 16,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 16,
  },
  navButton: {
    flex: 1,
    minWidth: 120,
  },
  buttonPlaceholder: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  // OTP Section Styles
  otpContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  otpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  otpSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  otpInputContainer: {
    marginVertical: 20,
  },
  otpInputBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  otpInputBoxFocused: {
    borderColor: "#4A90E2",
    backgroundColor: "#EBF4FF",
  },
  otpInputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cancelOtpButton: {
    marginTop: 20,
    width: "50%",
  },
});
