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
  console.assert(/Fri Aug 24 2018 09\:57\:22 GMT-0400/.test(cronTab), `Could not find updated Crontab date! ${cronTab}`);

  //update the task
  let newFunc = function() {

      console.log("you can now doo a double wooo... wooo wooo....");
  }

  cronTab.update('updateTest', newFunc);
  console.assert(`${cronTab}`.search("double wooo"), "coulnd't the update task when updating just the task!");

  //update the tab and the task - we know the update tab works. We just need to make sure the task gets updated.
  cronTab.update('updateTest', testDate, () => {console.log("A New Task!")});

  console.assert(`${cronTab}`.search("A New Task!"), "could't find the updated task when updating tab and task!");

  let thirtyOne = 31
  cronTab.add(thirtyOne.toString(),new Date(), () => {console.log("new Job...")})
  cronTab.update(thirtyOne.toString(), new Date(), () => {console.log("updated 31...")})

  console.assert(`${cronTab}`.search("updated 31..."), "couldn't the update task when updating a task with a number literal coerced to string.");

   let additionalOptions = {utcOffset: "-5", onComplete: () => {console.log("I'm done working")},start: true}
   
   function testAdditionalOptions() {
    [
      "cronTime",
      "context",
      "onComplete",
     "unrefTimeout"
    ].forEach( (key) => {
                                 if (key === "cronTime" && cronTab.jobs["test update with additional"][key] !== undefined && cronTab.jobs["test update with additional"][key].hasOwnProperty('utcOffset')) console.assert(cronTab.jobs["test update with additional"][key].utcOffset === additionalOptions.utcOffset, `${key} did not pass jobs value: ${cronTab.jobs["test update with additional"][key].utcOffset} additionalOptions: ${additionalOptions.utcOffset}`)
                                 else if (cronTab.jobs["test update with additional"].hasOwnProperty(key) && additionalOptions.hasOwnProperty(key)) console.assert(cronTab.jobs["test update with additional"][key] === additionalOptions[key], `${key} did not pass: jobs value: ${cronTab.jobs["test update with additional"][key]}, additionalOptions valud: ${additionalOptions[key]}`)
                               })
   }
   cronTab.add("test update with additional", "* * * * * *", () => {console.log("shhh.. I'm working!")}, additionalOptions )
   cronTab.update("test update with additional", () => {console.log("shh... I'm still working!")});
   testAdditionalOptions()
   cronTab.update("test update with additional", "*/2 * * * * *")
   testAdditionalOptions()
   
  
}; 
