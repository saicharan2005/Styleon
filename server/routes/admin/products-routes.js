

const express = require("express");

const {
  handleImageUpload,
} = require("../../controllers/admin/products-controllers");

const { upload } = require('../../helpers/cloudinary')
const router = express.Router();


module.exports = router;