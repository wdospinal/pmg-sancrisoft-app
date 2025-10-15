import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
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

  const slides = convertHeroSliderToSlides(data?.blockHomeHeroSlider || null);
  const currentSlide = slides[currentIndex];

  // Create video player only if current slide has video
  const videoUrl = currentSlide?.mediaType?.includes('video') ? currentSlide.mediaUrl : '';
  const player = useVideoPlayer(videoUrl, player => {
    if (videoUrl) {
      player.loop = true;
      player.muted = true;
      player.play();
    }
  });

  const resetProgress = () => {
    progressAnim.setValue(0);
    setProgress(0);
  };

  const startProgress = (duration: number) => {
    resetProgress();
    
    // Ensure animation starts fresh
    progressAnim.setValue(0);
    
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
      isInteraction: false,
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

  // Start progress animation on mount and slide changes
  useEffect(() => {
    if (currentSlide && slides.length > 0) {
      // Stop any existing animation
      progressAnim.stopAnimation();
      // Start new progress animation for current slide
      startProgress(currentSlide.duration);
    }

    return () => {
      progressAnim.stopAnimation();
    };
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setProgress(value);
    });

    return () => {
      progressAnim.removeListener(listener);
    };
  }, [progressAnim]);

  // Loading skeleton
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.skeletonBackground}>
          {/* Animated gradient shimmer effect */}
          <View style={styles.skeletonShimmer} />
        </View>
        
        {/* Progress bars skeleton */}
        <View style={styles.progressContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <View key={index} style={styles.skeletonProgressBar} />
          ))}
        </View>

        {/* Content skeleton */}
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonLogo} />
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonTitleShort} />
        </View>
      </View>
    );
  }

  if (error || !currentSlide || slides.length === 0) return null;

  return (
    <View style={styles.container}>
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
        colors={['transparent', 'rgba(0,0,0,0.9)']}
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

      {/* Progress bars at bottom */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SLIDER_HEIGHT,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 10,
    gap: 8,
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    padding: 25,
    paddingBottom: 70,
  },
  eyebrowImage: {
    width: 120,
    height: 50,
    marginBottom: 25,
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
    color: '#FFFFFF',
    fontFamily: 'Nimbus-Sans-Black',
    fontSize: 60,
    fontWeight: '900',
    letterSpacing: 1.44,
    lineHeight: 60,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  nextButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    marginTop: -30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 2,
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
  // Skeleton styles
  skeletonBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
  },
  skeletonShimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  skeletonContent: {
    position: 'absolute',
    bottom: 70,
    left: 25,
    right: 25,
  },
  skeletonLogo: {
    width: 100,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 25,
  },
  skeletonTitle: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonTitleShort: {
    width: '70%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
  },
  skeletonProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
});

export default StoriesSlider;