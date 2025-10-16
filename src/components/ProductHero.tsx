import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

interface ProductHeroProps {
  title: string;
  subtitle?: string;
  eyebrowImage?: { url: string };
}

const ProductHero: React.FC<ProductHeroProps> = ({ title, subtitle, eyebrowImage }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.heroSection}>
      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Svg width="26" height="42" viewBox="0 0 26 42" fill="none">
              <Path
                d="M21 3L3 21L21 39"
                stroke="#2C3E50"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {eyebrowImage && (
        <Image
          source={{ uri: eyebrowImage.url }}
          style={styles.brandLogo}
          resizeMode="contain"
        />
      )}

      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#E5E1DB',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  brandLogo: {
    width: screenWidth * 0.7,
    height: 80,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  titleSection: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 56,
    fontWeight: '900',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 53,
    marginBottom: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Nimbus-Sans-Black',
  },
  subtitle: {
    fontSize: 18,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
  },
});

export default ProductHero;

