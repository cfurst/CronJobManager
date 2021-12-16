/**
 * 
 */

var CronJobManager = require('../lib/crontab_manager');
exports.test = () => {
    let date = new Date();
    crontab1 = new CronJobManager('deleteMe', date, () =>{console.log("delete me...")} );
    crontab1.deleteJob('deleteMe');
    date = new Date()
    crontab1.add('deleteEverything', date, () => {console.log("going to delete everything")} );
    crontab1.add('deleteEverythingMeansEverything', date,() => {console.log("going to delete everything")} );
    crontab1.stopAll()
    crontab1.deleteAll()
    console.assert(! crontab1.jobs.deleteMe, "The deleteMe job was not deleted!!! %s", crontab1);
    console.assert(! (crontab1.exists("deleteEverything") || crontab1.exists("deleteEverythingMeansEverything")), "Couldn't delete all jobs! %s", crontab1)
}