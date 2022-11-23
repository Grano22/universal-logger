import LoggerInterface from './LoggerInterface';
import LoggerOptions from './LoggerOptions';
import {LogLevel} from './LogLevel';
import LogRecord from './LogRecord';
import LoggerExtension from './LoggerExtension';
import LoggerExtensionOptions from './LoggerExtensionOptions';
import LoggerEmitter from './LoggerEmitter';

export default class Logger implements LoggerInterface {
    static readonly LEVELS : string[] = [
        LogLevel.DEBUG,
        LogLevel.INFO,
        LogLevel.NOTICE,
        LogLevel.WARN,
        LogLevel.ERROR,
        LogLevel.CRITICAL,
        LogLevel.ALERT,
        LogLevel.EMERGENCY
    ];

    #name : string;
    #records : LogRecord[] = [];
    #extensions : Record<string, LoggerExtension> = {};
    #emitter : LoggerEmitter;

    get name() : string
    {
        return this.#name;
    }

    constructor({
        name
    } : LoggerOptions = {})
    {
        this.#emitter = new LoggerEmitter();
        this.#name = name || 'anonymous-logger';
    }

    public addFromException(exception: Error | any): void
    {
        this.error(
            exception.message + ' captured in ' +
            exception.fileName + ' at ' +
            exception.fileNumber + ', stack: ' + exception.stack,
            []
        );
    }

    public emergency(message: string, context: any): void
    {
        this.addRecord(this.getLevelFromName(LogLevel.EMERGENCY), message, context);
    }

    public alert(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.ALERT), message, context);
    }

    public critical(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.CRITICAL), message, context);
    }
    
    public error(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.ERROR), message, context);
    }

    public warning(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.WARN), message, context);
    }

    public notice(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.NOTICE), message, context);
    }
    
    public info(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.INFO), message, context);
    }

    public debug(message: string, context: any): void {
        this.addRecord(this.getLevelFromName(LogLevel.DEBUG), message, context);
    }

    public log(level: number, message: string, context: any): void {
        this.addRecord(level, message, context);
    }

    public getRecords(): LogRecord[]
    {
        return this.#records;
    }

    public addRecord(level : number, message : string, context : any[]): boolean
    {
        try {
            if (!this.levelExists(level)) {
                throw new Error(`Level ${level} do not exist`);
            }

            const newRecord : LogRecord = {
                message,
                context,
                level,
                levelName:Logger.LEVELS[level],
                channel:this.#name,
                captureDateTime:new Date(),
                addon:[],
                toString() : string {
                    return `${this.captureDateTime.toISOString().slice(0, 19).replace('T', ' ')} | ${this.message}`;
                }
            };

            this.#records.push(newRecord);

            this.#emitter.emit('add_record', newRecord);

            return true;
        } catch(err) {
            return false;
        }
    }

    public getLevelFromName(levelName : string): number
    {
        return Logger.LEVELS.indexOf(levelName);
    }

    public levelExists(level : number): boolean
    {
        return typeof Logger.LEVELS[level] === 'string';
    }

    public levelNameExists(levelName : string): boolean
    {
        return Logger.LEVELS.indexOf(levelName) > 0;
    }

    /**
     * Register listener
     */
    public registerListener(eventName : string, listener : (...args: any[]) => (void | Promise<void>)) : void
    {
        this.#emitter.on(eventName, listener);
    }

    /**
     * Add extension to logger
     */
    public addExtension(
        extensionClass : new (conf : LoggerExtensionOptions) => LoggerExtension,
        extensionConfig : LoggerExtensionOptions
    ) {
        const newExtension = new extensionClass(extensionConfig);
        this.#extensions[newExtension.name] = newExtension;
        const extensionMethods = newExtension.register(this, extensionConfig);
        Object.defineProperty(this, newExtension.name, {
            value:extensionMethods,
            writable:false,
            enumerable:false,
            configurable:false
        });
    }
}