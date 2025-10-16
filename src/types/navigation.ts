export type RootStackParamList = {
  Home: undefined;
  Product: { 
    title: string;
    subtitle?: string;
    eyebrowText?: string;
    eyebrowImage?: { url: string };
    mediaUrl: string;
    mediaType: string;
    targetUrl?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}