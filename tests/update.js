/**
 * http://usejsdoc.org/
 */
const CronJobManager = require('../lib/crontab_manager'),
cronTab = new CronJobManager();

exports.test = () => {
    let currDate = new Date();
  cronTab.add('updateTest', currDate, () => {console.log("update Cron... wooo!")});
  //update the tab - string
  let tabString = '0 */2 * * * *';
  cronTab.update('updateTest', tabString);
  console.assert(/0 \*\/2 \* \* \* \*/.test(cronTab), `Could not find updated crontab String! ${cronTab}`);
  
  //update the tab - Date;
  let testDate = new Date('2018-08-24T09:57:22-0400');
  cronTab.update('updateTest', testDate);
  console.assert(/Fri Aug 24 2018 09\:57\:22 GMT-0400 \(EDT\)/.test(cronTab), `Could not find updated Crontab date! ${cronTab}`);
  
  //update the task
  let newFunc = function() {
      
      console.log("you can now doo a double wooo... wooo wooo....");
  }
  
  cronTab.update('updateTest', newFunc);
  console.assert(`${cronTab}`.search("double wooo"), "coulnd't the update task when updating just the task!");
  
  //update the tab and the task - we know the update tab works. We just need to make sure the task gets updated.
  cronTab.update('updateTest', testDate, () => {console.log("A New Task!")});
  
  console.assert(`${cronTab}`.search("A New Task!"), "could't find the updated task when updating tab and task!");
   
  
};
