const Router = require("express").Router;
const MaterialController = require('../controllers/material-controller');
const CompanyController = require('../controllers/company-controller');
const DirectorController = require('../controllers/director-controller');
const MatzapasBodyController = require('../controllers/matzapas-body-controller');
const MatzapasHeaderController = require('../controllers/matzapas-header-controller');

const router = new Router();

router.get
    (
        '/materials',
        MaterialController.getAllRecords,
    );

router.post
    (
        '/materials',
        MaterialController.createRecord,
    );

router.put
    (
        '/materials',
        MaterialController.updateRecord,
    );

router.delete
    (
        '/materials/:id',
        MaterialController.removeRecord,
    );

router.get
    (
        '/companies',
        CompanyController.getAllRecords,
    );

router.post
    (
        '/companies',
        CompanyController.createRecord,
    );

router.put
    (
        '/companies',
        CompanyController.updateRecord,
    );

router.delete
    (
        '/companies/:id',
        CompanyController.removeRecord,
    );

router.get
    (
        '/directors',
        DirectorController.getAllRecords,
    );

router.post
    (
        '/directors',
        DirectorController.createRecord,
    );

router.put
    (
        '/directors',
        DirectorController.updateRecord,
    );

router.delete
    (
        '/directors/:id',
        DirectorController.removeRecord,
    );

router.get
    (
        '/matzapas-bodies/:headerId',
        MatzapasBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/matzapas-bodies',
        MatzapasBodyController.createRecord,
    );

router.put
    (
        '/matzapas-bodies',
        MatzapasBodyController.updateRecord,
    );

router.delete
    (
        '/matzapas-bodies/:id',
        MatzapasBodyController.removeRecord,
    );

router.get
    (
        '/matzapas-headers',
        MatzapasHeaderController.getAllRecords,
    );

router.get
    (
        '/matzapas-headers/:id',
        MatzapasHeaderController.getOneRecord,
    );

router.post
    (
        '/matzapas-headers',
        MatzapasHeaderController.createRecord,
    );

router.put
    (
        '/matzapas-headers',
        MatzapasHeaderController.updateRecord,
    );

router.delete
    (
        '/matzapas-headers/:id',
        MatzapasHeaderController.removeRecord,
    );

module.exports = router;