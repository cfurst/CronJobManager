var JobManager = require('../lib/crontab_manager'),

crons = new JobManager();

crons.add("first_key", '0 48 * * * *' , () => {console.log("=====> 30 minutes past the hour: " + new Date().getHours())});

crons.update("first_key", '0 49 * * * *');
crons.start("first_key");
console.log("we have crons: " + crons);
