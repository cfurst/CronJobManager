const CronJobManager = require('..');

jobmanager = new CronJobManager();

var date = new Date();
date.setMinutes(date.getMinutes() + 1);

console.log('will log wow at:', date);

jobmanager.add('jobid', date, () => {
  console.log('wow');
})

jobmanager.start('jobid');
