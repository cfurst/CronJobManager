/**
 * http://usejsdoc.org/
 */
const CronJobManager = require('../lib/crontab_manager'),
cronTab = new CronJobManager();

exports.test = () => {
   let additionalOptions = {utcOffset: "-5", onComplete: () => {console.log("I'm done working")},start: true}
   cronTab.add("test update with additional", "* * * * * *", () => {console.log("shhh.. I'm working!")}, additionalOptions )
   cronTab.update("test update with additional", () => {console.log("shh... I'm still working!")});
   [
     "cronTime",
     "context",
     "onComplete",
    "unrefTimeout"
   ].forEach( (key) => {
                              console.log(key)
                                if (key === "cronTime" && cronTab.jobs["test update with additional"][key] !== undefined && cronTab.jobs["test update with additional"][key].hasOwnProperty('utcOffset')) console.assert(cronTab.jobs["test update with additional"][key].utcOffset === additionalOptions.utcOffset, `${key} did not pass jobs value: ${cronTab.jobs["test update with additional"][key].utcOffset} additionalOptions: ${additionalOptions.utcOffset}`)
                                else if (cronTab.jobs["test update with additional"].hasOwnProperty(key) && additionalOptions.hasOwnProperty(key)) console.assert(cronTab.jobs["test update with additional"][key] === additionalOptions[key], `${key} did not pass: jobs value: ${cronTab.jobs["test update with additional"][key]}, additionalOptions valud: ${additionalOptions[key]}`)
                              })
  
}; 
