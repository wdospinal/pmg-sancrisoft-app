import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { client } from './src/services/apollo';
import { RootNavigator } from './src/navigation';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Nimbus-Sans': require('./assets/fonts/NimbusSanL-Reg.otf'),
          'Nimbus-Sans-Italic': require('./assets/fonts/NimbusSanL-RegIta.otf'),
          'Nimbus-Sans-Bold': require('./assets/fonts/NimbusSanL-Bol.otf'),
          'Nimbus-Sans-Bold-Italic': require('./assets/fonts/NimbusSanL-BolIta.otf'),
          'Nimbus-Sans-Black': require('./assets/fonts/Nimbus Sans Becker PBla Regular.ttf'),
          'Nimbus-Sans-UltraLight': require('./assets/fonts/nimbussansdot-ultrligh.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
