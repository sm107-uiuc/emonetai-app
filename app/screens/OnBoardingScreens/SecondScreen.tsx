import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Dimensions,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import {
  AutoImage,
  Icon, // @demo remove-current-line
  Text,
  Screen,
} from "../../components"
import { AppStackScreenProps, goBack } from "../../navigators" // @demo remove-current-line
import { colors, spacing } from "../../theme"
import _ from "lodash"
import { useHeader } from "app/utils/useHeader"
import { useStores } from "app/models"

// @ts-expect-error - SVG logo not supported by react-native-svg
import onboardOne from "../../../assets/images/onboardOne.png"
// @ts-expect-error - SVG logo not supported by react-native-svg

import Logo from "../../../assets/images/iVentureLogo.svg"

interface SecondScreenProps extends AppStackScreenProps<"Profile"> {}

export const SecondScreen: FC<SecondScreenProps> = observer(function SecondScreen(
  _props, // @demo remove-current-line
) {
  const { navigation } = _props
  const [scrollY, setScrollY] = useState<number>(0)
  const { userStore } = useStores()
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset
    setScrollY(y)
  }
  const shadows = {
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 2 },
  }
  useHeader(
    {
      backgroundColor: colors.onBoardingBackground,
      containerStyle:
        scrollY > 56
          ? {
              elevation: 2,
              backgroundColor: colors.onBoardingBackground,
              ...(Platform.OS === "ios" && shadows),
            }
          : {},
    },
    [scrollY],
  )
  return (
    <Screen
      preset="scroll"
      style={{ backgroundColor: colors.onBoardingBackground }}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      ScrollViewProps={{
        alwaysBounceHorizontal: false,
        alwaysBounceVertical: false,
        bounces: false,
        overScrollMode: "never",
        onScroll: onScroll,
        scrollEventThrottle: 1,
      }}
    >
      <View>
        <View
          style={{
            // flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AutoImage
            maxHeight={60}
            maxWidth={60}
            source={require("../../../assets/images/onboardTwo.png")}
            style={{
              // flex: 1,
              height: Dimensions.get("window").width * 0.62,
              width: Dimensions.get("window").width * 0.8,
              top: Dimensions.get("window").height * 0.15,
              marginBottom: 10,
            }}
          />
          <Text style={$headerText}>Inspiration through Prompts & Images</Text>
          <Text style={$captionText}>
            Enhance your journaling experience with <Text style={$boldText}>prompts and</Text>
          </Text>
          <Text style={$captionText}>
            <Text style={$boldText}>images. </Text>Let our curated collection of prompts stimulate
          </Text>
          <Text style={$captionText}>your thoughts and guide your reflections.</Text>
        </View>

        <TouchableOpacity style={$buttons} onPress={goBack}>
          <View style={$whiteButtonContainer}>
            <Icon icon="caretLeft" color="#9B9898"></Icon>
            <Text style={$backText}> Back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={$buttons} onPress={() => navigation.navigate("ThirdScreen")}>
          <View style={$blueButtonContainer}>
            <Text style={$buttonText}> Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})

const $headerText: TextStyle = {
  fontSize: 18,
  color: "black",
  marginBottom: 15,
  alignItems: "center",
  top: Dimensions.get("window").height * 0.15,
}

const $captionText: TextStyle = {
  fontSize: 13,
  color: "#5F5F5F",
  alignItems: "center",
  top: Dimensions.get("window").height * 0.15,
}

const $boldText: TextStyle = {
  fontSize: 12,
  color: "black",
  flexDirection: "row",
  alignItems: "center",
  fontWeight: "bold",
  top: Dimensions.get("window").height * 0.2,
}

const $backText: TextStyle = {
  fontSize: 18,
  color: "#9B9898",
  flexDirection: "row",
}

const $buttonText: TextStyle = {
  fontSize: 20,
  color: "white",
}

const $blueButtonContainer: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.blueButton,
  alignItems: "center",
  justifyContent: "center",
  width: Dimensions.get("window").width * 0.9,
  height: Dimensions.get("window").width * 0.14,
  borderRadius: 30,
  top: Dimensions.get("window").height * 0.21,
}

const $whiteButtonContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  backgroundColor: colors.onBoardingBackground,
  alignItems: "center",
  justifyContent: "center",
  width: Dimensions.get("window").width * 0.9,
  height: Dimensions.get("window").width * 0.14,
  borderRadius: 30,
  top: Dimensions.get("window").height * 0.24,
}

const $buttons: ViewStyle = {
  padding: spacing.md,
  width: "100%",
  justifyContent: "space-evenly",
  flexDirection: "row",
  alignItems: "center",
}
// const $blueRectangle: ViewStyle = {
//   backgroundColor: "#F8F2F2",
//   width: Dimensions.get("window").width,
//   height:
//     Dimensions.get("window").height * 0.18 -
//     Dimensions.get("window").height * (56 / Dimensions.get("window").height),
//   paddingLeft: spacing.sm,
// }
const $container: ViewStyle = {
  marginTop: "-5%",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  backgroundColor: colors.palette.neutral200,
  paddingTop: spacing.sm,
  flex: 1,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
}

const $body: ViewStyle = { flex: 1, flexDirection: "column", marginTop: "19%", width: "100%" }

const $logoContainer: ViewStyle = {
  justifyContent: "space-between",
  alignContent: "center",
  width: "100%",
  padding: spacing.xxxl,
}

// const $buttonContainer: ViewStyle = { flex: 1, width: "100%", paddingLeft: spacing.sm }
