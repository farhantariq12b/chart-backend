const { ErrorCodes, OrderConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const OrderManager = require("./OrderManager");

class OrderController {

  static async getAllOrders (req, res) {
  
    try {
  
      const orders = await OrderManager.getAllOrders();
  
      res.json({
        success: true,
        data: orders
      });
  
    } catch (err) {
  
      console.log('getAllOrders:: Request to get orders failed.');
  
      return res.status(Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : OrderConstants.MESSAGES.FETCHING_ORDERS_FAILED
      });
    }
  }

  static async getWeekDueOrders (req, res) {
  
    try {
  
      const orders = await OrderManager.getWeekDueOrders();
  
      res.json({
        success: true,
        data: orders
      });
  
    } catch (err) {
  
      console.log('getWeekDueOrders:: Request to get orders failed.');
  
      return res.status(Validators.validateCode(err.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.reportError ? err.message : OrderConstants.MESSAGES.FETCHING_ORDERS_FAILED
      });
    }
  }
}

module.exports = OrderController;