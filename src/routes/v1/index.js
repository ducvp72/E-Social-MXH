const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const profileRoute = require('./profile.route');
const imageRoute = require('./image.route');
const postRoute = require('./post.route');
const videoRoute = require('./video.route');
const audioRoute = require('./audio.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [{
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
        path: '/video',
        route: videoRoute,
    },
    {
        path: '/audio',
        route: audioRoute,
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