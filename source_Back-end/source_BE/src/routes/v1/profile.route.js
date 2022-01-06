const express = require('express');
const validate = require('../../middlewares/validate');
const { profileValidation } = require('../../validations');
const profileController = require('../../controllers/profile.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
const fileMiddleware = require('../../middlewares/fileMiddleware');

router.put('/changeAvatar',  auth(''), fileMiddleware.uploadImage, profileController.changeAvatar);
router.put('/change-profile', auth(''), validate(profileValidation.changeProfile), profileController.changeProfile);
router.get('/:id', validate(profileValidation.findProfileById), profileController.findProfileById);
router.put('/change-password', auth(''), validate(profileValidation.resetPassword), profileController.resetPassword);
router.get('/get-summary/:id', validate(profileValidation.getSummary), profileController.getSummary);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Edit profile user
 */

/**
 * @swagger
 * /profile/changeAvatar:
 *   post:
 *     summary: change profile avatar
 *     description: change profile avatar
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *          content:
 *              image/png:
 *                  schema:
 *                      type: string
 *                      format: binary
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /profile/change-profile:
 *   post:
 *     summary: Change profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - birthday
 *               - gender
 *               - phone
 *               - facebook
 *               - story
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: must be >5 and <30
 *               birthday:
 *                 type: date
 *                 formate: date
 *                 description: age must be >13
 *               gender:
 *                 type: string
 *                 formate: string
 *                 description: must be male,female,other
 *               phone:
 *                 type: string
 *                 format: telephone number
 *                 description: must be telephone number
 *               facebook:
 *                 type: string
 *                 format: url
 *                 description: must be url
 *               story:
 *                 type: string
 *                 format: string
 *                 description: must be larger <=150
 *             example:
 *               fullname: fake name
 *               birthday: 01/12/2000
 *               gender: male
 *               phone : "0645560204"
 *               facebook: https://www.facebook.com/
 *               story: 1+1 = 2
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
