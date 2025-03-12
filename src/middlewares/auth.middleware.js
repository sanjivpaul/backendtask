import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).send({
        message: "Unauthorized request",
      });
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // const user = await User.findByPk(decodeToken?.id, {
    //   attributes: { exclude: ["password", "refreshToken"] },
    // });

    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401).send({
        message: "Invalid Access Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Verify error",
      error: error,
    });
  }
};
