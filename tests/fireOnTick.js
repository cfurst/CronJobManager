let CronTabManager = require('../lib/crontab_manager.js')
exports.test= () => {
    new Promise((resolve) => {

        let execDate = new Date()
        let jobManager = new CronTabManager('fire_on_tick', execDate, () => { resolve() })
        jobManager.fireOnTick('fire_on_tick')

    }).then(() => { console.log("fireOnTick fired... ") }).catch((e) => { console.assert(false, "fireOnTick Failed...%s", e.message) })

}

