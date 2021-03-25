# Imagine This Web Frontend
[![CircleCI](https://circleci.com/gh/ImagineThisUCL/imaginethisweb.svg?style=shield&circle-token=27d147dd173387718d5e753769982df6147f014e)](https://app.circleci.com/pipelines/github/ImagineThisUCL)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Access Token && OAuth 2.0 Authentication:
See this [link](https://www.figma.com/developers/api#access-tokens) to learn how to get Access tokens.
See this [link](https://www.figma.com/developers/api#oauth2) to learn how to use OAuth.

If the app notices you that "the token or the project ID is not correct" please check again and make sure that your [ImagineThisServer](https://github.com/ImagineThisUCL/ImagineThisServer) is running before you submit the tokens.

## Quick Start Guide
If it's your first time running this project, you should install all dependencies first:
```bash
$ npm install  
```
and then use 
```bash
$ npm start 
```
to start the app.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.




## To run the whole ImagineThis System on your local environment:

If you want the entire ImagineThis system to be run in your local environment, including the front-end, back-end and databases. You can access the [ImagineThis system repository](https://github.com/ImagineThisUCL/ImagineThisSystem) and follow the instructions there.

## Env Variables Configuration
In order to adhere to the changes that the whole ImagineThisSystem are going to deployed using Docker, the front-end now needs to get some configuration value from the system envaribles. For development process though, you can create a `.env` file in the root folder to specify the env variables instead of changing and updating the actual env variable settings on you local machine.

These are the env variables that you need to configure:
```
# Address that your application will runs on.
# For development environment, simply set it to the development server address (http://localhost:3000 by default)
REACT_APP_DOMAIN="" 
# These two env variables are related to the Oauth functionality.
# See [Figma official guide on Oauth](https://www.figma.com/developers/api#oauth2) for more information.
REACT_APP_CLIENT_ID=""
REACT_APP_CLIENT_SECRET=""
# This env variable should be set to the backend API server address. For more information check the ImagineThisServer repo.
# If the backend server is running locally, the default server address should be http://localhost:8080
REACT_APP_BACKEND_ADDRESS=""
```