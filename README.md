
📱 QuickCart – React Native Product App
A production-style React Native mobile application built using React Native CLI + TypeScript that demonstrates scalable architecture, API data handling, Redux state management, search, pagination, persistence, and lifecycle awareness.

<div align="center"> <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/React_Navigation-6B52AE?style=for-the-badge&logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" /> <img src="https://img.shields.io/badge/AsyncStorage-FF9900?style=for-the-badge&logo=storage&logoColor=white" /> </div>
📋 Project Overview
This project was built as part of a React Native Fresher Technical Evaluation Task focusing on code quality, performance, and real-world app structure rather than UI styling. The app demonstrates industry-standard patterns and practices for building scalable React Native applications.

🔗 App Demo: Google Drive Link

✨ Features Implemented
✅ Core Requirements
Feature	Implementation
⚛️ React Native CLI	Native development environment (not Expo)
📘 TypeScript	Full type safety throughout the application
🎣 React Hooks	Functional components with useState, useEffect, useCallback, useMemo
🗃️ Redux Toolkit	Global state management with typed hooks
🧭 Navigation	Multiple screens with native stack navigator
📊 Large Dataset	Products API with 100+ items
🔍 Search	Live search with debouncing and suggestions
🏷️ Category Filtering	Horizontal scrollable categories with chip selection
♾️ Infinite Scroll	Pagination with FlatList onEndReached
💾 Data Persistence	AsyncStorage for recent searches and cart state
🔄 Lifecycle Handling	App state awareness and data restoration
⏳ Loading States	Skeleton loaders and activity indicators
⚠️ Error Handling	API errors, empty states, retry mechanisms
🎨 Pure RN Components	No third-party UI libraries
🌐 Public API
Data is powered by DummyJSON public APIs:

text
https://dummyjson.com/products
APIs Used:
javascript
// Get all products with pagination
GET /products?limit={limit}&skip={skip}

// Search products
GET /products/search?q={query}

// Get products by category
GET /products/category/{category}

// Get single product details
GET /products/{id}
🧭 Screens & Navigation
Screen	Description
🏠 Home	Product grid with infinite scroll, category filters, and animated top navbar
🔍 Search	Live search with suggestions, recent searches, and paginated results
📦 Product Details	Full product information, image gallery, specs, reviews, and cart actions
🛒 Cart	Redux-powered cart with quantity controls, price calculation, and order confirmation
ℹ️ Info	App information, tech stack, and API details
🧠 State Management
Redux Toolkit is used with a clean, typed architecture:

typescript
// Custom typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
Redux Slices:
🛒 Cart Slice - Add/remove items, update quantities, clear cart

🔢 Counter Slice - Demo slice for Redux Toolkit setup

💾 Data Persistence
AsyncStorage is implemented for:

✅ Recent search history (last 5 searches)

✅ Cart state persistence across app restarts

✅ Cached behavior support

Data is automatically restored when:

App reopens from killed state

App comes back from background

Device is restarted

🔎 Search System
A robust search implementation with:

Feature	Implementation
🎯 Live Search	Real-time results as you type
💡 Search Suggestions	Popular and recent searches
📜 Recent History	Persistent storage of last 5 searches
⏱️ Debouncing	300ms delay to prevent excessive API calls
🛑 Request Cancellation	AbortController cancels pending requests
♾️ Pagination	Load more search results
🔄 State Management	Redux for cart, local state for search
📜 Pagination / Infinite Scroll
Implemented using limit + skip query parameters:

javascript
// Pagination logic
const LIMIT = 10;
const skip = page * LIMIT;
const url = `/products?limit=${LIMIT}&skip=${skip}`;
Features:

✅ FlatList onEndReached implementation

✅ Duplicate request prevention

✅ hasMore flag tracking

✅ Page counter management

✅ Loading guards

✅ Skeleton loaders for next page

