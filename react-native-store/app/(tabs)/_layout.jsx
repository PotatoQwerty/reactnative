import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "../../constants/images";

const TabsLayout = () => {
  const TabIcon = ({ focused, icon, title }) => {
    return (
      <View className="flex-1 items-center justify-center">
        <View
          className={`flex-row items-center gap-1 rounded-full min-w-[112px] min-h-[72px] mt-9 justify-center overflow-hidden ${
            focused ? "bg-secondary" : ""
          }`}
        >
          <Image
            source={icon}
            className={`${focused ? "hidden" : ""} w-6 h-6`}
            resizeMode="contain"
          />
          {focused && (
            <>
              <Image source={icon} className="w-6 h-6" resizeMode="contain" />
              <Text className="text-sm font-QuicksandMedium text-text">
                {title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          marginHorizontal: 12,
          backgroundColor: "#FFFFFF",
          borderRadius: 35,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={images.Home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={images.Search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={images.Cart} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={images.ProfileIcon}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
