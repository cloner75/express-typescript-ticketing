import authModule from './auth/auth.module';
import agentModule from './agent/agent.module';
import blogModule from './blog/blog.module';
import commentModule from './comment/comment.module';
import contactUsModule from './contactUs/contactUs.module';
import customerModule from './customer/customer.module';
import optionModule from './option/option.module';
import { product, category, brand } from './product/product.module';
import ticketModule from './ticket/ticket.module';
import { user, role, permission } from './user/user.module';
import walletModule from './wallet/wallet.module';
import complaintModule from './complaint/complaint.module';
import surveyModule from './survey/survey.module';
import cooperationModule from './cooperation/cooperation.module';
import forumModule from './forum/forum.module';

export default [
  {
    prefix: forumModule.prefix,
    router: forumModule.routes
  },
  {
    prefix: cooperationModule.prefix,
    router: cooperationModule.routes
  },
  {
    prefix: surveyModule.prefix,
    router: surveyModule.routes
  },
  {
    prefix: complaintModule.prefix,
    router: complaintModule.routes
  },
  {
    prefix: optionModule.prefix,
    router: optionModule.routes
  },
  {
    prefix: walletModule.prefix,
    router: walletModule.routes
  },
  {
    prefix: product.prefix,
    router: product.routes
  },
  {
    prefix: category.prefix,
    router: category.routes
  },
  {
    prefix: brand.prefix,
    router: brand.routes
  },
  {
    prefix: ticketModule.prefix,
    router: ticketModule.routes
  },
  {
    prefix: user.prefix,
    router: user.routes
  },
  {
    prefix: role.prefix,
    router: role.routes
  },
  {
    prefix: permission.prefix,
    router: permission.routes
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