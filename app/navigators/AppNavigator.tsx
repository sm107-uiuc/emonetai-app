/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator" // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useAuth0, Auth0Provider } from "react-native-auth0"
import { set } from "date-fns"
import { Icon } from "app/components"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // 🔥 Your screens go here
  Main: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
  Profile: NavigatorScreenParams<DemoTabParamList>
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack(props: any) {
  // @demo remove-block-start
  // const {
  //   authenticationStore: { isAuthenticated },
  // } = useStores()

  const { user, isLoading } = useAuth0()
  const { userStore } = useStores()
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        props.handleSplashScreen()
      }, 500)
    }
  }, [isLoading])
  // @demo remove-block-end
  return isLoading ? (
    <></>
  ) : (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={user ? "Main" : "Login"} // @demo remove-current-line
    >
      {/* @demo remove-block-start */}
      {user ? (
        <>
          {/* @demo remove-block-end */}
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          {/* @demo remove-block-start */}
          <Stack.Screen name="Main" component={DemoNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        </>
      )}
      {/* @demo remove-block-end */}
      {/** 🔥 Your screens go here */}
      <Stack.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          title: "Profile",
          headerRight: () => (
            <Icon icon="vector" size={390} style={{ position: "absolute", top: -110, right: 0 }} />
          ),
        }}
      />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
  handleSplashScreen: () => void
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Auth0Provider
        domain={"emonet-dev.us.auth0.com"}
        clientId={"vqUXfK2RdeUhnZFBaFmxZoBMBjWN0kqa"}
      >
        <AppStack handleSplashScreen={props.handleSplashScreen} />
      </Auth0Provider>
    </NavigationContainer>
  )
})
