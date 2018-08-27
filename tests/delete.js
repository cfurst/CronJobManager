/**
 * 
 */

var CronJobManager = require('../lib/crontab_manager');
exports.test = () => {
    let date = new Date();
    crontab1 = new CronJobManager('deleteMe', date, () =>{console.log("delete me...")} );
    crontab1.deleteJob('deleteMe');
    console.assert(! crontab1.jobs.deleteMe, "The deleteMe job was not deleted!!! %s", crontab1);
}