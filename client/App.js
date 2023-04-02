import React from 'react';
import {SafeAreaView,StyleSheet} from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

const App= () => {
  return (
    <SafeAreaView style={styles.root}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});

export default App;
