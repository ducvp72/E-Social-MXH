const express = require('express');
const authRoute = require('./auth.route');
const authAdminRoute = require('./auth.admin.route');
const userRoute = require('./users.route');
const adminRoute = require('./admin.route');
const docsRoute = require('./docs.route');
const profileRoute = require('./profile.route');
const imageRoute = require('./image.route');
const postRoute = require('./post.route');
const fileRoute = require('./file.route');
const commentRoute = require('./comment.route');
const followRoute = require('./follow.route');
const findRoute = require('./find.route');
const messageRoute = require('./message.route');
const conversationRoute = require('./conversation.route');
const notificationRoute = require('./notification.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/profile',
    route: profileRoute,
  },
  {
    path: '/image',
    route: imageRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
  {
    path: '/file',
    route: fileRoute,
  },
  {
    path: '/comment',
    route: commentRoute,
  },
  {
    path: '/follow',
    route: followRoute,
  },
  {
    path: '/find',
    route: findRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/auth/admin',
    route: authAdminRoute,
  },
  {
    path: '/conversation',
    route: conversationRoute,
  },
  {
    path: '/message',
    route: messageRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
