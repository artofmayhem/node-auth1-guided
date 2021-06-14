const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const Store = require('connect-session-knex')(session)

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
server.use(session({
  name: 'foo',
  secret: 'keep it secret', // .env file
  cookie: {
    maxAge: 1000 * 60,
    secure: false, // if true, only works over TLS/https
    httpOnly: false, // if true, cookie not in document
  },
  resave: false, // required by some session stores
  saveUninitialized: true // session not saved automatically
}));
server.use(helmet());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res) => {
  res.status(404).json({ message: 'not found!' })
});

module.exports = server;
