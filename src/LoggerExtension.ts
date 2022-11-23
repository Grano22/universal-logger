export default interface LoggerExtension extends Object
{
    readonly name : string;

    register(loggerAccessor: any, extensionConfig: any) : Record<string, any>;
}