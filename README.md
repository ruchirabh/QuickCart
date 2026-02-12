📱 QuickCart – React Native Product App

app Link : https://drive.google.com/file/d/1koChGfGp_B21z5D68HmM3sq-MyOfeuhr/view?usp=drive_link

A production-style React Native mobile application built using React Native CLI + TypeScript that demonstrates scalable architecture, API data handling, Redux state management, search, pagination, persistence, and lifecycle awareness.

This project was built as part of a React Native Fresher Technical Evaluation Task focusing on code quality, performance, and real-world app structure rather than UI styling.

🚀 Features Implemented
✅ Core Requirements Covered

✅ React Native CLI (not Expo)

✅ TypeScript

✅ Functional components + React Hooks

✅ Redux Toolkit for state management

✅ Multiple screens with proper navigation

✅ Large dataset loaded from public API

✅ Search functionality

✅ Category filtering

✅ Infinite scroll pagination

✅ Local data persistence (restored after restart)

✅ App lifecycle handling

✅ Loading + error handling states

✅ No third-party UI libraries (only core RN components)

🌐 Public API Used

Data is powered by DummyJSON public APIs:

https://dummyjson.com/products


APIs used:

Products list API

Search API

Category products API

Product details API

Examples:

/products
/products/search?q=phone
/products/category/smartphones
/products/{id}

🧭 Screens

🏠 Home Screen — Product list with infinite scroll + categories

🔍 Search Screen — Search + suggestions + filtered results

📦 Product Details Screen — Detailed product view

🛒 Cart Screen — Redux-based cart state

ℹ️ Info Screen — App + API information

🧠 State Management

Redux Toolkit is used for:

Cart state

Product selection

Global app state slices

Predictable updates

Avoiding prop drilling

Custom typed Redux hooks are implemented:

useAppDispatch
useAppSelector

💾 Data Persistence

Local storage is implemented using:

AsyncStorage


Used for:

Recent searches

Cached behavior support

State restoration after app restart

This ensures data is restored when:

App reopens

App comes from background

App was killed and relaunched

🔎 Search System

Includes:

Live search API integration

Search suggestions

Recent search history

Suggestion caching

Debounced request pattern

AbortController cancellation support

📜 Pagination / Infinite Scroll

Implemented using:

limit + skip query params


Handled via:

FlatList onEndReached

Loading guards

hasMore flags

Page tracking

Duplicate request prevention

⚡ Performance Considerations

FlatList used for large lists

Infinite scroll pagination

Request cancellation

Memoized styles

Component-level separation

Custom hooks for API logic

Skeleton loading components

Avoided unnecessary re-renders

🎨 Theming

Light & Dark theme support

ThemeContext based system

Navigation theme integration

Theme-aware styles

🧱 Project Structure
src/
├── components
├── contexts
├── endpoints
├── features (Redux slices)
├── hooks (API hooks)
├── navigation
├── screens
├── services
├── store
├── styles
├── theme


Architecture focuses on:

Separation of concerns

Reusable components

API hooks isolation

Scalable folder design

▶️ How To Run The Project
1️⃣ Install dependencies
npm install

2️⃣ Start Metro
npm start

3️⃣ Run Android
npm run android

4️⃣ Run iOS

First time only:

cd ios
pod install
cd ..


Then:

npm run ios

🔧 Environment Config

Environment-based API config:

BASE_URL=https://dummyjson.com


Endpoints are built using a centralized config file.

🧪 Real-World Handling Implemented

Loading states

Skeleton loaders

API error handling

Empty states

Retry-safe requests

AbortController support

Safe async flows

Guarded pagination calls

🧠 Key Technical Decisions

Redux Toolkit chosen for predictable global state

Custom API hooks for separation of data logic

AsyncStorage used for persistence without heavy libraries

FlatList + pagination for performance

ThemeContext instead of UI libraries to meet constraints

Endpoint config centralization for maintainability

Modular component design for reuse

🔮 Improvements With More Time

Redux-persist integration

Offline caching layer

Unit & integration tests

Debounced search input hook

Image caching optimization

Better accessibility support

Network retry strategy

Pull-to-refresh for lists
