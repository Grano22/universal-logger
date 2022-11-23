export default interface LogRecord {
    message : string;
    context : any;
    level : number;
    levelName : string;
    channel : string;
    captureDateTime : Date;
    addon: any[];
    toString: () => string;
}