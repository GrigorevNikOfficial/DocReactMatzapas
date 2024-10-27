const DirectorService = require('../services/director-service');

class DirectorController {
    async getAllRecords(req, res) {
        try {
            const list = await DirectorService.getAllRecords();
            return res
                .status(200)
                .json(list);
        } catch (e) {
            return res
                .status(500)
                .json(e);
        }
    }

    async createRecord(req, res) {
        try {
            const record = await DirectorService.createRecord(req.body);
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
            const record = await DirectorService.updateRecord(req.body);
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
            const record = await DirectorService.removeRecord(recordId);
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

module.exports = new DirectorController()