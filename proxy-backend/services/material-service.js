const MaterialModel = require('../models/material-model');

class MaterialService {
    /** получить все записи из таблицы "materials" */
    async getAllRecords() {
        const list = await MaterialModel.findAll();
        return list;
    }

    /** создать запись в таблице "materials" */
    async createRecord(payload) {
        const data = await MaterialModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "materials" */
    async updateRecord(payload) {
        let record = await MaterialModel.findOne({ where: { id: payload.id } });
        record.title = payload?.title || record.title;
        return await record.save();
    }

    /** удалить запись из таблицы "materials" */
    async removeRecord(recordId) {
        const record = await MaterialModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new MaterialService();