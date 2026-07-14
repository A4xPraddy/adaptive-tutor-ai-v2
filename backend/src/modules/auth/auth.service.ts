import bcrypt from "bcrypt";
import { generateToken } from "../../shared/utils/jwt.js";
import { AUTH_MESSAGES } from "./auth.constants.js";
import {
  createUser,
  findUserByEmail,
  findUserWithPasswordByEmail,
} from "./auth.repository.js";

import type { SignupInput, LoginInput } from "./auth.schema.js";

export const signupService = async (data: SignupInput) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
};

export const loginService = async (data: LoginInput) => {
  const user = await findUserWithPasswordByEmail(data.email);

  if (!user) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    token,
  };
};