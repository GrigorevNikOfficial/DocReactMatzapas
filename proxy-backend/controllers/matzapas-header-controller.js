const MatzapasHeaderService = require('../services/matzapas-header-service');

class MatzapasHeaderController {
    async getAllRecords(req, res) {
        try {
            const list = await MatzapasHeaderService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async getOneRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await MatzapasHeaderService.getOneRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async createRecord(req, res) {
        try {
            const record = await MatzapasHeaderService.createRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)    
                .json(e);
        }
    }

    async updateRecord(req, res) {
        try {
            const record = await MatzapasHeaderService.updateRecord(req.body);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async removeRecord(req, res) {
        try {
            const recordId = req.params.id;
            const record = await MatzapasHeaderService.removeRecord(recordId);
            return res
                .status(200)
                .json(record);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }
}

module.exports = new MatzapasHeaderController()