import { Response } from 'express';
class Responser {
  res: Response;
  service: string;

  constructor(response: Response, serviceName: string) {
    this.res = response;
    this.service = serviceName;
  }
  success(success: boolean, status: number, message: string, data: any = {}) {
    this.res
      .status(status)
      .send({
        success,
        message,
        data
      });
  }


  error(status: number, message: string, error: any) {
    this.res
      .status(status)
      .send({
        success: false,
        message
      });
  }
}

export default Responser;