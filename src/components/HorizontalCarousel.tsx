import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_ANNOUNCEMENTS, Announcement } from '../services/queries';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.8;
const CARD_SPACING = 20;

const HorizontalCarousel: React.FC = () => {
  const { data, loading, error } = useQuery<{ announcementCollection: { items: Announcement[] } }>(GET_ANNOUNCEMENTS);

  const handleItemPress = (url: string) => {
    if (url) {
      const fullUrl = url.startsWith('http') ? url : `https://www.pmg.com${url}`;
      Linking.openURL(fullUrl).catch(err => 
        console.error('Failed to open URL:', err)
      );
    }
  };

  const items = data?.announcementCollection?.items || [];

  if (items.length === 0) {
    return null; // Don't show carousel if no items
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
      >
        {items.map((item: Announcement, index: number) => (
          <TouchableOpacity
            key={`announcement-${index}`}
            style={[
              styles.card,
              { 
                marginLeft: index === 0 ? CARD_SPACING : 0,
                backgroundColor: item.backgroundColor || '#333'
              }
            ]}
            onPress={() => handleItemPress(item.ctaUrl)}
            activeOpacity={0.8}
          >
            <View style={styles.content}>
              {item.intro && <Text style={styles.intro} numberOfLines={1}>{item.intro}</Text>}
              <Text style={styles.message} numberOfLines={3}>{item.message}</Text>
              {item.ctaLabel && (
                <View style={styles.ctaButton}>
                  <Text style={styles.ctaText}>{item.ctaLabel}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  scrollContent: {
    paddingRight: CARD_SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 12,
    marginRight: CARD_SPACING,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  intro: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  message: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HorizontalCarousel;