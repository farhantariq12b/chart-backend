const connection = require('../../databaseConnection');
const { DateFormat } = require('../../helpers');
const { resolveDBquery } = require('../../utlis/db.util');

class OrderManager {

  static async getAllOrders () {

    const today = DateFormat.getDate();
    const dayBeforeYesterday = DateFormat.getDayBeforeYesterday();

    const openOrders = await resolveDBquery(`
    SELECT 
      (SELECT COUNT(*) FROM orders WHERE orders.id IN 
        (SELECT parts.order_id FROM parts WHERE parts.id IN (SELECT pieces.part_id FROM pieces
        WHERE pieces.status != 'Despatched') And parts.technology = 'SLS')) AS SLS_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN
        (SELECT parts.order_id FROM parts WHERE parts.id IN (SELECT pieces.part_id FROM pieces
        WHERE pieces.status != 'Despatched') And parts.technology = 'FDM')) AS FDM_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN 
        (SELECT parts.order_id FROM parts WHERE parts.id IN (SELECT pieces.part_id FROM pieces
        WHERE pieces.status != 'Despatched') And parts.technology = 'MJF')) AS MJF_COUNT 
    FROM orders LIMIT 1;`);

    const dueOrders = await resolveDBquery(`
      SELECT
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'SLS')
          AND orders.order_deadline = '${today}') AS SLS_COUNT,
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'FDM') 
          AND orders.order_deadline = '${today}') AS FDM_COUNT,
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN 
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'MJF') 
          AND orders.order_deadline = '${today}') AS MJF_COUNT 
      FROM orders LIMIT 1;`
    );

    const lateOrders = await resolveDBquery(`
    SELECT
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'SLS')
        AND orders.order_deadline < '${today}' AND orders.order_deadline >= '${dayBeforeYesterday}') AS SLS_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'FDM') 
        AND orders.order_deadline < '${today}' AND orders.order_deadline >= '${dayBeforeYesterday}') AS FDM_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN 
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'MJF') 
        AND orders.order_deadline < '${today}' AND orders.order_deadline >= '${dayBeforeYesterday}') AS MJF_COUNT 
    FROM orders LIMIT 1;`
  );

    const veryLateOrders = await resolveDBquery(`
    SELECT
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'SLS')
        AND orders.order_deadline < '${dayBeforeYesterday}') AS SLS_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'FDM') 
        AND orders.order_deadline < '${dayBeforeYesterday}') AS FDM_COUNT,
      (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN 
        (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'MJF') 
        AND orders.order_deadline < '${dayBeforeYesterday}') AS MJF_COUNT 
    FROM orders LIMIT 1;`
  );

    return {dueOrders, openOrders, lateOrders, veryLateOrders};
    
  }

  static async getWeekDueOrders() {

    const weekDates = DateFormat.getAllWeek();
    let weekOrders = [];
    
    for (const weekDay of weekDates) { 
      
      const dayOrders = await resolveDBquery(`
      SELECT
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'SLS')
          AND orders.order_deadline = '${weekDay}') AS SLS_COUNT,
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'FDM') 
          AND orders.order_deadline = '${weekDay}') AS FDM_COUNT,
        (SELECT COUNT(*) FROM orders WHERE orders.id IN (SELECT parts.order_id FROM parts WHERE parts.id IN 
          (SELECT pieces.part_id FROM pieces WHERE pieces.status != 'Despatched') And parts.technology = 'MJF') 
          AND orders.order_deadline = '${weekDay}') AS MJF_COUNT 
      FROM orders LIMIT 1;`
      );

      const data = {
        date: weekDay,
        orders: dayOrders
      }

      weekOrders.push(data);

    }

    return weekOrders;
  }
}

module.exports = OrderManager;

