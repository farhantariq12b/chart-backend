const { ErrorCodes, PiecesConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const PiecesManager = require('./PiecesManager');

class PartsController {

  static async getPiecesStatus (req, res) {
  
    try {
  
      const pieces = await PiecesManager.getPiecesStatus();
  
      res.json({
        success: true,
        data: pieces
      });
  
    } catch (err) {
  
      console.log('getPiecesStatus:: Request to get pieces status failed.');
  
      return res.status(Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : PiecesConstants.MESSAGES.FETCHING_PIECES_STATUS_FAILED
      });
    }
  }

  static async getEstimatedBuilds (req, res) {
  
    try {
  
      const builds = await PiecesManager.getEstimatedBuilds();
  
      res.json({
        success: true,
        data: builds
      });
  
    } catch (err) {
  
      console.log('getEstimatedBuilds:: Request to get estimated builds failed.');
  
      return res.status(Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : PiecesConstants.MESSAGES.FETCHING_ESTIMATED_BUILD_FAILED
      });
    }
  }
}

module.exports = PartsController;