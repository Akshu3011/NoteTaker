const express = require('express');
const app = express();
const router= express.Router();

const notesRouter = require('./notes');



router.use('/notes', notesRouter);

module.exports = router;
