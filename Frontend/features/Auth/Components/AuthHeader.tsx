import { Image, StyleSheet, Text, View } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/vbee.png")}
          style={styles.logoStyle}
        />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {/* <Image
            source={require("@/assets/images/bee.png")}
            style={styles.beeIcon}
          /> */}
        </View>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: -20,
  },

  logoStyle: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    // transform: [{ rotate: "-10deg" }],
  },

  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  titleText: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#1A1A1A",
    lineHeight: 32,
  },

  beeIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  subtitleText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
