import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import store from './App/redux/store';
import {  LoginScreen, RecordAttendance, SignUpScreen } from "./App/Screens";
import TabNavigation from './App/Navigation/TabNavigation';
import { useSelector } from 'react-redux';
import { initializeToken } from './App/redux/authSlice';

export const URL = "localhost:3001/api";

const Stack = createStackNavigator();
const AuthNavigation = () => {
  console.log("called AuthNavigation");
    return (
        <>
         <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        </>
    );
};

const MyStackNavigation = () => {

   console.log("called MyStackNavigation");
    return (
        <>
         <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="RecordAttendance" component={RecordAttendance} options={{ headerShown: false }} />
        </Stack.Navigator>
        </>
        
    );
};

const RootNavigation = () => {

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(initializeToken());
},[]);


    const userToken = useSelector((state)=>state.auth.token);
    console.log("userToken",userToken);
    return(
<SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          {!userToken   ? 
           <AuthNavigation/> : <MyStackNavigation/>}
        </NavigationContainer>
      </SafeAreaProvider>
    )
          
}

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
