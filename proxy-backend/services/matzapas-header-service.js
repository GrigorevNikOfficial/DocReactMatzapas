const MatzapasHeaderModel = require('../models/matzapas-header-model');

class MatzapasHeaderService {
    /** получить все записи из таблицы "proxyheaders" */
    async getAllRecords() {
        const list = await MatzapasHeaderModel.findAll();
        return list;
    }

    /** получить одну запись по id из таблицы "proxyheaders" */
    async getOneRecord(recordId) {
        const record = await MatzapasHeaderModel.findOne({ where: {id: recordId } });
        return record;
    }

    /** создать запись в таблице "proxyheaders" */
    async createRecord(payload) {
        const data = await MatzapasHeaderModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "proxyheaders" */
    async updateRecord(payload) {
        let record = await MatzapasHeaderModel.findOne({ where: { id: payload.id } });
        record.number = payload?.number || record?.number;
        record.date = payload?.date || record?.date;
        record.directorID = payload?.directorID || record?.directorID;
        record.signatureDate = payload?.signatureDate || record?.signatureDate;
        record.copmanyID = payload?.copmanyID || record?.copmanyID;
        record.commission = payload?.commission || record?.commission;
        record.orderDate = payload?.orderDate || record?.orderDate;
        record.orderNumber = payload?.orderNumber || record?.orderNumber;
        record.responseP = payload?.responseP || record?.responseP;
        record.structuralUnit = payload?.structuralUnit || record?.structuralUnit;
        record.commissionM = payload?.commissionM || record?.commissionM;
        return await record.save();
    }

    /** удалить запись из таблицы "proxyheaders" */
    async removeRecord(recordId) {
        const record = await MatzapasHeaderModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MatzapasHeaderService();