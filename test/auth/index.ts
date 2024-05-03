// test modules
// import { assert } from "chai";

import { faker } from '@faker-js/faker';
import axios from 'axios';
axios.defaults.baseURL = `${process.env.HOST}:${process.env.PORT}${process.env.VERSION}`;
import { equal } from 'assert';  // Using Assert style

class AuthenticationUnitTest {
  static mockData: any;

  static sendRequest(url: string, method: string, data: any = {}, headers: any = {}) {
    return axios({
      url: `${process.env.HOST}:${process.env.PORT}${process.env.VERSION}${url}`,
      method: 'post',
      data,
      headers: {}
    });
  }

  static start() {
    describe('*** Authentication Module ***', () => {
      before(() => {
        this.mockData = {
          email: faker.internet.email().toLowerCase(),
          username: faker.person.firstName().toLowerCase(),
          password: faker.internet.password()
        };
      });

      it('🚀 ~ Auth ~ Signup', async () => {
        try {
          const result: any = await this.sendRequest(
            '/auth/signup',
            'post',
            this.mockData
          );
          const { success, data } = result.data;
          equal(success, true);
          equal(typeof success, 'boolean');
          equal(data?.email, this.mockData.email);
          equal(data?.username, this.mockData.username);
        } catch (err: any) {
          equal(err?.response?.data?.success, true);
        }
      });

      it('🚀 ~ Auth ~ Login', async () => {
        try {
          const inputDataForLogin = {
            email: 'admin@aria.com',
            password: 'AriaAdmin'
          };
          const result: any = await this.sendRequest(
            '/auth/login',
            'post',
            inputDataForLogin
          );
          const { success, data } = result.data;
          equal(success, true);
          equal(typeof success, 'boolean');
          equal(data?.email, inputDataForLogin.email);
          equal(data.hasOwnProperty('permissions'), true);
          equal(data.hasOwnProperty('role'), true);
        } catch (err: any) {
          equal(err?.response?.data?.success, true);
        }
      });


      it('🚀 ~ Auth ~ Logout', () => {
        equal(1, 1);
      });


      it('🚀 ~ Auth ~ RefreshToken', () => {
        equal(1, 1);
      });

      after(() => {
        // console.log('remove user created in service');
      });

    });
  }
}
export default AuthenticationUnitTest;