import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

// Get tokens from Expo config
const announcementsToken = Constants.expoConfig?.extra?.announcementsToken || '';
const heroSliderToken = Constants.expoConfig?.extra?.heroSliderToken || '';

// Announcements/Carousel Client
// Endpoint: https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master
export const announcementsClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master',
    headers: {
      Authorization: `Bearer ${announcementsToken}`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Hero Slider Client
// Endpoint: https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master
export const heroSliderClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master',
    headers: {
      Authorization: `Bearer ${heroSliderToken}`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

// Default client (using announcements for backward compatibility)
export const client = announcementsClient;