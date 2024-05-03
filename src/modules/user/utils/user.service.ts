import UserModel from './../schema/user.schema';
import { USER_ROLES } from '../../user/interface/role.interface';

import * as bcrypt from 'bcrypt';

class UserService {
  constructor() { }
  async signupUser(email: string, password: string, username: string): Promise<any> {

    const getUser = await UserModel.exists({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });
    if (getUser) {
      return {
        success: false,
        message: 'email or username already exsits'
      };
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);

    const createUser = await UserModel.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hash,
      salt,
      role: USER_ROLES.CUSTOMER,
    });

    return {
      success: true,
      message: 'create new user',
      data: createUser
    };
  }

  async getUserByEmail(email: string): Promise<any> {
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return {
        success: false,
        data: {}
      };
    }
    return {
      success: true,
      data: getUser
    };
  }

  async createAgent() { }
  async getAgent() { }
  async getAgentById() { }
  async updateAgentById() { }


  async createCustomer() { }
  async getCustomer() { }
  async getCustomerById() { }
  async updateCustomer() { }



  async createWriter() { }
  async getWriter() { }
  async getWriterById() { }
  async updateWriter() { }
}

export default UserService;