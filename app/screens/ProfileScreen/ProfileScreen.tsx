import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native"
import {
  Button,
  Icon, // @demo remove-current-line
  Text,
} from "../../components"
import { isRTL } from "../../i18n"
import { useStores } from "../../models" // @demo remove-current-line
import { AppStackScreenProps, goBack } from "../../navigators" // @demo remove-current-line
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { useAuth0 } from "react-native-auth0"
import { loadString, saveString } from "app/utils/storage"
import _ from "lodash"
import { SafeAreaView } from "react-native-safe-area-context"
const welcomeLogo = require("../../../assets/images/logo.png")
const welcomeFace = require("../../../assets/images/welcome-face.png")
// import Logo from "../../../assets/images/iVentureLogo.svg"

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
  // useHeader()
  // {
  //   leftIcon: "circleBack",
  //   onLeftPress: () => goBack(),
  //   backgroundColor: "transparent", // Black color with 50% opacity

  //   // rightIcon: "vector",
  //   // rightTx: "common.logOut",
  //   // onRightPress: logoutAuth,
  // },
  // [logoutAuth],
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <>
      <View style={$blueRectangle}>
        <Icon icon="vector" size={390} style={{ position: "absolute", top: -60, right: 0 }} />
        {/* <Text style={{ justifyContent: "center", alignItems: "center" }}>Profile</Text> */}
      </View>
      <TouchableOpacity onPress={goBack}>
        <Icon
          icon="circleBack"
          // color="red"
          size={35}
          style={{ position: "absolute", top: -200, left: 20 }}
        />
      </TouchableOpacity>
      <SafeAreaView style={$container}>
        <View style={$whiteBox}></View>
        <View style={$whiteCircle}></View>
        <TouchableOpacity style={$profilePic}></TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("FirstScreen")}>
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

        <View style={$bottomContainer}>{/* <Logo style={{ alignSelf: "center" }}></Logo> */}</View>
      </SafeAreaView>
    </>
  )
})

