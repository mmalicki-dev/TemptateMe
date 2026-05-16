import type { Request } from 'express';
import logger from '../logger.js';
import en from '../lang/en.js';
import tr from '../lang/tr.js';

export default function errorHelper(
  code: string,
  req: Request,
  errorMessage?: string,
): { resultMessage: { en: string; tr: string }; resultCode: string } {
  const key = en[code] ? code : '00008';
  const userId = req?.user?._id ?? '';
  const enMessage = en[key];
  const trMessage = tr[key];

  if (enMessage.includes('server error')) {
    logger(code, userId, errorMessage ?? enMessage, 'Server Error', req);
  } else {
    logger(code, userId, errorMessage ?? enMessage, 'Client Error', req);
  }

  return {
    resultMessage: { en: enMessage, tr: trMessage },
    resultCode: code,
  };
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       properties:
 *         resultMessage:
 *           $ref: '#/components/schemas/ResultMessage'
 *         resultCode:
 *           $ref: '#/components/schemas/ResultCode'
 *     ResultMessage:
 *       type: object
 *       properties:
 *         en:
 *           type: string
 *         tr:
 *           type: string
 *     ResultCode:
 *       type: string
 */
