export = CrontabManager;
declare class CrontabManager {
    constructor(key: string, tab: CrontabTypes.Tab, task: () => void, options?: CrontabTypes.Options)
    add(key: string, tab: CrontabTypes.Tab, task: () => void, options?: CrontabTypes.Options): void
    update(...args: any): void
    deleteJob(key: string): void
    start(key: string): void
    stop(key: string): void
    stopAll(): void
    toString(): string
    listCrons(): string
    exists(tabKey: string): boolean
}

declare namespace CrontabTypes {
    export type Tab = string | Date
    export interface Options {
        cronTime?: Tab
        onTick?: () => void
        onComplete?: () => void
        start?: boolean
        timezone?: string
        context?: any
        runOnInit?: boolean
        utcOffset?: string
        unrefTimeout?: boolean
    }
}