import productRoutes from './router/product.router';
import categoryRoutes from './router/category.router';
import brandRoutes from './router/brand.router';

export const product = {
  prefix: '/product',
  routes: productRoutes
};

export const category = {
  prefix: '/category',
  routes: categoryRoutes
};
export const brand = {
  prefix: '/brand',
  routes: brandRoutes
};