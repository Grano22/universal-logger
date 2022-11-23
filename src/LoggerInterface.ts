export default interface LoggerInterface
{
    /**
     * Make log from exception
     */
    fromException(exception: Error | any);

    /**
     * System is unusable
     */
    emergency(message : string, context : any): void;

    /**
     * Action must be taken immadiately
     * 
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     */
    alert(message : string, context : any): void;

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     */
    critical(message : string, context : any): void;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     */
    error(message : string, context : any): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     */
    warning(message : string, context : any): void;
 
    /**
     * Normal but significant events.
     */
    notice(message : string, context : any): void;
 
    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     */
    info(message : string, context : any): void;
 
     /**
      * Detailed debug information.
      */
    debug(message : string, context : any): void;
 
     /**
      * Logs with an arbitrary level.
      */
    log(level : number, message : string, context : any): void;
 }

 
