import LoggerExtension from "../../LoggerExtension";
import { LogLevel } from "../../LogLevel";
import LogRecord from "../../LogRecord";
import { LoggerConsoleModifiers } from './LoggerConsoleModifiers';

export default class LoggerConsole implements LoggerExtension
{
    readonly name: string = 'console';

    register(loggerAccessor: any): Record<string, any> {
        const proto = {
            async stdoutError(entry : LogRecord) {
                process.stdout.write(LoggerConsoleModifiers.BgRed + entry.toString() + LoggerConsoleModifiers.Reset + '\n');
            },
            async stdoutWarn(entry : LogRecord) {
                process.stdout.write(LoggerConsoleModifiers.BgRed + entry.toString() + LoggerConsoleModifiers.Reset + '\n');
            },
            async stdout(entry : LogRecord) {
                let strEntry = entry.toString();
                strEntry = strEntry.replace(
                    /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]/,
                    LoggerConsoleModifiers.FgCyan + '$&' + LoggerConsoleModifiers.Reset
                );
                process.stdout.write(strEntry + '\n');
            },
            async stdoutTyped(entry : LogRecord) {
                if (entry.levelName === LogLevel.ERROR) {
                    await proto.stdoutError(entry);
                } else if(entry.levelName === LogLevel.WARN) {
                    await proto.stdoutWarn(entry);
                } else {
                    await proto.stdout(entry);
                }
            }
        };
        loggerAccessor.registerListener('add_record', (entry: LogRecord) => proto.stdoutTyped(entry));

        return proto;
    }

}