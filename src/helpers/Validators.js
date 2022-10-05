class Validators{

  static validateCode (code, defaultCode) {
  
    if (code >= 400 && code < 500) {
      
      return code;
      
    }
      
    return defaultCode;
        
  }
    
}
  
module.exports = Validators;