import authModule from './auth/auth.module';
import agentModule from './agent/agent.module';
import blogModule from './blog/blog.module';
import commentModule from './comment/comment.module';
import contactUsModule from './contactUs/contactUs.module';
import customerModule from './customer/customer.module';
import optionModule from './option/option.module';
import productModule from './product/product.module';
import ticketModule from './ticket/ticket.module';
import userModule from './user/user.module';
import walletModule from './wallet/wallet.module';

export default [
  {
    prefix: optionModule.prefix,
    router: optionModule.routes
  },
  {
    prefix: walletModule.prefix,
    router: walletModule.routes
  },
  {
    prefix: productModule.prefix,
    router: productModule.routes
  },
  {
    prefix: ticketModule.prefix,
    router: ticketModule.routes
  },
  {
    prefix: userModule.prefix,
    router: userModule.routes
  },
  {
    prefix: authModule.prefix,
    router: authModule.routes
  },
  {
    prefix: agentModule.prefix,
    router: agentModule.routes
  },
  {
    prefix: blogModule.prefix,
    router: blogModule.routes
  },
  {
    prefix: commentModule.prefix,
    router: commentModule.routes
  },
  {
    prefix: contactUsModule.prefix,
    router: contactUsModule.routes
  },
  {
    prefix: customerModule.prefix,
    router: customerModule.routes
  },
];