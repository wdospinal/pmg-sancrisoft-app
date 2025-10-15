import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@apollo/client/react';
import { GET_HERO_SLIDER, StoriesSlide, convertHeroSliderToSlides, HeroSliderData } from '../services/queries';
import { heroSliderClient } from '../services/apollo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SLIDER_HEIGHT = screenHeight * 0.6;

const StoriesSlider: React.FC = () => {
  const { data, loading, error } = useQuery<{ blockHomeHeroSlider: HeroSliderData }>(
    GET_HERO_SLIDER,
    { client: heroSliderClient }
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = convertHeroSliderToSlides(data?.blockHomeHeroSlider || null);
  const currentSlide = slides[currentIndex];
  
  const player = useVideoPlayer(currentSlide?.mediaUrl || '', player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const resetProgress = () => {
    progressAnim.setValue(0);
    setProgress(0);
  };

  const startProgress = (duration: number) => {
    resetProgress();
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNext();
      }
    });
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const jumpToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (currentSlide) {
      startProgress(currentSlide.duration);
    }
    
    return () => {
      progressAnim.stopAnimation();
    };
  }, [currentIndex, currentSlide]);

  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setProgress(value);
    });

    return () => {
      progressAnim.removeListener(listener);
    };
  }, []);

  if (!currentSlide || slides.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Progress bars */}
      <View style={styles.progressContainer}>
        {slides.map((_, index) => (
          <View key={index} style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: index < currentIndex ? '100%' : 
                         index === currentIndex ? `${progress * 100}%` : '0%'
                }
              ]}
            />
          </View>
        ))}
      </View>

      {/* Background Video or Image */}
      {currentSlide.mediaType.includes('video') ? (
        <VideoView
          player={player}
          style={styles.backgroundVideo}
          contentFit="cover"
          nativeControls={false}
        />
      ) : (
        <Image 
          source={{ uri: currentSlide.mediaUrl }}
          style={styles.backgroundVideo}
          resizeMode="cover"
        />
      )}

      {/* Dark overlay if enabled */}
      {currentSlide.enableDarkBackdrop && (
        <View style={styles.darkOverlay} />
      )}

      {/* Content */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.contentGradient}
      >
        <View style={styles.content}>
          {/* Eyebrow image or text */}
          {currentSlide.eyebrowImage ? (
            <Image 
              source={{ uri: currentSlide.eyebrowImage.url }}
              style={styles.eyebrowImage}
              resizeMode="contain"
            />
          ) : currentSlide.eyebrowText ? (
            <Text style={styles.eyebrowText}>{currentSlide.eyebrowText}</Text>
          ) : null}
          
          {/* Title */}
          <Text style={styles.title}>{currentSlide.title}</Text>
        </View>
      </LinearGradient>

      {/* Navigation */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={goToNext}
      >
        <Text style={styles.nextButtonText}>›</Text>
      </TouchableOpacity>

      {/* Touch areas for navigation */}
      <TouchableOpacity 
        style={styles.leftTouchArea}
        onPress={goToPrevious}
        activeOpacity={1}
      />
      <TouchableOpacity 
        style={styles.rightTouchArea}
        onPress={goToNext}
        activeOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SLIDER_HEIGHT,
    width: screenWidth,
    position: 'relative',
    overflow: 'hidden',
  },
  progressContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 10,
    gap: 4,
  },
  progressBarContainer: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  eyebrowImage: {
    width: 80,
    height: 40,
    marginBottom: 20,
  },
  eyebrowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  leftTouchArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%',
    height: '100%',
    zIndex: 5,
  },
  rightTouchArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '30%',
    height: '100%',
    zIndex: 5,
  },
});

export default StoriesSlider;