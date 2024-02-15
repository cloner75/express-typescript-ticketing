import { Request, Response } from 'express';
import ProductService from '../utils/product.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';


class ProductController extends ProductService {
  constructor() {
    super();
  }

  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  async create(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'product-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewProduct = await super.createProduct(req.body, creator);
      if (!getNewProduct.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewProduct.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewProduct.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  /**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
  async find(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'product-find');
    try {
      const getProducts = await super.getProduct(req.query);
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getProducts.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }


  /**
  * 
  * @param req 
  * @param res 
  * @returns 
  */
  async findOne(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'product-findOne');
    try {
      const getProduct = await super.getProductById(req.params.id);
      if (!getProduct.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getProduct.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getProduct.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }

  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async update(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'product-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewProduct = await super.updateProductById(req.params.id, req.body, creator);
      if (!getNewProduct.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewProduct.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewProduct.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }


  /**
* 
* @param req 
* @param res 
* @returns 
*/
  async delete(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'product-delete');
    try {
      const removeProduct = await super.removeProductById(req.params.id);
      if (!removeProduct.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], removeProduct.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], removeProduct.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default ProductController;