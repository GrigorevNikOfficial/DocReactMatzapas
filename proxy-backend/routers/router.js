const Router = require("express").Router;
const MaterialController = require('../controllers/material-controller');
const CompanyController = require('../controllers/company-controller');
const DirectorController = require('../controllers/director-controller');
const MatzapasBodyController = require('../controllers/matzapas-body-controller');
const MatzapasHeaderController = require('../controllers/matzapas-header-controller');
const ProductController = require('../controllers/product-controller');
const OrgatizationController = require('../controllers/organization-controller');
const IndividualController = require('../controllers/individual-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');

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

router.get
    (
        '/products',
        ProductController.getAllRecords,
    );

router.post
    (
        '/products',
        ProductController.createRecord,
    );

router.put
    (
        '/products',
        ProductController.updateRecord,
    );

router.delete
    (
        '/products/:id',
        ProductController.removeRecord,
    );

router.get
    (
        '/organizations',
        OrgatizationController.getAllRecords,
    );

router.post
    (
        '/organizations',
        OrgatizationController.createRecord,
    );

router.put
    (
        '/organizations',
        OrgatizationController.updateRecord,
    );

router.delete
    (
        '/organizations/:id',
        OrgatizationController.removeRecord,
    );

router.get
    (
        '/individuals',
        IndividualController.getAllRecords,
    );

router.post
    (
        '/individuals',
        IndividualController.createRecord,
    );

router.put
    (
        '/individuals',
        IndividualController.updateRecord,
    );

router.delete
    (
        '/individuals/:id',
        IndividualController.removeRecord,
    );

router.get
    (
        '/proxy-bodies/:headerId',
        ProxyBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/proxy-bodies',
        ProxyBodyController.createRecord,
    );

router.put
    (
        '/proxy-bodies',
        ProxyBodyController.updateRecord,
    );

router.delete
    (
        '/proxy-bodies/:id',
        ProxyBodyController.removeRecord,
    );

router.get
    (
        '/proxy-headers',
        ProxyHeaderController.getAllRecords,
    );

router.get
    (
        '/proxy-headers/:id',
        ProxyHeaderController.getOneRecord,
    );

router.post
    (
        '/proxy-headers',
        ProxyHeaderController.createRecord,
    );

router.put
    (
        '/proxy-headers',
        ProxyHeaderController.updateRecord,
    );

router.delete
    (
        '/proxy-headers/:id',
        ProxyHeaderController.removeRecord,
    );

module.exports = router;