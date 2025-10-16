import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';
import ProductHero from '../../components/ProductHero';
import ProductMedia from '../../components/ProductMedia';
import ProductContent from '../../components/ProductContent';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

const ProductScreen: React.FC = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { title, subtitle, eyebrowImage, mediaUrl, mediaType, targetUrl } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProductHero 
          title={title} 
          subtitle={subtitle} 
          eyebrowImage={eyebrowImage} 
        />
        <ProductMedia 
          mediaUrl={mediaUrl} 
          mediaType={mediaType} 
        />
        <ProductContent targetUrl={targetUrl} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E1DB',
  },
  scrollView: {
    flex: 1,
  },
});

export default ProductScreen;