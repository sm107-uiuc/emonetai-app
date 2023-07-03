import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import {
  Button,
  Icon, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps, goBack } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAuth0 } from "react-native-auth0"
import { loadString, saveString } from "app/utils/storage"
import _ from "lodash"
import { SafeAreaView } from "react-native-safe-area-context"
const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface ProfileScreenProps extends AppStackScreenProps<"Welcome"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const { clearSession, user, getCredentials } = useAuth0()
  const {
    authenticationStore: { logout },
    userStore: { setIsWelcome },
  } = useStores()

  async function logoutAuth() {
    await clearSession()
  }

  async function goNext() {
    await setIsWelcome()
    navigation.navigate("Main", { screen: "RecordJournal" })
  }
  useHeader(
    {
      leftIcon: "circleBack",
      onLeftPress: () => goBack(),
      // rightIcon: "vector",
      // rightTx: "common.logOut",
      // onRightPress: logoutAuth,
    },
    [logoutAuth],
  )
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <>
      <View style={$rectangle}>
        <Icon icon="vector" size={390} style={{ position: "absolute", top: -150, right: 0 }} />
        {/* <Text style={{ justifyContent: "center", alignItems: "center" }}>Profile</Text> */}
      </View>
      <SafeAreaView style={$container}>
        <View style={$whiteBox}></View>
        <View style={$whiteCircle}></View>
        <TouchableOpacity style={$profilePic}></TouchableOpacity>

        <TouchableOpacity>
          <View style={$buttons}>
            <Icon icon="account" />
            <Icon icon="right" style={{ position: "absolute", top: -10, left: 260 }} />
            <Text style={$text}>Account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={$buttons}>
            <Icon icon="terms" />
            <Icon icon="right" style={{ position: "absolute", top: -10, left: 265 }} />
            <Text style={$text}> Terms of service</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={$buttons}>
            <Icon icon="privacy" />
            <Icon icon="right" style={{ position: "absolute", top: -10, left: 255 }} />
            <Text style={$text}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={$bottomContainer}></TouchableOpacity> */}

        <View style={$bottomContainer}>
          <Icon icon="accel" />
        </View>
      </SafeAreaView>
    </>
  )
})

const $text: TextStyle = {
  //   marginRight: 175,
  marginLeft: 15,
  //   textAlign: "left",
  fontSize: 20,
  fontFamily: "Helvetica",
  //     <font>Lato</font>
  // //     font-size:16px;
  // // font-family:Lato;
}

const $buttons: ViewStyle = {
  padding: 25,
  marginTop: -10,
  flexDirection: "row",
  bottom: 100,
  width: 350,
  height: 75,
  borderRadius: 20,
  //   backgroundColor: "pink",
  //   justifyContent: "center",
  alignItems: "center",
}
const $buttonSpace: ViewStyle = {
  width: 10,
  height: 10,
}

const $whiteCircle: ViewStyle = {
  position: "absolute",
  bottom: 570,
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: "white",
}

const $profilePic: ViewStyle = {
  position: "absolute",
  bottom: 575,
  width: 140,
  height: 140,
  borderRadius: 70,
  backgroundColor: "grey",
}

const $whiteBox: ViewStyle = {
  position: "absolute",
  bottom: 50,
  width: 350,
  height: 600,
  borderRadius: 20,
  backgroundColor: "white",
}

const $rectangle: ViewStyle = {
  flex: 0.5,
  backgroundColor: "#5E91ED",
}
const $container: ViewStyle = {
  flex: 2,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  //   flexShrink: 1,
  position: "absolute",
  bottom: 30,
  //   flexGrow: 0,
  //   flexBasis: "43%",
  //   backgroundColor: "pink",
  //   height: 50,
  //   width: 200,
  //   borderTopLeftRadius: 16,
  //   borderTopRightRadius: 16,
  //   paddingHorizontal: spacing.lg,
  //   justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
