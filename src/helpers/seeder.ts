import mongoose from 'mongoose';
import PermissionModel from './../modules/user/schema/permission.schema';
import * as permissions from './../configs/permissions';
import RoleModel from './../modules/user/schema/role.schema';
import UserModel from './../modules/user/schema/user.schema';
import bcrypt from 'bcrypt';

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
          this
            .createRole()
            .then(_role => {
              this
                .createPermission()
                .then(_permission => {
                  this
                    .createAdmin()
                    .then(_user => {
                      console.log("🚀 ~ DataSeeder ~ Create ~ Data");
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
}