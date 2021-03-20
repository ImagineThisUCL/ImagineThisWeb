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
$ npm install  OR  $ yarn install
```
and then use 
```bash
$ npm start  OR  $ yarn start
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
<br/>



## To run the whole ImagineThis System on your local environment:

If you want the entire ImagineThis system to be run in your local environment, including the front-end, back-end and databases. You need to follow the instructions below:
1. Access the ImagineThis repositories: 
+ [ImagineThisWeb - front-end](https://github.com/ImagineThisUCL/ImagineThisWeb)
+ [ImagineThisServer - server](https://github.com/ImagineThisUCL/ImagineThisServer) 
+ [ImagineThisDatabase - database](https://github.com/ImagineThisUCL/ImagineThisDatabase)

2. Clone these above repositories to your local device. 
3. Follow the instrcutions specified in the README file to run both front-end, back-end and database at the same time
4. Access [http://localhost:3000](http://localhost:3000) to view the pages and do the further development