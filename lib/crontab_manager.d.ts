export = CrontabManager
declare interface CrontabOptions {
    cronTime: string,
    onTick: (): void,
    onComplete?: (): void,
    start?: boolean,
    timeZone?: string,
    context?: any,
    runOnInit?: boolean,
    utcOffset?: string,
    unrefTimeout: boolean
}
declare class CrontabManager {
    constructor(key: string, tab: string, task: () => void, options: CrontabOptions)
    add(key: string, tab: string | Date, task: () => void, options: CrontabOptions): void
    update(key: string, arg1: any): void // arg1 can be a cron expression as a string, or a Date object to update the timing. It can be a function to update the task.
    deleteJob(key: string): void
    start(key: string): void
    stop(key: string): void
    stopAll(): void
    toString(): string
    listCrons(): string
    exists(tabKey: string): boolean
}