# PMG Sancrisoft App

A React Native mobile application built with Expo, featuring dynamic content from Contentful CMS including announcements carousel and hero slider.

## 🚀 Features

- **Announcements Carousel**: Horizontal scrolling cards displaying announcements with custom backgrounds and CTAs
- **Hero Slider**: Full-screen story-style slider with video/image backgrounds and interactive navigation
- **Dynamic Content**: Content managed through Contentful CMS
- **Modern Navigation**: Stack-based navigation with React Navigation
- **Type-Safe**: Built with TypeScript for enhanced developer experience

## 📸 Screenshots

<div align="center">

### Home Screen with Hero Slider
<img src="./assets/screenshots/home-woolmark.png" width="300" alt="Home Screen - Woolmark Campaign" />
<img src="./assets/screenshots/home-kohler.png" width="300" alt="Home Screen - Kohler Campaign" />

*Hero slider showcasing different campaigns with video/image backgrounds and progress indicators*

### Product Detail Screen
<img src="./assets/screenshots/product-detail.png" width="300" alt="Product Detail Screen" />

*Detailed product view with brand logo, title, subtitle, media section, and capabilities*

</div>

**Features Shown:**
- ✅ Announcements carousel at the top with "THIS JUST IN..." section
- ✅ Full-screen hero slider with brand campaigns
- ✅ Progress bars indicating slider position
- ✅ Product detail screen with dynamic content from Contentful
- ✅ Responsive design with custom typography (Nimbus Sans)
- ✅ Video playback support in hero sections

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Studio** for testing

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pmg-sancrisoft-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the project root:
   ```bash
   touch .env
   ```

4. **Add your Contentful tokens to `.env`**
   ```env
   ANNOUNCEMENTS_TOKEN=
   HERO_SLIDER_TOKEN=
   ```
   
   **Important:** You must create the `.env` file with valid tokens for the app to work.

5. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

6. **Run on a device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 📁 Project Structure

```
pmg-sancrisoft-app/
├── src/
│   ├── components/          # Reusable UI components & screens
│   │   ├── HorizontalCarousel.tsx    # Announcements carousel
│   │   ├── StoriesSlider.tsx         # Hero slider with progress bars
│   │   ├── ProductHero.tsx           # Product hero section (header, logo, title)
│   │   ├── ProductMedia.tsx          # Product media (video/image player)
│   │   └── ProductContent.tsx        # Product content (description, CTA)
│   ├── navigation/          # Navigation configuration
│   │   ├── index.tsx        # Stack navigator setup
│   │   └── screens/         # Screen components
│   │       ├── HomeScreen.tsx        # Home screen
│   │       └── ProductScreen.tsx     # Product detail screen
│   ├── services/            # API & Apollo Client setup
│   │   ├── apollo.ts        # GraphQL client configuration (2 clients)
│   │   └── queries.ts       # GraphQL queries & helper functions
│   └── types/               # TypeScript type definitions
│       ├── index.ts         # Type exports (barrel file)
│       ├── navigation.ts    # Navigation types
│       └── graphql.ts       # GraphQL response types
├── assets/                  # Images, fonts, and static files
│   ├── fonts/              # Custom fonts (Nimbus Sans)
│   ├── screenshots/        # App screenshots for README
│   └── *.png               # App icons
├── __tests__/              # Jest test files
│   ├── HorizontalCarousel.test.tsx
│   └── StoriesSlider.test.tsx
├── __mocks__/              # Jest mocks for Expo modules
│   ├── expo-video.js
│   └── expo-linear-gradient.js
├── app.config.js           # Expo configuration (dynamic)
├── App.tsx                 # Root component with font loading
├── index.ts                # Entry point
├── jest.setup.js           # Jest configuration & global mocks
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Custom Fonts

**✅ Nimbus Sans is configured and loaded!**

The app includes the following Nimbus Sans font families:
- `Nimbus-Sans` (Regular)
- `Nimbus-Sans-Bold` (Bold)
- `Nimbus-Sans-Black` (Heavy/Black weight - used in hero titles)
- `Nimbus-Sans-Italic`
- `Nimbus-Sans-Bold-Italic`
- `Nimbus-Sans-UltraLight`

**Usage example:**
```typescript
<Text style={{ fontFamily: 'Nimbus-Sans-Black', fontSize: 48 }}>
  Bold Headline
</Text>
```

**Fonts are loaded in `App.tsx`:**
- Uses `expo-font` with `useState` and `useEffect`
- Shows loading spinner until fonts are ready
- All fonts loaded before app renders

## 🔧 Configuration

### Contentful API Endpoints

The app connects to two Contentful spaces:

1. **Announcements API**
   - Endpoint: `https://graphql.contentful.com/content/v1/spaces/951t4k2za2uf/environments/master`
   - Used for: Announcement carousel items

2. **Hero Slider API**
   - Endpoint: `https://graphql.contentful.com/content/v1/spaces/tyqyfq36jzv2/environments/master`
   - Used for: Hero slider content

### Environment Variables

Tokens are managed through `app.config.js` and can be set via:

1. **`.env` file** (recommended for development)
2. **Fallback defaults** in `app.config.js` (for quick testing)
3. **CI/CD environment variables** (for production builds)

