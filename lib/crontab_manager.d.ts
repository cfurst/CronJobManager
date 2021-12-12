export = CrontabManager;
declare class CrontabManager {
    constructor(key: string, tab: string, task: () => void, options: any)
    add(key: string, tab: string, task: () => void, options: any): void
    update(...args: any): void
    deleteJob(key: string): void
    start(key: string): void
    stop(key: string): void
    stopAll(): void
    toString(): string
    listCrons(): string
    exists(tabKey: string): boolean
}