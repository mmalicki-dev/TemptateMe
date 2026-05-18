import type { RequestHandler } from 'express';
import { User } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper('00052', req));
      return;
    }

    logger('00089', req.user!._id, getText('en', '00089'), 'Info', req);
    res.status(200).json({
      resultMessage: { en: getText('en', '00089'), tr: getText('tr', '00089') },
      resultCode: '00089',
      user,
    });
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
  }
};

export default getUser;

/**
 * @swagger
 * /auth/refresh:
 *    get:
 *      summary: Get User Info
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Auth
 *      responses:
 *        "200":
 *          description: The user information has gotten successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
