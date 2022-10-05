class DateFormat {

  static getDate() {
  
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    const today = new Date();
  
    const year = today.getFullYear();
    
    const month = padTo2Digits(today.getMonth() + 1);
    
    const day = padTo2Digits(today.getDate());
  
    const date = `${year}-${month}-${day}`;
  
    return date;
          
  }

  static getDayBeforeYesterday() {
  
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    const today = new Date();

    today.setDate(today.getDate() -2);
  
    const year = today.getFullYear();
    
    const month = padTo2Digits(today.getMonth() + 1);
    
    const day = padTo2Digits(today.getDate());
  
    const date = `${year}-${month}-${day}`;
  
    return date;
          
  }

  static getAllWeek() {
  
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    const todayDate = DateFormat.getDate();
    const today = new Date();

    let week = [todayDate];

    for ( let i=1 ; i <= 6; i++ ) {

      today.setDate(today.getDate() + 1);
  
      const year = today.getFullYear();
    
      const month = padTo2Digits(today.getMonth() + 1);
    
      const day = padTo2Digits(today.getDate());
  
      const date = `${year}-${month}-${day}`;
  
      week.push(date);

    }

    return week;
  }
      
}
module.exports = DateFormat;