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