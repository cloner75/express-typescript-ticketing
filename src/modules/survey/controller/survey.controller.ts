import { Request, Response } from 'express';
import SurveyService from '../utils/survey.service';

import Responser from '../../../helpers/response';
import httpStatus from 'http-status';


class SurveyController extends SurveyService {
  constructor() {
    super();
  }

  async createPublic(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'survey-create');
    try {
      const getNewSurvey = await super.createSurveyPublic(req.body);
      if (!getNewSurvey.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewSurvey.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewSurvey.data);
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
  async create(req: Request, res: Response): Promise<any> {
    const sendResponse = new Responser(res, 'survey-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewSurvey = await super.createSurvey(req.body, creator);
      if (!getNewSurvey.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewSurvey.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewSurvey.data);
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
    const sendResponse = new Responser(res, 'survey-find');
    try {
      const getSurveys = await super.getSurvey(req.query);
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getSurveys.data);
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
    const sendResponse = new Responser(res, 'survey-findOne');
    try {
      const getSurvey = await super.getSurveyById(req.params.id);
      if (!getSurvey.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], getSurvey.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], getSurvey.data);
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
    const sendResponse = new Responser(res, 'survey-create');
    try {
      const { email, _id: creator } = req.user;
      const getUser = await super.getUserByEmail(email);
      if (!getUser.success) {
        return sendResponse.success(false, httpStatus.OK, httpStatus['204_MESSAGE'], {
          message: 'user not found'
        });
      }

      const getNewSurvey = await super.updateSurveyById(req.params.id, req.body, creator);
      if (!getNewSurvey.success) {
        return sendResponse.success(false, httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], {
          message: getNewSurvey.message
        });
      }
      return sendResponse.success(true, httpStatus.CREATED, httpStatus['201_MESSAGE'], getNewSurvey.data);
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
    const sendResponse = new Responser(res, 'survey-delete');
    try {
      const removeSurvey = await super.removeSurveyById(req.params.id);
      if (!removeSurvey.success) {
        return sendResponse.success(false, httpStatus.NO_CONTENT, httpStatus['204_MESSAGE'], removeSurvey.message);
      }
      return sendResponse.success(true, httpStatus.OK, httpStatus['200_MESSAGE'], removeSurvey.data);
    } catch (err) {
      return sendResponse.error(httpStatus.INTERNAL_SERVER_ERROR, httpStatus['500_MESSAGE'], err);
    }
  }
}

export default SurveyController;