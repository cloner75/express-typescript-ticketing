import TicketModel from './../schema/ticket.schema';
import MongoQuery from './../../../helpers/mongo.query';
import responser from '../../../helpers/response';
import UserService from '../../user/utils/user.service';


class TicketService extends UserService {
  constructor() {
    super();
  }

  /**
   * 
   * @param inputData u
   * @param creator 
   * @returns 
   */
  async createTicket(inputData: any, creator: string): Promise<any> {
    try {
      const newTicket = await TicketModel.create({ ...inputData, creator });
      return responser.serviceResponse(true, 'isOK', newTicket);
    } catch (err: any) {
      return responser.serviceResponse(false, 'can not create ticket');
    }
  }

  /**
   * 
   * @param inputWhere 
   * @returns 
   */
  async getTicket(inputWhere: any): Promise<any> {
    try {
      const { options, where } = MongoQuery.initialMongoQuery(inputWhere, 'ticket');
      const { select: projection, ...otherOptions } = options;
      const findByQuery = await TicketModel.find(where, projection, otherOptions);
      return responser.serviceResponse(true, 'isOK', findByQuery);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get tickets');
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getTicketById(id: string) {
    try {
      const findOneTicket = await TicketModel.findOne({ _id: id });
      if (!findOneTicket) {
        return responser.serviceResponse(false, 'ticket not found');
      }
      return responser.serviceResponse(true, 'isOK', findOneTicket);
    } catch (err) {
      return responser.serviceResponse(false, 'can not get ticket');
    }
  }

  async updateTicketById(id: string, updatedFields: any, creator: string) {
    try {
      const updateFields = await TicketModel.updateOne({ _id: id }, { $set: { ...updatedFields, creator } });
      if (!updateFields || !updateFields.modifiedCount || !updateFields.acknowledged) {
        return responser.serviceResponse(false, 'ticket not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not update ticket');
    }
  }



  async removeTicketById(id: string) {
    try {
      const updateFields = await TicketModel.deleteOne({ _id: id });
      if (!updateFields || !updateFields.acknowledged || !updateFields.deletedCount) {
        return responser.serviceResponse(false, 'ticket not found');
      }
      return responser.serviceResponse(true, 'isOK', updateFields);
    } catch (err) {
      return responser.serviceResponse(false, 'can not remove ticket');
    }
  }
}

export default TicketService;