export type RootStackParamList = {
  Home: undefined;
  Product: { url?: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}