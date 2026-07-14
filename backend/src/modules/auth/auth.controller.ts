import { Request, Response, NextFunction } from "express";
import { loginSchema, signupSchema } from "./auth.schema.js";
import { loginService, signupService } from "./auth.service.js";
import { sendResponse } from "../../shared/utils/response.js";
import { AuthRequest } from "./auth.middleware.js";
//signup controller
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = signupSchema.parse(req.body);

    const { user, token } = await signupService(data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendResponse(
      res,
      201,
      "Account created successfully",
      user
    );
  } catch (error) {
    next(error);
  }
};


//login controller
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);

    const { user, token } = await loginService(data);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendResponse(
      res,
      200,
      "Login successful",
      user
    );
  } catch (error) {
    next(error);
  }
};
//auth controller
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};