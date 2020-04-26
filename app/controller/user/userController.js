import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import UserRepository from '../../repositories/user';
import config from '../../config';
import { hashPassword, randomStringGenerator } from '../../libs/utilities';
import { textTemplate, htmlTemplate, resetTextTemplate, resetHtmlTemplate } from './helpers';
import EmailTransport from '../../libs/email';

export class User {
  constructor(user) {
    Object.keys(user).forEach(key => this[key] = user[key]);
  }

  toJson() {
    const { password, ...rest } = this;
    return rest;
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password)
  }

  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
        ...this.toJson(),
      },
      config.secret,
    )
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error }
      }
      return new User(res)
    })
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserRepository.getInstance().findOne({ email });
  if (!user) {
    return next({ error: 'email not found', message: 'Please sign up before login or provide correct email', status: 400 });
  }
  const userObject = new User(user);
  const passwordMathced = await userObject.comparePassword(password)
  if (!passwordMathced) {
    return next({ error: 'password not matched', message: 'Please provide correct password', status: 400 });
  }

  return res.status(200).send({ token: userObject.encoded(), userInfo: userObject.toJson() });
}

const verify = (req, res) => {
  const { user } = req;
  const userObject = new User(user);

  res.send(userObject.toJson())
}

const create = async (req, res, next) => {
  let sent = false;
  try {
    const { body } = req;
    const password = randomStringGenerator();
    const saltedPassword = await hashPassword(password)
    const userObject = {
      ...body,
      password: saltedPassword
    }
    await UserRepository.getInstance().create(userObject);
    addNewUserEmail({
      ...userObject,
      password,
      host: req.get('host'),
    });
    sent = true;
    return res.send('User Created Successfully');
  } catch (err) {
    console.log(":::::", err)
    if (!sent) {
      return next({ code: 500, message: "Some Error Occured" })
    }
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const user = await UserRepository.getInstance().findById(id);
    if (!user || (user && user.admin)) {
      return next({ status: 403, message: 'Cannot delete this user' })
    }
    await UserRepository.getInstance().delete(id);
    return res.send('User Deleted successfully');
  } catch (err) {
    console.log(":::", err);
    return next({ status: 500, message: "Something Went Wrong" })
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const user = await UserRepository.getInstance().getById(id);
    console.log(":::", user, id);
    if (!user || (user && user.isAdmin)) {
      return next({ status: 403, message: 'Cannot Reset password for this user' })
    }
    const password = await randomStringGenerator();
    const saltedPassword = await hashPassword(password);
    await UserRepository.getInstance().update(id, { password: saltedPassword });
    resetPasswordEmail({
      ...user,
      host: req.get('host'),
      password,
    })
    return res.send("Password Updated Successfully");
  } catch (err) {
    console.log(":::", err);
    return next({ status: 500, message: "Something Went Wrong" })
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { user, body: { password } } = req;
    const saltedPassword = await hashPassword(password);
    await UserRepository.getInstance().update(user._id, { password: saltedPassword });
    return res.send("Password Reset Successfuly")
  } catch {
    return next({ status: 500, message: "Something Went Wrong" })
  }
}

const addNewUserEmail = async user => {
  const emailConfig = {
    to: user.email,
    text: textTemplate(user),
    html: htmlTemplate(user),
    subject: `Registration Complete to ${user.host}`
  }
  console.log(":::", emailConfig)
  const a = await EmailTransport.getInstance().send(emailConfig);
  console.log(":::", a)
}

const resetPasswordEmail = (user) => {
  const emailConfig = {
    to: user.email,
    from: 'mhtdang94@gmail.com',
    text: resetTextTemplate(user),
    html: resetHtmlTemplate(user),
    subject: `Password Reset`
  }
  EmailTransport.getInstance().send(emailConfig);
}

const list = async (req, res, next) => {
  const list = await UserRepository.getInstance().list({ isAdmin: false }, {
    name: 1, email: 1, isAdmin: 1, notification: 1
  });
  console.log(":::::", list);
  return res.send(list);
}

export default { login, verify, create, deleteUser, resetPassword, list, changePassword }; 