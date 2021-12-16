/**
 * http://usejsdoc.org/
 */
const CronJobManager = require('../lib/crontab_manager');
const now = new Date()
exports.test = () => {
    let jobManager = new CronJobManager('newJob', '* * * * * *', () => { console.log('tick...') }, { onComplete: () => { console.log('newJob stopped. Start/stop test successfull') } });
    let jobStateRegexp = /(Running)|(Stopped)/gm
    jobManager.start('newJob');

    console.assert(`${jobManager}`.search('Running'), `Couldn't find a Running state for started job: ${jobManager}`);

    jobManager.stop('newJob');

    console.assert(`${jobManager}`.search('Stopped'), `Couldn't find a Stopped state for stopped job: ${jobManager}`);
    // TODO: start/stop all

    jobManager.add('secondJob', now, () => { console.log("second job  tick...") }, { onComplete: () => { console.log('secondJob stopped. Start/stop test successfull') } } )

    jobManager.startAll()

    console.assert([...`${jobManager}`.matchAll(jobStateRegexp)].length == 2, "Couldn't find started jobs for start all!!")

    jobManager.stopAll()

    console.assert([...`${jobManager}`.matchAll(jobStateRegexp)].length == 2, "Couldn't find stopped jobs for stop all!!")


};

