import userRoutes from './router/user.router';
import roleRoutes from './router/role.router';
import permissionRoutes from './router/permission.router';

export const user = {
  prefix: '/user',
  routes: userRoutes
};

export const role = {
  prefix: '/role',
  routes: roleRoutes
};
export const permission = {
  prefix: '/permission',
  routes: permissionRoutes
};