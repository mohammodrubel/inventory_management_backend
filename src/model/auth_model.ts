import { Schema, model } from 'mongoose'
import { T_registration_type } from '../interface/auth_interface'
import AppError from '../error/AppError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'

const registrationSchema = new Schema<T_registration_type>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, 'Password must be at least 5 characters long'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
)

registrationSchema.pre('save', async function (next) {
  try {
    const slatRound = 10
    this.password = await bcrypt.hash(this.password, slatRound)
  } catch (error: any) {
    const errorMessage = 'Error hashing password'
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR
    throw new Error(`${statusCode}: ${errorMessage}`)
  }
})

registrationSchema.pre('save', async function (next) {
  try {
    const isExistUser = await Registration.findOne({
      email: this.email,
    })
    if (isExistUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This email is already in use. Please try another email.',
      )
    }
    next()
  } catch (error: any) {
    next(error)
  }
})

export const Registration = model<T_registration_type>(
  'registration',
  registrationSchema,
)
