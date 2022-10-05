const PiecesConstants = Object.freeze({

    MESSAGES:{
  
     FETCHING_PIECES_STATUS_FAILED: 'Fetching pieces status failed.',

     FETCHING_ESTIMATED_BUILD_FAILED: 'Fetching estimated build failed.',
  
     STORING_PIECES_STATUS_FAILED: 'Storing pieces status failed.'
  
    },

    PIECES_STATUS : {
     
      STATUS : [ 'New', 'Prepared', 'In Production', 'Post Processing', 'Ready']  
      
    }
  
  });
  
  module.exports = PiecesConstants;