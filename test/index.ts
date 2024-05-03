// dependencies for run tests
import express from 'express';
import 'dotenv/config';
import Connection from '../src/helpers/connection';
const ConnectionService = new Connection(express);

// import tests modules 

// import services for testing
import AuthenticationUnitTest from './auth/index';
import BlogUnitTest from './blog/index';

describe('🚀 ~ Start Unit Test All Modules', () => {

  before(function (done) {
    console.log('🚀 ~ Initial Server for Start Testing');
    ConnectionService.startup();
    this.timeout(3000);
    setTimeout(done, 2500);
  });

  AuthenticationUnitTest.start();
  BlogUnitTest.start();


  after(function () {
    console.log('🚀 ~ Shutdown Server for End Testing');
    this.slow(3000);
    ConnectionService.shutDown();
  });

});