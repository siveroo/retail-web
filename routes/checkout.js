const express = require("express");
const { Router } = require("express");
const path = require('path')

const router = Router();

router.use('/', express.static(path.join(__dirname, '../public/checkout')))

module.exports = router;