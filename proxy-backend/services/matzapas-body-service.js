const MatzapasBodyModel = require('../models/matzapas-body-model');

class MatzapasBodyService {
    /** получить все записи из таблицы "proxybodies" по  matzapasHeaderID */
    async getAllHeadersRecords(headerId) {
        const list = await MatzapasBodyModel.findAll({ where: { matzapasHeaderID: headerId } });
        return list;
    }

    /** создать запись в таблице "proxybodies" */
    async createRecord(payload) {
        const data = await MatzapasBodyModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "proxybodies" */
    async updateRecord(payload) {
        let record = await MatzapasBodyModel.findOne({ where: { id: payload.id } });
        record.materialID = payload?.materialID || record.materialID;
        record.unit = payload?.unit || record.unit;
        record.norma = payload?.norma || record.norma;
        record.count = payload?.count || record.count;
        record.price = payload?.price || record.price;
        record.sum = payload?.sum || record.sum;
        record.issue = payload?.issue || record.issue;
        record.debet = payload?.debet || record.debet;
        record.credit = payload?.credit || record.credit;
        record.matzapasHeaderID = payload?.matzapasHeaderID || record.matzapasHeaderID;
        return await record.save();
    }

    /** удалить запись из таблицы "proxybodies" */
    async removeRecord(recordId) {
        const record = await MatzapasBodyModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MatzapasBodyService();