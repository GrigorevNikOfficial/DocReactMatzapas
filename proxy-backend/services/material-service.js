const MaterialModel = require('../models/material-model');

class MaterialService {
    /** получить все записи из таблицы "products" */
    async getAllRecords() {
        const list = await MaterialModel.findAll();
        return list;
    }

    /** создать запись в таблице "products" */
    async createRecord(payload) {
        const data = await MaterialModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "products" */
    async updateRecord(payload) {
        let record = await MaterialModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "products" */
    async removeRecord(recordId) {
        const record = await MaterialModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MaterialService();