# React Native Store

This is a simple React Native application for a store

## Getting Started

Follow the instructions below to set up and run the app

### Prerequisites

- Node.js installed on your system.
- React Native CLI or Expo CLI installed.
- Android Studio or Xcode for running the app on an emulator.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-native-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the Metro bundler:
   run npx expo

2. Run the app on an Android emulator:

   ```bash
   npx react-native run-android
   ```

   Or on an iOS simulator:

   ```bash
   npx react-native run-ios
   ```

### Troubleshooting

- Ensure your emulator or physical device is properly set up and has expo go installed in it
- Check for any missing dependencies or errors in the terminal.

## documentation

- I have left comments all around project to explain decisions or technics used
- I used nativewind for styling this app but in some reactNative containers like scroll view
  you need to style it with css , ususally you want to be consistent in the styling ways so the code becomes clearer
  and more understandable for others
  -to handle HTTP requests and manage API calls efficiently. Axios provides a clean and concise way to work with promises, making the code easier to read and maintain.
- since fakestore api doesn't have roles to the users (as admin or just user), authentication was the only way to handle if you can edit
  or delete a product. in normal world scenarios we would have roles to decide wether you can edit a product or not
- and fakestore api does not return a token for the user when creating a user to i had to simulate the token with the id returned to persist the authentication state
- i have used reusable components with props to ensure continuity
- some functions are added but not implemented yet as in setting darkmode for the app
