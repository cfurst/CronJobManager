/**
* crontabmanager.js - post callbacks to cronjobs
* - create, update, delete cronjobs via the net
* please see https://github.com/ncb000gt/node-cron and http://crontab.org/ for crontab info
* Synopsis:
*  var CronTabManager = require('crontab_manager'),
*  myCronTabManager = new CronTab(key, '* 2/2 13-16 * *', function, options  ) // or
*  myCronTabManager = new CronTab()
* in the first form, a new job is created on key 'key' with onTick set to 'function', cronTime is set to '* 2/2 13-16 * *', and options can include stuff like start, onComplete, and timeZone
* the second form just a new manager is created to which you can add jobs. Remember jobs do not start automatically, you have to set options to {start: true} or call start() after the job is created.
*
* Other methods include:
*  myCronTabManager.update(key, newCronString) //or
*  myCronTabManager.upadte(key, tabOrfunction) // or
*  myCronTabManager.update(key, tab,function)
*  myCronTabManager.stop(key)
*  myCronTabManager.start(key)
*  myCronTabManager.deleteJob(key)
*  myCronTabManager.add(key, cronString, function, options)
*
* currently you cannot set context for any job.
*/

var CronJob = require('cron').CronJob;
function CrontabManager(key, tab, task, options) {
	this.jobs = {};
	if (key && tab && task)
		this.add(key, tab,task,options);

}

CrontabManager.prototype.add = function(key, tab, task, options) {

	if ((typeof tab === 'string' || tab instanceof Date) && typeof key === 'string' && task instanceof Function) {
		// console.log(JSON.stringify(options, null, " "));
		options = combineOptions(tab, task, options);
		// console.log(JSON.stringify(options, null, " "));
	   try {
	   	   if (this.jobs[key]) {
	   	   	   this.deleteJob(key);
	   	   	   console.warn(`${key} already existed and was deleted from the manager...`);
	   	   }
		this.jobs[key] = new CronJob(options);
	   } catch(fooBaredByUser) {
	   	console.error(`crontab: ${tab} possibly not valid, job ${key} not started...${fooBaredByUser.message}`);
	   }
	}
	else
		console.warn(`couldn't add: ${key} improper arguments`);
}

CrontabManager.prototype.update = function() {
	if (arguments.length === 2) {
		//console.log("arguments are 2 units long." )
		//console.log(arguments)
		if (typeof arguments[1] === 'string' || arguments[1] instanceof Date)
			updateTab.call(this, arguments[0], arguments[1]);
		else if (arguments[1] instanceof Function)
			updateTask.call(this,  arguments[0], arguments[1]);
	} else if (arguments.length === 3) {
		updateTab.call(this, arguments[0], arguments[1])
		updateTask.call(this,  arguments[0], arguments[2])
	} else
		console.error(`incorrect number of arguents passed to update.. won't update.. ${arguments[0]}`);
}

CrontabManager.prototype.deleteJob = function(key) {
	try {
		this.jobs[key].stop();
		delete this.jobs[key];
	} catch (err) { console.error(`error in trying to stop job: ${key}: ${err}`) }
}

CrontabManager.prototype.start = function(key) {
	try {
		if (this.jobs[key].running)
			console.warn(`${key} job already running`);
		else
			this.jobs[key].start();
	}catch (err) {
		console.error(`couldn't start job: ${key}: ${err}`);
	}
}

CrontabManager.prototype.stop = function(key) {
	try {
		if (! this.jobs[key].running )
			console.warn(`${key} job already stopped`);
		else
			this.jobs[key].stop();

	}
	catch(err) {
		console.error(`couldn't stop job: ${key}: ${err}`)
	}
}

CrontabManager.prototype.stopAll = function() {
	for (jobKey in this.jobs) {
		try {
			this.jobs[jobKey].stop()
		}catch(err) {

		}
	}
}

CrontabManager.prototype.toString = function() {
	var manString = "{\n";
	for (jobKey in this.jobs) {

	  manString += `'${jobKey}': ${this.jobs[jobKey].cronTime.source}: ${this.jobs[jobKey]._callbacks[0]}: ${this.jobs[jobKey].running ? "Running" : "Stopped"}`
	}
	manString += "\n}";
	return manString;
}

CrontabManager.prototype.listCrons = function() {
	var manString = "{\n";
	for (jobKey in this.jobs) {
		manString += `'${jobKey}': ${this.jobs[jobKey].cronTime.source} status: ${this.jobs[jobKey].running ? "Running" : "Stopped"} \n`;
	}
	manString += "\n}";
	return manString;
}

CrontabManager.prototype.exists = function(tabKey) {
	if (this.jobs[tabKey])
		return true;
	return false;
}

function combineOptions(tab, task, options) {
	var newOpts = {};
	newOpts.cronTime = tab; newOpts.onTick = task

	if (options instanceof Object) {
		// might overwrite... please be careful.
		for (optionKey in options)
			newOpts[optionKey] = options[optionKey];
	}
	return newOpts;
}

function updateTab(key, cronstring) {

	try {
		var running = this.jobs[key].running;
	  this.jobs[key].stop()

	  if (typeof cronstring === 'string' || cronstring instanceof Date)
	  	  this.jobs[key] =  new CronJob(cronstring, this.jobs[key]._callbacks[0], this.jobs[key].onComplete, running, this.jobs[key].zone)
	  else 
	  	  throw new Error(`The cron definition passed was not a string or a Date object! ${key} was stopped and not updated`);    
	} catch (tabErr) {
		console.error(`error updating tab: ${key} - ${tabErr.message}`);
	}
}

function updateTask(key, task) {
	try {
	var running = this.jobs[key].running;
	  this.jobs[key].stop()

	  if ( ! ( task instanceof Function) ) {
	  	  console.error(`can't update with something that is not a function: ${typeof(task)}`)
	  	  return
	  }

	  	  this.jobs[key] =  new CronJob(this.jobs[key].cronTime.source, task, this.jobs[key].onComplete, running, this.jobs[key].zone)


	} catch (tabErr) {
		console.error(`error updating task: ${key}  - ${tabErr.message}`);
	}
}

module.exports = CrontabManager;
