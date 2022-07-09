# Webapp 'Giggles'

## Table of contents

1. Introduction
2. Issue and solution
3. Starting the application 
4. Using the application
5. Testing

## 1. Introduction

This project is the result of the final assignment for module frontend,
with the goal of demonstrating that I have sufficient skills in HTML, CSS, JavaScript and React.

The project was set up with the npx command Create React App.

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/Gigglerpage.png" width="500" />

## 2. Description of the issue, and it's solution

The best way to solve a problem is to see the humor, and just have a good laugh.
With all the misery concering Corona, the news reports about The Voice of Holland and the recent
war in Ukraine (to point out a few depressing news items), people need some light-hearted entertainment.
Humor can help in difficult situations, for example as an icebreaker or to relieve sadness.
An additional effect of humor is laughter, which in turn triggers the production of chemicals in our brain that act as
an antidepressant.
I have made an app that can generate funny (and bad) jokes to put a smile on the reader's face.
Jokes may also be offered, with the aim of making other users laugh.
The app uses the JokeAPI backend to GET en POST jokes.
The purpose of the web app is to make people happy, to make them smile and to forget about any worries for a while.

## 3. Starting the application

To install the application on your local machine, navigate
to https://github.com/EvadeJong/integrale-eindopdracht-frontend.
Select the green 'code' button, and copy the SSH, HTTPS or Github CLI url.

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/Github.png" width="700" />
Import the application in Webstorm via tab 'Git' --> Clone (or tab 'VCS' --> Get from version control).
Use the copied url, and select a directory in which you would like to place the application.

Once imported, install the node_modules by running the following commands in the terminal:
npm install

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/NpmInstall.png" width="600" />

Once the install of node_modules is completed, run the following command in the terminal:
npm run build

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/NpmRunBuild.png" width="600" />

To create an optimal production build
You start the application by using:
npm start

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/NpmRunStart.png" width="600" />

Open http://localhost:3000 to view the page in the browser. (Localhost can also run on a different port, if you configure it that way).

## 4. Using the application
On first visit, you can only visit the home, register and contact pages.
There are no predefined accounts, instead register using the register button on the page or the login link in the navbar.
Once you have registered successfully, you are able to log in and use all functionality.

## 5. Testing
The unit tests are located in the project directories of components that are tested.
E.g. the App.test.js file.
To run the tests, run the following command in the terminal:

npm run test

<img src="https://github.com/EvadeJong/frontend-integrale-eindopdracht/blob/main/src/assets/images/NpmRunTest.png" width="600" />

A directory will be created showing the code coverage results, using the lcov reporter.
