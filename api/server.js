const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const Store = require('connect-session-knex')(session);

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
server.use(session({
  name: 'foo', //default session name is sid
  secret: 'keep it secret', // .env file
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // if true, only works over TLS/https use for production
    httpOnly: true, // if true, cookie not in document
  },
  resave: false, // required by some session stores
  saveUninitialized: true, // session not saved automatically CDPR laws against setting cookies automatically
  store: new Store({
    knex: require('../database/db-config'),
    tableName: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  })
}));
server.use(helmet());
server.use(express.json());
//server.use(session(sessionConfig)) //would be used to set session variables if not passing the whole thing in
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res) => {
  res.status(404).json({ message: 'not found!' })
});

module.exports = server;