Access tokens in code via:
```typescript
import Constants from 'expo-constants';
const token = Constants.expoConfig?.extra?.announcementsToken;
```

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run Jest tests
- `npm run test:coverage` - Run tests with coverage report

## 🏗️ Technologies Used

### Core
- **React Native** (0.81.4) - Mobile framework
- **Expo** (SDK 54) - Development tooling and build system
- **TypeScript** (5.x) - Type safety and better DX

### Navigation & State
- **React Navigation** (v6) - Native stack navigation
- **React Native Safe Area Context** - Safe area handling

### GraphQL & API
- **Apollo Client** (v4) - GraphQL client with caching
- **Contentful GraphQL API** - Headless CMS integration
- Two separate Apollo clients for different Contentful spaces

### UI & Media
- **Expo Video** - Video playback (replaced deprecated expo-av)
- **Expo Linear Gradient** - Gradient components
- **React Native SVG** - SVG support for icons
- **Nimbus Sans** - Custom font family

### Testing
- **Jest** (~29.7.0) - JavaScript testing framework
- **React Native Testing Library** - Component testing utilities
- **Jest Expo** - Jest preset for Expo projects

### Development Tools
- **ESLint** - Code linting
- **Expo Constants** - Environment variables access

## 🎨 Key Components

### Screen Components

#### HomeScreen
Main landing screen that displays:
- `HorizontalCarousel` - Announcements from Contentful
- `StoriesSlider` - Hero slider with campaigns

#### ProductScreen
Product detail screen composed of:
- `ProductHero` - Header with back button, logo, title, and subtitle
- `ProductMedia` - Video or image display
- `ProductContent` - Description, capabilities list, and CTA button

### UI Components

#### HorizontalCarousel
Displays announcements in a horizontal scrolling carousel with:
- Custom background colors from Contentful
- Intro text with ellipsis truncation (1 line)
- Message text with ellipsis truncation (3 lines)
- CTA buttons with deep linking to PMG website
- Loading skeleton with shimmer effect
- Optimized with `useCallback` and `useMemo`

#### StoriesSlider
Instagram-style full-screen slider featuring:
- Video/image backgrounds from Contentful
- Animated progress bars at the bottom
- Dark backdrop overlay option
- Auto-advance timer (5 seconds per slide)
- Navigation controls (forward/backward)
- Dynamic slide detection (supports up to 6 slides)
- Click-to-navigate to product details
- Loading skeleton with shimmer effect
- SVG icon for navigation arrow

#### Product Components

**ProductHero**
- Back navigation button with SVG icon
- Brand logo display
- Large title with Nimbus Sans Black font
- Subtitle with dynamic content from API

**ProductMedia**
- Video player with `expo-video`
- Image fallback
- Autoplay and loop for videos
- Native video controls

**ProductContent**
- Project description
- Capabilities list
- "View Full Case Study" CTA button
- External link handling with `Linking` API

## 🔐 Security Notes

- Never commit `.env` files to version control
- The `.env` file is already added to `.gitignore`
- Rotate API tokens regularly
- Use different tokens for development and production

## 🧪 Testing

The project includes comprehensive test coverage using Jest and React Native Testing Library.

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Files
- `__tests__/HorizontalCarousel.test.tsx` - Tests for announcements carousel
- `__tests__/StoriesSlider.test.tsx` - Tests for hero slider

### Test Coverage Includes
- Component rendering with loading states
- GraphQL query handling
- Error states
- User interactions
- Text truncation
- URL handling

## 🏗️ Architecture Highlights

### Component-Based Structure
- **Atomic Design**: Small, reusable components composed into screens
- **Separation of Concerns**: UI components separate from business logic
- **Type Safety**: Full TypeScript coverage with proper interfaces

### GraphQL Integration
- **Multiple Clients**: Separate Apollo clients for different Contentful spaces
- **Type-Safe Queries**: TypeScript interfaces for all GraphQL responses
- **Helper Functions**: Data transformation utilities (e.g., `convertHeroSliderToSlides`)
- **Dynamic Content**: Slides dynamically detected based on available data

### Performance Optimizations
- **React Hooks**: `useCallback` and `useMemo` to prevent unnecessary re-renders
- **Loading Skeletons**: Shimmer effects while content loads
- **Optimized Images**: Proper image sizing and caching
- **Efficient Loops**: Dynamic slide detection (only loops through available slides)

## 🐛 Troubleshooting

### Module resolution errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### TypeScript errors
```bash
# Ensure tsconfig.json has jsx enabled
# Should include: "jsx": "react-native"
npx tsc --noEmit
```

### Apollo Client hook errors
```bash
# Reinstall Apollo Client and dependencies
npm uninstall @apollo/client
npm install @apollo/client graphql
```

### Test failures
```bash
# Clear Jest cache
npm test -- --clearCache

# Run specific test file
npm test -- HorizontalCarousel.test.tsx
```

### Font loading issues
```bash
# Ensure font files are in assets/fonts/
# Check App.tsx for font loading logic
# Fonts must load before app renders
```

## 📝 License

Copyright 2025 PMG. All rights reserved.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues, please contact the development team.

---

Built with ❤️ by the PMG team

