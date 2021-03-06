# Quit smoking calculator

Quit smoking calculator is a fullstack MERN MVP application used to set goals to help you quit smoking by visualizing savings. The client is based in React.js using Material UI components.

## Server code

Server code can be found at https://github.com/TKravel/quit-calc-server

## Installation

From the root level of the working directory run

```bash
npm install
```

Create a .env file in the root directory. Add a variable with the base location of the server

```javascript
REACT_APP_SERVER = 'Location server code is being served from';
```

To start the client run

```bash
npm start
```

In a second terminal opened to the server code run the following to start the server

```bash
node index.js
```

## Requirements

Parent helper connects to MongoDb Atlas. Free shared accounts can be created at https://www.mongodb.com/cloud/atlas.

## In quit-calc-server

Create a .env file which will require the following enviroment variables

```javascript
DBUSER = 'Your Mongo Atlas clusters username';
DBPASS = 'The users password';
DBNAME = 'The database name';
JWT_SECRET = "A unique secret for signing and decoding JWT's";
ORIGIN_SITE = 'Address client is hosted at';
```

## Todo

-   [] Design UI
-   [] Remove completed goal amount from savings total
-   [] Show savings already used on goals

## Demo

A working demo can be found at https://condescending-boyd-227f42.netlify.app/
