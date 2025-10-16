import { gql } from '@apollo/client';
import type { HeroSliderData, StoriesSlide } from '../types';

// GraphQL Queries

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    announcementCollection {
      items {
        backgroundColor
        ctaLabel
        ctaUrl
        intro
        message
      }
    }
  }
`;

export const GET_HERO_SLIDER = gql`
  query GetHeroSlider {
    blockHomeHeroSlider(id: "770C1r3U3ogFUUdV32HlKi") {
      slide1Title
      slide1EyebrowImage {
        url
        contentType
      }
      slide1EyebrowText
      slide1TargetUrl
      slide1MobileImageOrVideo {
        url
        contentType
      }
      slide1EnableDarkBackdrop
      slide2Title
      slide2EyebrowImage {
        url
      }
      slide2EyebrowText
      slide2TargetUrl
      slide2MobileImageOrVideo {
        url
        contentType
      }
      slide2EnableDarkBackdrop
      slide3Title
      slide3EyebrowImage {
        url
      }
      slide3EyebrowText
      slide3TargetUrl
      slide3MobileImageOrVideo {
        url
        contentType
      }
      slide3EnableDarkBackdrop
      slide4Title
      slide4EyebrowImage {
        url
      }
      slide4EyebrowText
      slide4TargetLink
      slide4MobileImageOrVideo {
        url
        contentType
      }
      slide4EnableDarkBackdrop
      slide5Title
      slide5EyebrowImage {
        url
      }
      slide5EyebrowText
      slide5TargetUrl
      slide5MobileImageOrVideo {
        url
        contentType
      }
      slide5EnableDarkBackdrop
    }
  }
`;

// Constants

const MAX_SLIDES = 6; // Maximum number of slides supported in hero slider
const DEFAULT_SLIDE_DURATION = 5000; // Default duration for each slide in milliseconds

// Helper Functions

/**
 * Dynamically detects the maximum number of slides available in the data
 * @param data - The hero slider data from GraphQL
 * @returns The number of slides that have a title
 */
function detectMaxSlides(data: HeroSliderData): number {
  let maxSlides = 0;
  
  for (let i = 1; i <= MAX_SLIDES; i++) {
    const titleKey = `slide${i}Title` as keyof HeroSliderData;
    if (data[titleKey]) {
      maxSlides = i;
    }
  }
  
  return maxSlides;
}

/**
 * Converts HeroSliderData from Contentful to StoriesSlide array
 * @param data - The hero slider data from GraphQL
 * @returns Array of formatted slides
 */
export function convertHeroSliderToSlides(data: HeroSliderData | null): StoriesSlide[] {
  if (!data) return [];
  
  const slides: StoriesSlide[] = [];
  const maxSlides = detectMaxSlides(data);
  
  for (let i = 1; i <= maxSlides; i++) {
    const titleKey = `slide${i}Title` as keyof HeroSliderData;
    const title = data[titleKey];
    
    if (title) {
      const eyebrowImageKey = `slide${i}EyebrowImage` as keyof HeroSliderData;
      const eyebrowTextKey = `slide${i}EyebrowText` as keyof HeroSliderData;
      const targetUrlKey = i === 4 ? 'slide4TargetLink' : `slide${i}TargetUrl` as keyof HeroSliderData;
      const mediaKey = `slide${i}MobileImageOrVideo` as keyof HeroSliderData;
      const backdropKey = `slide${i}EnableDarkBackdrop` as keyof HeroSliderData;
      
      const media = data[mediaKey] as { url: string; contentType: string } | undefined;
      const eyebrowImage = data[eyebrowImageKey] as { url: string } | undefined;
      const eyebrowTextValue = data[eyebrowTextKey] as string | undefined;
      
      slides.push({
        id: `slide${i}`,
        title: title as string,
        subtitle: eyebrowTextValue ? `Celebrating all the ways ${eyebrowTextValue.toLowerCase()}` : undefined,
        eyebrowImage: eyebrowImage,
        eyebrowText: eyebrowTextValue,
        targetUrl: data[targetUrlKey] as string | undefined,
        mediaUrl: media?.url || '',
        mediaType: media?.contentType || '',
        enableDarkBackdrop: (data[backdropKey] as boolean) || false,
        duration: DEFAULT_SLIDE_DURATION,
      });
    }
  }
  
  return slides;
}