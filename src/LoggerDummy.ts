import LoggerInterface from "./LoggerInterface";

export default class LoggerDummy implements LoggerInterface
{
    fromException(exception: any) {
        
    }

    emergency(message: string, context: any): void {
        
    }

    alert(message: string, context: any): void {
        
    }

    critical(message: string, context: any): void {
        
    }

    error(message: string, context: any): void {
        
    }

    warning(message: string, context: any): void {
        
    }

    notice(message: string, context: any): void {
        
    }

    info(message: string, context: any): void {
        
    }

    debug(message: string, context: any): void {
        
    }
    
    log(level: number, message: string, context: any): void {
        
    }
    
}