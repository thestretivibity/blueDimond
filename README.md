# blueDimond

# Demo

This is a basic React Native app that hits the NYT APIs via a local server, featuring redux state management, search for articles with infinite scroll pagination, token authentication with refresh and more!

## Requirements

This project is build using React Native 69.3.
Node 13 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

# Installation

## Server

1. Clone this repository
2. Open Terminal/CMD and cd server
3. type `npm install`
   done!

## Client

1. cd testAssaignment
2. type `npm install`
3. start metro `npx react-native start`
4. - for Android type `npx react-native run-android`
   - for iOS `cd ios` then `pod install`

# Running the application

==Very important==
Before starting, make sure to edit the .env file in `testAssaignment` and add your machine IP4 address instead.

- [axios-in-react-native-not-calling-server-in-localhost](https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost)

Two Terminal/CMD windows are required to run the application.
To run the server type `cd server` then `npm run start-auth`
Go to second Terminal window and type `npm start`

DONE!

### Some limitations

This app was build for the purpose of demonstration and may contain some bugs, feel free to reporst them.
I'm using a free Key from NYT so there's a quota per day and it might affect the fast infinite scroll.
