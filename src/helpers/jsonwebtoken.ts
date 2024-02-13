import * as jwt from "jsonwebtoken";

class jsonwebtoken {
  static sign(payload: any, expireTime: string = '1h') {
    return jwt.sign(payload, String(process.env.JWT_SECRET_KEY), {
      expiresIn: expireTime
    });
  }

  static verify(token: string) {
    return jwt.verify(token, String(process.env.JWT_SECRET_KEY));
  }
}

export default jsonwebtoken;