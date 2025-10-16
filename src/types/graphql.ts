// GraphQL Response Types

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
  subtitle?: string;
  eyebrowImage?: { url: string };
  eyebrowText?: string;
  targetUrl?: string;
  mediaUrl: string;
  mediaType: string;
  enableDarkBackdrop: boolean;
  duration: number;
}

