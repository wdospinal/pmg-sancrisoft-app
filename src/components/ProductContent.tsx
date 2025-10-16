import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ProductContentProps {
  targetUrl?: string;
}

const ProductContent: React.FC<ProductContentProps> = ({ targetUrl }) => {
  const handleLearnMore = () => {
    if (targetUrl) {
      Linking.openURL(targetUrl).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <View style={styles.contentSection}>
      <Text style={styles.description}>
        In 2022, Sterling launched the brand's first ever mass market campaign, after five years of minimal advertising presence. The Kohler company turned to PMG to design a fully integrated full-funnel strategy to build awareness and reach among Sterling's core professional audience, connect with them with meaningful and culturally relevant messaging, and propel the brand's growth.
      </Text>

      <Text style={styles.sectionTitle}>Capabilities</Text>
      <View style={styles.capabilitiesList}>
        <Text style={styles.capability}>• Creative</Text>
        <Text style={styles.capability}>• Strategic Planning & Insights</Text>
        <Text style={styles.capability}>• Data & Analytics</Text>
        <Text style={styles.capability}>• Full-Funnel Media Strategy, Planning and Buying</Text>
      </View>

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
  );
};

const styles = StyleSheet.create({
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

export default ProductContent;

