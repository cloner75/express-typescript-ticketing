import authModule from './auth/auth.module';

export default [
  {
    prefix: authModule.prefix,
    router: authModule.routes
  }
];