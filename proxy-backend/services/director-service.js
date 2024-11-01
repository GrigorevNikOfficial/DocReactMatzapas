const DirectorModel = require('../models/director-model');

class DirectorService {
    /** получить все записи из таблицы "directors" */
    async getAllRecords() {
        const list = await DirectorModel.findAll();
        return list;
    }

    /** создать запись в таблице "directors" */
    async createRecord(payload) {
        const data = await DirectorModel.create(payload);
        return data;
    }

    /** обновить запись в таблице "directors" */
    async updateRecord(payload) {
        let record = await DirectorModel.findOne({ where: { id: payload.id } });
        record.firstName = payload?.firstName || record.firstName;
        record.lastName = payload?.lastName || record.lastName;
        record.patronymic = payload?.patronymic || record.patronymic;
        record.department = payload?.department || record.department;
        return await record.save();
    }

    /** удалить запись из таблицы "directors" */
    async removeRecord(recordId) {
        const record = await DirectorModel.destroy({ where: { id: recordId } });
        return record;
    }
}

module.exports = new DirectorService();