import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import UserRepository from '../../repositories/user';
import config from '../../config';

export class User {
  constructor({ name, email, password,  isAdmin, _id }) {
    this._id = _id
    this.name = name
    this.email = email
    this.password = password
    this.isAdmin = isAdmin
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
	if (!userObject.comparePassword(password)) {
		return next({ error: 'password not matched', message: 'Please provide correct passoword', status: 400 });
	}

	return res.status(200).send({ token: userObject.encoded(), userInfo: userObject.toJson() });
}

const verify = (req, res) => {
	const { user } = req;
	const userObject = new User(user);

	res.send(userObject.toJson())
}

export default { login, verify }; 