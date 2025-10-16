import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ProductMediaProps {
  mediaUrl: string;
  mediaType: string;
}

const ProductMedia: React.FC<ProductMediaProps> = ({ mediaUrl, mediaType }) => {
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

  return (
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
  );
};

const styles = StyleSheet.create({
  mediaSection: {
    width: screenWidth,
    height: screenHeight * 0.45,
    backgroundColor: '#1a1a1a',
  },
  media: {
    width: '100%',
    height: '100%',
  },
});

export default ProductMedia;