const $text: TextStyle = {
  //   marginRight: 175,
  marginLeft: 15,
  //   textAlign: "left",
  fontSize: 19,
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

const $blueRectangle: ViewStyle = {
  flex: 1,
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
  bottom: 40,
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

// import { observer } from "mobx-react-lite"
// import React, { FC, useEffect, useState } from "react"
// import {
//   View,
//   ViewStyle,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native"
// import {
//   AutoImage,
//   Icon, // @demo remove-current-line
//   Text,
//   Screen,
// } from "../../components"
// import { AppStackScreenProps, goBack } from "../../navigators" // @demo remove-current-line
// import { colors, spacing } from "../../theme"
// import _ from "lodash"
// import { useHeader } from "app/utils/useHeader"
// import { useStores } from "app/models"
// // @ts-expect-error - SVG logo not supported by react-native-svg
// import Logo from "../../../assets/images/iVentureLogo.svg"

// interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

// const ProfileItem = (_props: { leftIcon: string; rightIcon: string; title: string }) => {
//   return (
//     <TouchableOpacity onPress={goBack}>
//       <View style={$buttons}>
//         <Icon icon={_props.leftIcon} size={20} />
//         <Text text={_props.title} style={{ width: "80%" }} />
//         <Icon icon={_props.rightIcon} size={20} style={{ paddingRight: spacing.lg }} />
//       </View>
//     </TouchableOpacity>
//   )
// }

// export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen(
//   _props, // @demo remove-current-line
// ) {
//   const { navigation } = _props
//   const [scrollY, setScrollY] = useState<number>(0)
//   const { userStore } = useStores()
//   const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const { y } = event.nativeEvent.contentOffset
//     setScrollY(y)
//   }
//   const shadows = {
//     shadowOpacity: 0.4,
//     shadowRadius: 5,
//     shadowOffset: { width: 1, height: 2 },
//   }
//   useHeader(
//     {
//       title: "Emonet",
//       titleStyle: {
//         color: "white",
//       },
//       onLeftPress: goBack,
//       leftIcon: "circleBack",
//       leftIconColor: "white",
//       leftIconSize: 24,
//       rightIcon: "caretRight",
//       rightIconColor: "white",
//       rightText: "My Prompts",
//       rightTxOptions: {
//         color: "white",
//       },
//       backgroundColor: colors.primaryActionBackground,
//       containerStyle:
//         scrollY > 56
//           ? {
//               elevation: 2,
//               backgroundColor: colors.primaryActionBackground,
//               ...(Platform.OS === "ios" && shadows),
//             }
//           : {},
//     },
//     [scrollY],
//   )
//   return (
//     <Screen
//       preset="scroll"
//       style={{}}
//       contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
//       ScrollViewProps={{
//         alwaysBounceHorizontal: false,
//         alwaysBounceVertical: false,
//         bounces: false,
//         overScrollMode: "never",
//         onScroll: onScroll,
//         scrollEventThrottle: 1,
//       }}
//     >
//       {/* <View style={$blueRectangle}></View> */}
//       <View style={$mainContainer}>
//         <TouchableOpacity onPress={() => {}} style={{ bottom: 0, position: "absolute" }}>
//           <AutoImage
//             maxHeight={60}
//             maxWidth={60}
//             source={
//               userStore.profilePicture
//                 ? {
//                     uri: userStore?.profilePicture /** This will be base64 */,
//                   }
//                 : require("../../../assets/images/default-profile.jpeg")
//             }
//             style={{
//               borderRadius: Dimensions.get("window").width * (0.33 / 2),
//               height: Dimensions.get("window").width * 0.33,
//               width: Dimensions.get("window").width * 0.33,
//               borderWidth: 3,
//               borderColor: "white",
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={[$container]}>
//         <View style={$body}>
//           <View style={{ width: "100%" }}>
//             <Text text={userStore.name} size="lg" style={{ alignSelf: "center" }} />
//             {<Text text={userStore.bio} size="sm" style={{ alignSelf: "center" }} />}
//           </View>
//           <View style={$buttonContainer}>
//             <ProfileItem leftIcon="account" rightIcon="right" title="Account"></ProfileItem>
//             <ProfileItem leftIcon="terms" rightIcon="right" title="Terms of Service"></ProfileItem>
//             <ProfileItem leftIcon="privacy" rightIcon="right" title="Privacy Policy"></ProfileItem>
//           </View>
//           <View style={$logoContainer}>
//             <Logo style={{ alignSelf: "center" }}></Logo>
//           </View>
//         </View>
//       </View>
//     </Screen>
//   )
// })

// const $mainContainer: ViewStyle = {
//   alignItems: "center",
//   position: "absolute",
//   zIndex: 1,
//   justifyContent: "center",
//   alignSelf: "center",
//   top: Dimensions.get("window").height * 0.18,
// }

// const $buttons: ViewStyle = {
//   padding: spacing.md,
//   width: "100%",
//   justifyContent: "space-evenly",
//   flexDirection: "row",
//   alignItems: "center",
// }
// const $blueRectangle: ViewStyle = {
//   backgroundColor: colors.primaryActionBackground,
//   width: Dimensions.get("window").width,
//   height:
//     Dimensions.get("window").height * 0.18 -
//     Dimensions.get("window").height * (56 / Dimensions.get("window").height),
//   paddingLeft: spacing.sm,
// }
// const $container: ViewStyle = {
//   marginTop: "-5%",
//   borderTopLeftRadius: 24,
//   borderTopRightRadius: 24,
//   backgroundColor: colors.palette.neutral200,
//   paddingTop: spacing.sm,
//   flex: 1,
//   width: "100%",
//   justifyContent: "space-between",
//   alignItems: "center",
// }

// const $body: ViewStyle = { flex: 1, flexDirection: "column", marginTop: "19%", width: "100%" }

// const $logoContainer: ViewStyle = {
//   justifyContent: "space-between",
//   alignContent: "center",
//   width: "100%",
//   padding: spacing.xxxl,
// }

// const $buttonContainer: ViewStyle = { flex: 1, width: "100%", paddingLeft: spacing.sm }
