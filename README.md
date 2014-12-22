CronJobManager
==============

A node-cron wrapper that manages many jobs at once.

Installation
=============
```bash
npm install CronJobManager
```
Synopsis
============
```javascript
var CronJobManager = require('crontab_manager'),
manager = new CronJobManager( // this creates a new manager and adds the arguments as a new job.
'a_key_string_to_call_this_job',
'0 30 * * * *', // the crontab schedule
function() { console.log("tick - what should be executed?") },
{// extra options.. see https://github.com/ncb000gt/node-cron/blob/master/README.md for all available
  start:true,
  zone:"America/Los_Angeles",
  completion: function() {console.log("a_key_string_to_call_this_job has stopped....")}
} 
);
manager.add('next_job', '0 40 * * * *', function() { console.log('tick...')});
manager.start('next_job');
manager.stop('a_key_string_to_call_this_job');
manager.exists('next_job') //true
manger.update('a_key_string_to_call_this_job', "0 */2 * * * *", function() {console.log("now running this job every two minutes, using this function..."});
console.log("current jobs are: " + manager);



