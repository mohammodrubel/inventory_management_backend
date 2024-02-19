import httpStatus from 'http-status'
import AppError from '../error/AppError'
import { T_login_type, T_registration_type } from '../interface/auth_interface'
import { Registration } from '../model/auth_model'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

const userRegisterService = async (payload: T_registration_type) => {
  const result = await Registration.create(payload)
  return result
}
const getAllUsersService = async () => {
  const result = await Registration.find({})
  return result
}

const loginService = async (payload: T_login_type) => {
  try {
    const user = await Registration.findOne({ email: payload.email });

    // If user not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // If user is marked as deleted, throw an error
    if (user.isDeleted) {
      throw new Error('User already deleted');
    }

    // If user is blocked, throw an error
    if (user.status === 'blocked') {
      throw new Error('User is blocked');
    }

    // Check if password matches
    const matchedPassword = await bcrypt.compare(payload.password, user.password);

    if (!matchedPassword) {
      throw new Error('Password does not match');
    }

    // Construct JWT payload
    const jwtPayload = {
      email: user.email,
      status: user.status,
      role: user.role,
      isDeleted: user.isDeleted,
    };

    // Sign access and refresh tokens
    const accessToken = jwt.sign(jwtPayload, config.access__token as string, { expiresIn: config.accessToken__time as string });
    const refreshToken = jwt.sign(jwtPayload, config.refresh__token as string, { expiresIn: config.refreshToken__time as string });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials. Please check your email and password.');
  }
}


const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not Authorized')
  }
  // check token is verify
  const decoded = jwt.verify(
    token,
    config.refresh__token as string,
  ) as JwtPayload
  const { email } = decoded
  const user = await Registration.findOne({ email: email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }
   // checking user deleted
   const isDeleted = user?.isDeleted
   if (isDeleted) {
     throw new AppError(httpStatus.FORBIDDEN, 'this user is Deleted!')
   }
   //check status
  const status = user?.status
  if (status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already Blocked!')
  }
 //create token and send to user
 const jwtPayload = {
    email: user?.email,
    status: user?.status,
    role: user?.role,
    isDeleted: user?.isDeleted,
  }
  const accessToken = jwt.sign(jwtPayload, config.access__token as string, {
    expiresIn: config.accessToken__time as string,
  })

  return {
    accessToken
  }
}

export const RegisterService = {
  userRegisterService,
  getAllUsersService,
  loginService,
  refreshTokenService,
}
