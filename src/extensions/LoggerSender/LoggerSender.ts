import { promisify } from 'util';
import fs from 'fs';
import LoggerSenderOptions from '../../LoggerSenderOptions';
import LoggerExtension from '../../LoggerExtension';
import LogRecord from '../../LogRecord';

export default class LoggerSender implements LoggerExtension
{
    readonly name: string = 'sender';
    readonly target = 'node';

    #config : LoggerSenderOptions = {};

    constructor({ path } : LoggerSenderOptions) {
        this.#config.path = path || '';
    }

    public register(loggerAccessor: any, extensionConfig: any): Record<string, any>
    {
        const proto = {
            async appendRecordsToFile(entries : LogRecord[], path = '') {
                try {
                    if (path === '') {
                        path = extensionConfig.path;
                    }
                    const appendToFile = promisify(fs.appendFile);
                    for (const entry of entries) {
                        await appendToFile(path + 'all.log', entry.toString());
                    }
                } catch(err) {
        
                }
            },
            async sendRecordsToServer(serverUrl : string) {
                const http = import('https');
                (await http)!.request({
                    host:serverUrl,
                    method:'post',
                })!.socket!.unref();
            }
        };
        loggerAccessor.registerListener('add_record', (entry: LogRecord) => proto.appendRecordsToFile([entry]));
        
        return proto;
    }
}