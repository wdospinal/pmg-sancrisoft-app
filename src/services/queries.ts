import { gql } from '@apollo/client';

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

// Types for the GraphQL responses
export interface Announcement {
  backgroundColor: string;
  ctaLabel: string;
  ctaUrl: string;
  intro: string;
  message: string;
}

export interface HeroSliderData {
  slide1Title: string;
  slide1EyebrowImage?: { url: string; contentType: string };
  slide1EyebrowText?: string;
  slide1TargetUrl?: string;
  slide1MobileImageOrVideo?: { url: string; contentType: string };
  slide1EnableDarkBackdrop?: boolean;
  slide2Title: string;
  slide2EyebrowImage?: { url: string };
  slide2EyebrowText?: string;
  slide2TargetUrl?: string;
  slide2MobileImageOrVideo?: { url: string; contentType: string };
  slide2EnableDarkBackdrop?: boolean;
  slide3Title: string;
  slide3EyebrowImage?: { url: string };
  slide3EyebrowText?: string;
  slide3TargetUrl?: string;
  slide3MobileImageOrVideo?: { url: string; contentType: string };
  slide3EnableDarkBackdrop?: boolean;
  slide4Title: string;
  slide4EyebrowImage?: { url: string };
  slide4EyebrowText?: string;
  slide4TargetLink?: string;
  slide4MobileImageOrVideo?: { url: string; contentType: string };
  slide4EnableDarkBackdrop?: boolean;
  slide5Title: string;
  slide5EyebrowImage?: { url: string };
  slide5EyebrowText?: string;
  slide5TargetUrl?: string;
  slide5MobileImageOrVideo?: { url: string; contentType: string };
  slide5EnableDarkBackdrop?: boolean;
}

export interface StoriesSlide {
  id: string;
  title: string;
  eyebrowImage?: { url: string };
  eyebrowText?: string;
  targetUrl?: string;
  mediaUrl: string;
  mediaType: string;
  enableDarkBackdrop: boolean;
  duration: number;
}

// Helper function to convert HeroSliderData to StoriesSlide array
export function convertHeroSliderToSlides(data: HeroSliderData | null): StoriesSlide[] {
  if (!data) return [];
  
  const slides: StoriesSlide[] = [];
  
  for (let i = 1; i <= 5; i++) {
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
      
      slides.push({
        id: `slide${i}`,
        title: title as string,
        eyebrowImage: eyebrowImage,
        eyebrowText: data[eyebrowTextKey] as string | undefined,
        targetUrl: data[targetUrlKey] as string | undefined,
        mediaUrl: media?.url || '',
        mediaType: media?.contentType || '',
        enableDarkBackdrop: (data[backdropKey] as boolean) || false,
        duration: 5000, // Default duration
      });
    }
  }
  
  return slides;
}