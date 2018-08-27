const CronJobManager = require('..');
exports.test = () => {
    try {
        var jobmanager = new CronJobManager();
        
        var date = new Date();
        date.setSeconds(date.getSeconds() + 1);
        
        console.log('will log wow at:', date);
        
        jobmanager.add('jobid', date, () => {
          console.log('wow');
        })
        
        jobmanager.start('jobid');
        jobmanager.add('newJob', date, () => {console.log("added a second job...")})
        
        console.assert(jobmanager.exists('newJob') && jobmanager.exists('jobid'), `An added job is missing: ${jobmanager}`)
    } catch (e) {
        console.assert(false, `Well... the add test failed...${e}`);
        console.error(e);
    }
}
