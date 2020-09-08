import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './screens/Contacts';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Profile from './screens/Profile';
import Options from './screens/Options';
import colors from './utils/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ContactsScreens() {
  return (
    <Stack.Navigator initialRouteName="Contacts">
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function FavoritesScreens() {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorites}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function UserScreens() {
  return (
    <Stack.Navigator initialRouteName="User" mode="modal">
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  );
}

const getDrawerItemIcon = (icon) => ({ tintColor }) => (
  <MaterialIcons
    name={icon}
    size={26}
    style={{ color: tintColor }}
  />
);

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Contacts">
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreens}
          options={{ drawerIcon: getDrawerItemIcon('list') }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreens}
          options={{ drawerIcon: getDrawerItemIcon('star') }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreens}
          options={{ drawerIcon: getDrawerItemIcon('person') }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
