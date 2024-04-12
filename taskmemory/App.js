import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import RegisterScreen from './registro';
import HomeScreen from './home';
import AddScreen from './añadir';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: 'Registro',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontFamily: 'serif',
            },
          }}
        />
        <Stack.Screen
        name='Inicio'
        component={HomeScreen}
        options={{ headerShown: false }}/>
        <Stack.Screen
        name='Add'
        component={AddScreen}
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
