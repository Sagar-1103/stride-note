# Mini Project To-Do App

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sagar-1103/stride-note
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start the development server**

   ```bash
   npm run start
   ```
4. **Run on your device**

   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal to open in browser

## 🧪 Development Challenges & Solutions

### 1. **State Management Complexity**

**Challenge**: Managing nested state (projects containing tasks).

**Solution**:

- Implemented React Context with useReducer
- Created separate contexts for projects and theme to avoid unnecessary re-renders
- Used immutable update patterns to prevent state mutation bugs

### 2. **Navigation Architecture**

**Challenge**: Implementing clean navigation between projects list and individual project details while maintaining state.

**Solution**:

- Used Expo Router with typed routes for type-safe navigation
- Implemented tab based primary navigation with stack navigation for details

### 4. **Theme System Implementation**

**Challenge**: Creating a generalized theme system that works across all components.

**Solution**:

- Built centralized color system with light/dark variants
- Used React Context for theme state with memoized values

## 🚀 Future Improvements

### 📈 Features

- **Project Categories**: Organize projects into categories (Work, Personal, etc.)
- **Due Dates**: Add deadline tracking for tasks and projects
- **Search & Filter**: Find projects and tasks quickly
- **Statistics**: Completion rates, productivity insights
- **Notifications**: Reminders for upcoming deadlines
