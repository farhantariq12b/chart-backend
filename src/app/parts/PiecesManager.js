const { PiecesConstants } = require("../../constants");
const { resolveDBquery } = require('../../utlis/db.util');

class PiecesManager {

  static async getPiecesStatus () {
  
    const PiecesStatus = [];

    for (const status of PiecesConstants.PIECES_STATUS.STATUS) {

      const statusByTechnolgy = await resolveDBquery(`
        SELECT 
          (SELECT COUNT(*) FROM pieces WHERE pieces.part_id IN 
            (SELECT parts.id FROM parts WHERE parts.technology = 'SLS')  And pieces.status = '${status}') AS SLS_COUNT,
          (SELECT COUNT(*) FROM pieces WHERE pieces.part_id IN 
            (SELECT parts.id FROM parts WHERE parts.technology = 'FDM')  And pieces.status = '${status}') AS FDM_COUNT,
          (SELECT COUNT(*) FROM pieces WHERE pieces.part_id IN 
            (SELECT parts.id FROM parts WHERE parts.technology = 'MJF')  And pieces.status = '${status}') AS MJF_COUNT
      FROM pieces LIMIT 1;`);

      const data = {
       status: status,
       countsByTechnology: statusByTechnolgy,
      }

      PiecesStatus.push(data);
    }
    
    return PiecesStatus;

  }

  static async getEstimatedBuilds() {

    const builds = await resolveDBquery(`
    SELECT 
      (SELECT COUNT(*) FROM pieces WHERE pieces.part_id IN 
        (SELECT parts.id FROM parts WHERE parts.technology = 'SLS' AND parts.status = 'New Part')  And pieces.status = 'New') AS SLS_COUNT,
      (SELECT COUNT(*) FROM pieces WHERE pieces.part_id IN 
        (SELECT parts.id FROM parts WHERE parts.technology = 'MJF' AND parts.status = 'New Part')  And pieces.status = 'New') AS MJF_COUNT
    FROM pieces LIMIT 1;`);

    let slsbuilds = (builds[0].SLS_COUNT/2500);
    let mjfbuilds = (builds[0].MJF_COUNT/1500);

    const estimatedBuilds = {
      SLS: slsbuilds,
      MJF: mjfbuilds
    }
    
    return estimatedBuilds;
  }
}

module.exports = PiecesManager;