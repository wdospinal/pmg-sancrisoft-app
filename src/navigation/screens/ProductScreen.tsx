import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { VideoView, useVideoPlayer } from 'expo-video';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../types/navigation';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductScreenRouteProp>();
  const { title, subtitle, eyebrowText, eyebrowImage, mediaUrl, mediaType, targetUrl } = route.params;

  const player = useVideoPlayer(
    mediaType?.includes('video') ? mediaUrl : '',
    (player) => {
      if (mediaType?.includes('video')) {
        player.loop = true;
        player.muted = false;
        player.play();
      }
    }
  );

  const handleLearnMore = () => {
    if (targetUrl) {
      Linking.openURL(targetUrl).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Light Background */}
        <View style={styles.heroSection}>
          {/* Header with Logo */}
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

          {/* Brand Logo */}
          {eyebrowImage && (
            <Image
              source={{ uri: eyebrowImage.url }}
              style={styles.brandLogo}
              resizeMode="contain"
            />
          )}

          {/* Title and Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </View>

        {/* Media Section */}
        <View style={styles.mediaSection}>
          {mediaType?.includes('video') ? (
            <VideoView
              player={player}
              style={styles.media}
              contentFit="cover"
              nativeControls={true}
            />
          ) : (
            <Image
              source={{ uri: mediaUrl }}
              style={styles.media}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Description */}
          <Text style={styles.description}>
            In 2022, Sterling launched the brand's first ever mass market campaign, after five years of minimal advertising presence. The Kohler company turned to PMG to design a fully integrated full-funnel strategy to build awareness and reach among Sterling's core professional audience, connect with them with meaningful and culturally relevant messaging, and propel the brand's growth.
          </Text>

          {/* Capabilities */}
          <Text style={styles.sectionTitle}>Capabilities</Text>
          <View style={styles.capabilitiesList}>
            <Text style={styles.capability}>• Creative</Text>
            <Text style={styles.capability}>• Strategic Planning & Insights</Text>
            <Text style={styles.capability}>• Data & Analytics</Text>
            <Text style={styles.capability}>• Full-Funnel Media Strategy, Planning and Buying</Text>
          </View>

          {/* CTA Button */}
          {targetUrl && (
            <TouchableOpacity style={styles.ctaButton} onPress={handleLearnMore}>
              <Text style={styles.ctaButtonText}>View Full Case Study</Text>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M5 10H15M15 10L10 5M15 10L10 15"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          )}
        </View>
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
  mediaSection: {
    width: screenWidth,
    height: screenHeight * 0.45,
    backgroundColor: '#1a1a1a',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    backgroundColor: '#000',
    padding: 30,
    paddingBottom: 50,
  },
  description: {
    color: '#E5E1DB',
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 40,
    fontWeight: '400',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  capabilitiesList: {
    marginBottom: 50,
  },
  capability: {
    color: '#E5E1DB',
    fontSize: 16,
    lineHeight: 32,
    fontWeight: '400',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C7A7B',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 4,
    gap: 12,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default ProductScreen;