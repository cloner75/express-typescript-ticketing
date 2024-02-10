import UserModel from './../schema/user.schema';

class UserService {
  async getUserByEmail(email: string) {
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

  async createAgent(){}

  async getAgent(){}

  async getAgentById(){}

}

export default UserService;