/**
 * 
 */
const
CronJobManager = require('../lib/crontab_manager');
exports.test = () => {
    let 
    dateForDateTesting,
  //vanilla
    crontab1 = new CronJobManager();
    
    console.assert(crontab1 instanceof CronJobManager, "Vanilla constructor was not successful");
    
    //basic crontab
    crontab1 = new CronJobManager('key1', '* * * * * *', () => {});
    console.assert(crontab1 instanceof CronJobManager && crontab1.exists('key1'), "basic constructor with crontab did not work...");
    
    // additional options passed and starts the job
    crontab1 = new CronJobManager('key2', "* * * * * *", () => {console.log("String tab constructor wooo.....")}, {start: true, onComplete: () => {console.log("Ok... you can stop now!")}});
    console.assert(crontab1 instanceof CronJobManager && crontab1.exists('key2') && /Running/.test(crontab1.listCrons), "could not find a running job when {start: true} was passed");
    setTimeout(() => {
        crontab1.stop('key2');
        
    }, 3000);
    
    // pass a date to the constructor
    dateForDateTesting = new Date();
    dateForDateTesting.setSeconds(dateForDateTesting.getSeconds() + 1);
    crontab2 = new CronJobManager('key3', dateForDateTesting, () => {console.log("Date Constructor wooo.....")}, {start: true, onComplete: () => {console.log("date constructor job stopped...")}});
}