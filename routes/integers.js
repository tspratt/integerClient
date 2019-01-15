'use strict';
const express = require('express');
const router = express.Router();
const business = require('../api');

router.get('/', function(req, res, next) {
    const start = req.query.start;
    const end = req.query.end;
    const htmlReport = business.localAlgorithm(start, end, 'html');
    res.send(htmlReport);
});

router.get('/service', function(req, res, next) {
    const start = req.query.start;
    const end = req.query.end;
    business.serviceAlgorithm(start, end, 'html')
    .then((report) => {
        res.send(report);
    })
    .catch((err) => {res.end});

});

module.exports = router;

