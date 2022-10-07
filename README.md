# blueDimond

# Demo

[Demo Video](https://user-images.githubusercontent.com/37613252/194440644-c41c23c4-f84d-419e-bcca-6797fb8fd98d.mp4)

This is a basic React Native app that hits the NYT APIs via a local server, featuring redux state management, search for articles with infinite scroll pagination, token authentication with in-place refresh and more!

## Requirements

This project is build using React Native 69.3.
Node 13 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

# Installation

## Server

1. Clone this repository
2. Open Terminal/CMD and cd server
3. Type `npm install`

## Client

1. `cd testAssaignment`
2. Type `npm install`
3. Start metro `npx react-native start`
4. - for Android type `npx react-native run-android`
   - for iOS `cd ios` then `pod install`

# Running The Application

** Very important **

Before starting, make sure to edit the .env file in `testAssaignment` and add your machine IP4 address instead.

- [axios-in-react-native-not-calling-server-in-localhost](https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost)

- Two Terminal/CMD windows are required to run the application.
- To run the server type `cd server` then `npm run start-auth` -- This will not register the changes untill the rerun of the server!
  To run the server while saving changes (recommneded)
  --install `sudo npm install -g --force nodemon`
  then you can start the server while listening on changes (like user regestration) by running the server through `nodemon server.js`
- o to second Terminal window and type `npm start`

DONE!

### Testing

Tit `npm test -- --coverage`

### Some limitations

- This app was build for the purpose of demonstration and may contain some bugs, feel free to reporst them.
- I'm using a free Key from NYT so there's a quota per day and it might affect the fast infinite scroll.
- The Server needs a listerner to registred changes, so a SignUp data save needs a server reboot! (solved above).
