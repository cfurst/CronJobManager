CronJobManager
==============

A node-cron wrapper that manages many jobs at once. This is built using of [Nick Campbell's node-cron fork](https://github.com/ncb000gt/node-cron).

Installation
=============
```bash
npm install cron-job-manager
```
Testing
===========
```bash
npm test
```
Any assertion that fails should throw an uncaught error.

Synopsis
============
```javascript
var CronJobManager = require('cron-job-manager'),
manager = new CronJobManager( // this creates a new manager and adds the arguments as a new job.
'a_key_string_to_call_this_job',
'0 30 * * * *', // the crontab schedule
() => { console.log("tick - what should be executed?") },
{
// extra options.. 
// see https://github.com/ncb000gt/node-cron/blob/master/README.md for all available
  start:true,
  timeZone:"America/Los_Angeles",
  onComplete: () => {console.log("a_key_string_to_call_this_job has stopped....")}
} 
);
manager.add('next_job', '0 40 * * * *', () => { console.log('tick...')});
manager.start('next_job');
manager.stop('a_key_string_to_call_this_job');
manager.exists('next_job') //true
manger.update('a_key_string_to_call_this_job', 
  "0 */2 * * * *", 
  () => {console.log("now running this job every two minutes, using this function..."});
console.log(\`current jobs are: ${manager}\`);
```
Create a Manager
===
creating a manager object is easy, you can create one with arguments that become a new job, or just create one to add jobs to later:
```javascript
var manager1 = new CronJobManager('a key to identify the job', 
  '30 * * * * *', 
  taskFunction,
  {
    start: true, 
    onComplete: taskCompleteFunction, 
    timeZone:"Australia/Sydney"
  }),
manager2 = new CronJobManager();
```
the final options object is optional, these are options that are past to node-cron and they include the following:
  * start: true/false
  * onComplete: function - runs when the job is stopped
  * timeZone: MUST have time installed for this work - see [the node-cron readme](https://github.com/ncb000gt/node-cron/blob/master/README.md) for more details.

Adding jobs
===
jobs are added with arguments similar to the above with the *add* function:
```javascript
manager.add('key','* 30 * * * *', taskFunction)
```
in this case, with the final options object left out of the arguments, the job will be created with the defaults as per node-cron, this means the job will not start until you tell it to, there will be no completion function and the time zone  will default to whatever you have your node.js process set to use. 

If the key you are using already exits in the manager, that key will be overwriten, the original job will stop and this one will  take its place. A warning will be printed to the log when this happens.

Starting Jobs
===
To start a job you can use the *start* function
```javasctipt
manager.start('key')
```
Stopping Jobs
===
Stopping is the same as start with the *stop* function
```javascript
manager.stop('key')
```
Stopping All Jobs
===
To just stop all the jobs in the manager use *stopAll*
```javascript
manager.stopAll()
```
Any arguments are ignored.

Updating jobs
===
You may want to change the task, time or both of any job during execution. You can do so using the *update* function
```javascript
manager.update('key', '0 15 3,5,9,14,18,20 * * *', () => {// do this instead on this new schedule
});
manager.update('key', () => { // do this instead 
});
manager.update('key', '0 15 3,5,9,14,18,20 * * *') // do it on this schedule instead.
```
the old job on the old schedule will be stopped, changed and started again if it was running when you called *update*. If you are just changing the function, the job will continue to use the current scheudle. If you are just changing the schedule the job will continue to use the current function.

Deleting jobs
===
you can delete any currently stopped or running jobs using the *deleteJob* function
```javascript
manager.deleteJob('key')
```
The job will be stopped and then removed from the manager, any attempt to alter *key* after deletion will result in an error message to the log since it no longer exists.

Viewing jobs
===
if you want to see what jobs you have set up, you can just pass your manager as a string. It will display a formatted list of jobs, and their crontabs, and if they have a function to run.
```javascript
console.log(\`I got the current jobs: ${manager}\`)
```
If you need more details or would like to pass the string somewhere else you can use the *listCrons* function
```javascript
var jobs = manager.listCrons();
doSomethingWithJobList(jobs);
````

Checking for existing jobs
===
To check to see if a job exists with a specific key use the *exists* function
```javascript
if (manager.exists('key')) console.log("key exists");
```
