import mongoose from 'mongoose';
import PermissionModel from './../modules/user/schema/permission.schema';
import * as permissions from './../configs/permissions';
import RoleModel from './../modules/user/schema/role.schema';
import UserModel from './../modules/user/schema/user.schema';
import bcrypt from 'bcrypt';
import CategoryModel from '../modules/product/schema/category.schema';
import BrandModel from '../modules/product/schema/brand.schema';
import ProductModel from '../modules/product/schema/product.schema';
import { fa, Faker } from '@faker-js/faker';
import OptionModel from '../modules/option/schema/option.schema';

const faker = new Faker({
  locale: [fa],
});
const CREATOR = {
  id: new mongoose.Types.ObjectId(),
  password: 'AriaAdmin'
};

const ROLE = [
  {
    name: 'admin',
    nameFa: 'ادمین',
    creator: CREATOR.id
  },
  {
    name: 'customer',
    nameFa: 'مشتری',
    creator: CREATOR.id
  }
];


const USER = {
  email: 'admin@aria.com',
  username: 'admin',
  phone: '09121234567',
};

export default class DataSeeder {
  adminRoleId?: string | any;
  userRoleId?: string | any;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this
        .flushDB()
        .then(_flushed => {
          this.createSettings()
            .then();
          this
            .createRole()
            .then(_role => {
              this
                .createPermission()
                .then(_permission => {
                  this
                    .createAdmin()
                    .then(_user => {
                      this
                        .createProduct()
                        .then(_product => {
                          console.log("🚀 ~ DataSeeder ~ Create ~ Data");
                        });
                    });
                });
            });
        });
    }
  }

  async flushDB() {
    await Promise.all([
      RoleModel.deleteMany({}),
      PermissionModel.deleteMany({}),
      UserModel.deleteMany({}),
      CategoryModel.deleteMany({}),
      BrandModel.deleteMany({}),
      ProductModel.deleteMany({}),
    ]);
  }


  async createRole() {
    try {
      const roles = await RoleModel.create(ROLE);
      this.adminRoleId = roles[0]._id;
      this.userRoleId = roles[1]._id;

    } catch (err) {
      console.log("🚀 ~ DataSeeder ~ createRole ~ err:", err);
    }
  }

  async createPermission() {
    try {
      const adminPermissions = Object.keys(permissions).map((item: string, index) => {
        return {
          service: item,
          methods: Object.values(permissions[item as keyof typeof permissions])
        };
      });
      await PermissionModel.create([
        {
          roleId: this.adminRoleId,
          creator: CREATOR.id,
          access: adminPermissions
        },
        {
          roleId: this.userRoleId,
          creator: CREATOR.id,
          access: [
            {
              service: 'product',
              methods: ['find', 'findOne', 'update', 'delete']
            }
          ]
        }
      ]);
    } catch (err) {
      console.log("🚀 ~ DataSeeder ~ createPermission ~ err:", err);
    }
  }

  async createAdmin() {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const hash = await bcrypt.hash(CREATOR.password, salt);
      await UserModel.create({
        ...USER,
        salt,
        password: hash,
        role: ROLE[0].name
      });
    } catch (err) {
      console.log("🚀 ~ DataSeeder ~ createAdmin ~ err:", err);
    }
  }

  async createProduct() {
    try {

      const createCategories = await CategoryModel.create([
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        }
      ]);
      const createBrands = await BrandModel.create([
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        },
        {
          name: faker.person.firstName(),
          creator: this.adminRoleId
        }
      ]);
      const createProduct = [];
      for (let i = 0; i < 20; i++) {
        const random = Math.floor(Math.random() * createCategories.length);
        createProduct.push({
          "name": faker.person.firstName(),
          "title": faker.person.fullName(),
          "cover": faker.image.avatarGitHub(),
          "description": faker.person.fullName(),
          "slug": faker.person.fullName(),
          "colers": [
            faker.color.rgb(),
            faker.color.rgb(),
            faker.color.rgb(),
            faker.color.rgb(),
          ],
          "images": [
            faker.image.avatarGitHub(),
            faker.image.avatarGitHub(),
            faker.image.avatarGitHub(),
            faker.image.avatarGitHub(),
          ],
          "options": [{
            "key": faker.person.firstName(),
            "value": faker.person.lastName()
          }],
          "brandId": createBrands[random]._id,
          "categoryId": createCategories[random]._id,
          creator: this.adminRoleId
        });
      }
      await ProductModel.create(createProduct);
    } catch (err) {
      console.log("🚀 ~ DataSeeder ~ createProduct ~ err:", err);
    }
  }

  async createSettings() {
    try {
      await OptionModel.updateOne({
        key: 'settings'
      }, {
        "values": {
          "Generals": {
            "SiteTitle": "آریاکیش مرکز ارائه گارانتی خدمات پس از فروش لوازم خانگی",
            "TagLine": "به سایت رسمی آریاکیش مرکز ارائه گارانتی و خدمات پس از فروش لوازم خانگی خوش آمدی",
            "CustomerContact": "02186780",
            "CompanyTel": "1882",
            "MobileWhatsapp": "09121779471",
            "EmailAddress": "info@ariakish.com",
            "WorkingTime": "9 صبح الی 5 بعد ازظهر وپنچ شنبه ها 9 صبح الی 13",
            "LogoPath": "https://ariakish.com/fav-ariakish.png",
            "SmsNumber": "100086780"
          },
          "SocialMedia": {
            "TelegramUrl": "https://ariakish.com/fav-ariakish.png",
            "WhatsappUrl": "https://ariakish.com/fav-ariakish.png",
            "Email": "touriyan1882@yahoo.com"
          },
          "Portals": {
            "SellerUrl": "https://seller.ariakish.com/login",
            "ClubUrl": "https://club.ariakish.com/login",
            "InquiryUrl": "https://seller.ariakish.com/",
            "PoliciesUrl": "https://seller.ariakish.com/page/g/atlaaaat-drmord-shrayt-o-doabt-garanty"
          }
        }
      }, {
        upsert: true
      });
    } catch (err) {

    }
  }
}