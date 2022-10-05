const express = require('express');
const PiecesController = require('../app/parts/PiecesController');
const router = express.Router();

router.get('/v1/pieces-status', PiecesController.getPiecesStatus);
router.get('/v1/estimated-builds', PiecesController.getEstimatedBuilds);

module.exports = router;