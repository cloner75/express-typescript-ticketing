import defaultFields from './../configs/defaultFields';

// CONSTS
const SORT = -1;
const ORDER_DEFAULT = 'createdAt';
const LIMIT_DEFAULT = 50;
const SKIP_DEFAULT = 0;
const PAGE_DEFAULT = 1;
const DATE_DEFAULT = '2017-01-01T01:00:00.000Z';
const ISO_DATE = 'T01:00:00.000Z';

class Mongo {
  /**
   * @description :: select allow fields
   * @param {string} fields
   * @returns {string} allowFields
   */
  static selectAllowFields(fields: string, select: string) {
    let result = '';
    const findDefaultFields = defaultFields.find(item => item.name === select);
    if (!findDefaultFields) {
      return result;
    }
    for (let item of fields.split(',')) {
      if (findDefaultFields.value.includes(item)) {
        result += `${item} `;
      }
    }
    return result;
  }

  /**
   * @description :: initial option and where query
   * @param {object} query
   * @return {object} option
   * @return {object} where
   */
  static initialMongoQuery(query: any, select: string) {
    const { fields, limit, skip, sort, order, page, ids, ...where } = query;
    const {
      createdAtFrom,
      createdAtTo,
      updatedAtFrom,
      updatedAtTo,
      ...rest
    } = where;
    let selectFields = '';
    if (fields) {
      selectFields = this.selectAllowFields(fields, select);
    } else {
      const findDefaultFields = defaultFields.find(item => item.name === select);
      selectFields = findDefaultFields && findDefaultFields.value ? findDefaultFields.value.join(' ') : '';
    }
    const result = {
      options: {
        select: selectFields,
        limit: Number(limit) || LIMIT_DEFAULT,
        skip: Number(skip) || SKIP_DEFAULT,
        page: Number(page) || PAGE_DEFAULT,
      },
      where: {
        ...rest,
        createdAt: {
          $gte: createdAtFrom ? createdAtFrom.concat(ISO_DATE) : DATE_DEFAULT,
          $lte: createdAtTo
            ? createdAtTo.concat(ISO_DATE)
            : new Date().toISOString(),
        },
        updatedAt: {
          $gte: updatedAtFrom ? updatedAtFrom.concat(ISO_DATE) : DATE_DEFAULT,
          $lte: updatedAtTo
            ? updatedAtTo.concat(ISO_DATE)
            : new Date().toISOString(),
        },
      },
    };
    // Add ids to where
    if ('ids' in query) {
      const idResult = ids.split(',');
      if (idResult) {
        Object.assign(result.where, { _id: { $in: idResult } });
      }
    }
    if (order) {
      Object.assign(result.options, { sort: { [order]: Number(sort) || SORT } });
    } else {
      Object.assign(result.options, { sort: { [ORDER_DEFAULT]: Number(sort) || SORT } });
    }
    return result;
  }
}

export default Mongo;