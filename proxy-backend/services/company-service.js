const CompanyModel = require('../models/company-model');

class CompanyService {
    /** получить все записи из таблицы "companies" */
    async getAllRecords() {
        const list = await CompanyModel.findAll();
        return list;
    }

    /** создать запись в таблице "companies" */
    async createRecord(payload) {
        const data = await CompanyModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "companies" */
    async updateRecord(payload) {
        let record = await CompanyModel.findOne({ where: { id: payload.id } });
        record.name = payload?.name || record.name;
        record.inn = payload?.inn || record.inn;
        record.kpp = payload?.kpp || record.kpp;
        record.okpo = payload?.okpo || record.okpo;
        return await record.save();
    }

    /** удалить запись из таблицы "companies" */
    async removeRecord(recordId) {
        const record = await CompanyModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new CompanyService();