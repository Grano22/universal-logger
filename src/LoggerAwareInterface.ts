import LoggerInterface from "./LoggerInterface";

export default interface LoggerAwareInterface
{
    /**
     * Sets a logger instance on the object.
     */
    setLogger(logger : LoggerInterface) : void;
 }