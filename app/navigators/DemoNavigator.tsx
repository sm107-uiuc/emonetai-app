import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useNavigation } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { StackNavigationProp } from "@react-navigation/stack"
import { useHeader } from "app/utils/useHeader"
import { useBackButtonHandler } from "."
import { useAuth0 } from "react-native-auth0"
// import { TouchableOpacity } from "react-native-gesture-handler"
import { MaterialIcons } from "@expo/vector-icons"

export type TabNavigatorParamsList = {
  DemoNavigator: undefined
  Profile: undefined
}

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  RecordJournal: undefined
  Journey: undefined
  navigation: StackNavigationProp<TabNavigatorParamsList, "DemoNavigator">
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

// async function profile() {
//   navigation.navigate("Profile");
// }

export function DemoNavigator(_props: any) {
  const { bottom } = useSafeAreaInsets()
  const { clearSession } = useAuth0()

  async function logoutAuth() {
    await clearSession()
  }
  const { navigation } = _props
  useHeader(
    {
      //leftTx: "common.back",
      leftIcon: "community",
      // leftIconSize: 20,
      onLeftPress: () => navigation.navigate("Profile", {}),
      rightText: "Logout",
      onRightPress: logoutAuth,
    },
    [],
  )
  return (
    <>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <MaterialIcons name="tag-faces" size={24} color="black" />
      </TouchableOpacity> */}

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [$tabBar, { height: bottom + 70 }],
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: $tabBarLabel,
          tabBarItemStyle: $tabBarItem,
        }}
      >
        {/* <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused && colors.tint} size={30} />
          ),
        }}
      /> */}

        <Tab.Screen
          name="RecordJournal"
          component={DemoCommunityScreen}
          options={{
            tabBarLabel: translate("demoNavigator.recordJournal"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="podcast" color={focused && colors.tint} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="Journey"
          component={DemoPodcastListScreen}
          options={{
            tabBarAccessibilityLabel: translate("demoNavigator.viewJournal"),
            tabBarLabel: translate("demoNavigator.viewJournal"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="menu" color={focused && colors.tint} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="DemoDebug"
          component={DemoDebugScreen}
          options={{
            tabBarLabel: translate("demoNavigator.debugTab"),
            tabBarIcon: ({ focused }) => (
              <Icon icon="debug" color={focused && colors.tint} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#5E91ED",
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
