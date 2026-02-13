# 📱 QuickCart – React Native Product App

QuickCart is a production-style React Native mobile app built with **React Native CLI + TypeScript** to demonstrate scalable architecture, Redux state management, API handling, search, pagination, persistence, and lifecycle awareness.

This project focuses on real-world structure and performance rather than UI styling.

## APP LINK : https://drive.google.com/file/d/1koChGfGp_B21z5D68HmM3sq-MyOfeuhr/view?usp=drive_link
---

## 🚀 Features

- React Native CLI (No Expo)
- TypeScript with full type safety
- Functional components with React Hooks
- Redux Toolkit for global state management
- Multi-screen navigation
- Large product dataset from public API
- Search with debouncing
- Infinite scroll / pagination
- Category filtering
- Cart management with Redux
- AsyncStorage persistence (cart + recent searches)
- App lifecycle handling (restore after restart/background)
- Loading, error, and empty states
- No third-party UI libraries (core RN components only)

---

## 🌐 API Used

Public DummyJSON products API:

https://dummyjson.com/products

Supports:
- Product list with pagination
- Search
- Category filter
- Product details

---

## 🧱 Project Structure (Simplified)

src/
- components/ → reusable UI pieces
- screens/ → app screens
- navigation/ → stack navigator
- store/ → Redux store
- features/ → Redux slices
- hooks/ → custom API hooks
- services/ → axios client
- theme/ → theming system
- contexts/ → theme & loading context

---

## ⚙️ Tech Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Navigation
- Axios
- AsyncStorage

---

## ▶️ How To Run

### Prerequisites

- Node.js 18+
- React Native CLI
- Android Studio / Xcode
- Watchman (macOS)

### Install dependencies

```bash
npm install
```

### iOS pods (first time only)

```bash
cd ios && pod install && cd ..
```

### Start Metro

```bash
npm start
# or
npx react-native start --reset-cache
```

### Run Android

```bash
npm run android
# or
npx react-native run-android
```

### Run iOS

```bash
npm run ios
# or
npx react-native run-ios
```

---

## 🔧 Environment Setup

Create `.env` file:

```env
BASE_URL=https://dummyjson.com
```

babel.config.js:

```js
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
```

env.d.ts:

```ts
declare module '@env' {
  export const BASE_URL: string;
}
```

---

## 🧠 Key Decisions

- Redux Toolkit for predictable global state
- Custom hooks for API logic separation
- FlatList + pagination for performance
- AsyncStorage for lightweight persistence
- Modular component architecture
- AbortController for request cancellation

---

## 🔮 Future Improvements

- Redux Persist
- Offline caching
- Unit tests
- Accessibility support
- Pull-to-refresh
- Analytics tracking
- OTA updates

---

## 📦 Repository

GitHub: https://github.com/ruchirabh/QuickCart
