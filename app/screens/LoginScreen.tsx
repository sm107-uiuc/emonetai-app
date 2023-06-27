import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {useAuth0} from "react-native-auth0";
import Lottie from 'lottie-react-native';
import { loadString } from "app/utils/storage"
import { el } from "date-fns/locale"
import _ from 'lodash';

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
    userStore: { isWelcome }
  } = useStores()
  const {authorize, user, isLoading} = useAuth0();
  const { navigation } = _props
  console.tron.log("isLoading", isLoading);
  useEffect(() => {
    if(!_.isEmpty(user)) {
      console.log("Hitting here");
      console.tron.log("isWelcome", isWelcome)
      if(isWelcome)
        navigation.navigate("Main", { screen: "RecordJournal" })
      else  
        navigation.navigate("Welcome")
    }
  }, [user])

  const error = isSubmitted ? validationError : ""

  async function login() {
    try {
        await authorize({
          connection: 'sms',
          scope: 'openid profile email',
          audience:'https://api.emonet.ai'
        }, {ephemeralSession: true});
    } catch (e) {
        console.log("Error", e);
    }
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
     <View style={$viewContainer}>
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
    </View>
      <View style={$lottie}>
        <Lottie source={require('../../assets/animations/login.json')} resizeMode="contain" autoPlay loop/>
      </View>
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
        isLoading={isLoading}
      />
          
    </Screen>
  )
})

const $lottie: ViewStyle = {
  height: '50%',
}


const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  width: '100%',
  justifyContent: 'center',
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $viewContainer: ViewStyle = {
  
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

// @demo remove-file
