import LogRecord from "../../LogRecord";

export default class LoggerBrowserSender
{
    public register(loggerAccessor: any, extensionConfig: any): Record<string, any>
    {
        const proto = {
            async sendRecordsToServer(serverUrl : string, postData : Record<string, any>) {
                if (typeof navigator.sendBeacon === "function")
                {
                    navigator.sendBeacon(serverUrl, JSON.stringify(postData));
                }
            }
        };
        loggerAccessor.registerListener(
            'add_record',
            (entry: LogRecord) => proto.sendRecordsToServer(extensionConfig.serverUrl, entry)
        );
        
        return proto;
    }
}