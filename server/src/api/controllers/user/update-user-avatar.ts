import type { RequestHandler } from "express";
import fs from "node:fs/promises";
import imgbbUploader from "imgbb-uploader";
import { errorHelper, getText } from "../../../utils/index.js";
import { imageApiKey } from "../../../config/index.js";
import { tmpDir } from "../../middlewares/index.js";
import { getUserById } from "./helpers.js";

const updateUserAvatar: RequestHandler = async (req, res) => {
  try {
    const user = await getUserById(req.user!._id);
    if (!user) {
      res.status(404).json(errorHelper("00052", req));
      return;
    }

    if (!req.file) {
      res.status(400).json(errorHelper("00008", req, "Image not uploaded."));
      return;
    }

    try {
      const image = await imgbbUploader(
        imageApiKey,
        `${tmpDir}${req.file.originalname}`,
      );
      user.photoUrl = image.url;
    } catch (uploadErr) {
      res
        .status(400)
        .json(errorHelper("00008", req, (uploadErr as Error).message));
      return;
    }

    await user.save();

    res.status(200).json({
      resultMessage: { en: getText("en", "00113") },
      resultCode: "00113",
      user,
    });
  } catch (err) {
    res.status(500).json(errorHelper("00008", req, (err as Error).message));
  } finally {
    if (req.file?.path) fs.unlink(req.file.path).catch(() => {});
  }
};

export default updateUserAvatar;

/**
 * @swagger
 * /user/avatar:
 *    put:
 *      summary: Update user avatar
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: formData
 *          name: avatar
 *          required: true
 *          schema:
 *            type: file
 *          description: Image file here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your profile information was changed successfully.
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
 *        "400":
 *          description: Image upload failed.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
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
