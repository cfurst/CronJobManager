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
    } catch (e) {
        assert(false, " Well... the add test failed...");
        console.error(e);
    }
}