⚡ Performance Optimizations
Optimization	Implementation
🖼️ FlatList	Efficient rendering of large lists
♾️ Pagination	10 items per request
🛑 Request Cancellation	AbortController for search
🎨 Memoized Styles	StyleSheet.create + useMemo
🧩 Component Splitting	Small, focused components
🪝 Custom Hooks	Isolated API logic
⏳ Skeleton Loaders	Shimmer effect during loading
🔄 useCallback	Memoized function references
🎯 useMemo	Computed value caching
🎨 Theming System
Light & Dark theme support with automatic device detection:

typescript
// ThemeContext.tsx
const { theme, isDark } = useAppTheme();
Features:

✅ Automatic system theme detection

✅ Real-time theme switching

✅ Navigation theme integration

✅ Theme-aware style factories

✅ No manual toggle needed

🧱 Project Structure
text
src/
├── 📁 components
│   ├── 📁 common          # Reusable Button, Icon, etc.
│   ├── 📁 HomeScreen      # ProductCard, Categories, RatingStars
│   ├── 📁 Loading         # Skeleton loaders, shimmer effects
│   ├── 📁 ProductDetails  # Gallery, specs, reviews, bottom actions
│   ├── 📁 Cart            # Order confirmation popup
│   └── 📁 TopNavBar       # Animated navigation bar
├── 📁 contexts            # ThemeContext, LoadingContext
├── 📁 endpoints           # API endpoint configurations
├── 📁 features            # Redux slices (cart, counter)
├── 📁 hooks              # Custom API hooks with AbortController
│   └── 📁 endpoints      # use_GET_PRODUCTS, use_GET_SEARCH, etc.
├── 📁 navigation         # RootNavigator, types
├── 📁 screens            # Home, Search, ProductDetails, Cart, Info
├── 📁 services          # Axios apiClient configuration
├── 📁 store             # Redux store configuration
├── 📁 styles            # Component-specific styles
└── 📁 theme             # Colors, navigation theme, types
🚀 How To Run The Project
Prerequisites
Node.js 18+

React Native CLI

Android Studio / Xcode

Watchman

1️⃣ Install Dependencies
bash
npm install
2️⃣ Install iOS Pods (First time only)
bash
cd ios && pod install && cd ..
3️⃣ Start Metro Bundler
bash
npm start
# or
npx react-native start --reset-cache
4️⃣ Run on Android
bash
npm run android
# or
npx react-native run-android
5️⃣ Run on iOS
bash
npm run ios
# or
npx react-native run-ios
🔧 Environment Configuration
Create a .env file in the root directory:

env
BASE_URL=https://dummyjson.com
Babel Configuration (babel.config.js):

javascript
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
TypeScript Declaration (src/env.d.ts):

typescript
declare module '@env' {
  export const BASE_URL: string;
}
🧪 Real-World Handling
Scenario	Implementation
⏳ Loading	Skeleton loaders with shimmer animation
❌ API Error	User-friendly error messages
📭 Empty State	Custom empty state components
🔄 Retry	Refresh capability on error
🛑 Request Race	AbortController cancellation
⚡ Safe Async	isMounted ref pattern
🛡️ Pagination Guards	Prevent duplicate calls
📱 Responsive	Platform-specific styling
🧠 Key Technical Decisions
Decision	Rationale
Redux Toolkit	Predictable global state, devtools, minimal boilerplate
Custom API Hooks	Separation of data fetching logic from UI
AsyncStorage	Lightweight persistence without Redux-persist complexity
FlatList + Pagination	Optimal performance for large datasets
ThemeContext	Custom solution to meet "no UI libraries" constraint
Endpoint Config	Centralized API management for maintainability
Modular Components	Reusable, testable, single-responsibility design
AbortController	Prevents memory leaks and race conditions
🔮 Improvements With More Time
🔄 Redux-persist - Full state persistence across restarts

📦 Offline Caching - IndexedDB or MMKV for offline-first experience

🧪 Unit & Integration Tests - Jest + React Native Testing Library

⌨️ Debounced Search Hook - Reusable useDebounce hook

🖼️ Image Optimization - FastImage with progressive loading

♿ Accessibility - Screen reader support, accessible labels

🌐 Network Retry - Exponential backoff for failed requests

🔽 Pull-to-Refresh - Refresh indicator for all lists

📊 Analytics - Screen views, user actions tracking

🚀 Code Push - Over-the-air updates
