/**
 * http://usejsdoc.org/
 */
const CronJobManager = require('../lib/crontab_manager');

exports.test = () => {
    let jobManager = new CronJobManager('newJob', '* * * * * *', () =>  {console.log('tick...')}, {onComplete: () => {console.log('newJob stopped. Start/stop test successfull')}} ) ;
    jobManager.start('newJob');

    console.assert(`${jobManager}`.search('Running'), `Couldn't find a Running state for started job: ${jobManager}`);

    jobManager.stop('newJob');
};

