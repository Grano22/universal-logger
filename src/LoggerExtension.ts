export default interface LoggerExtension
{
    readonly name : string;

    register(loggerAccessor) : Record<string, any>;
}