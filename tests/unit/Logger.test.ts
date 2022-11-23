import Logger from "../../src/Logger";
import {expect} from "@jest/globals";

const MOCKED_DATE = new Date(`2019-04-07T10:20:30Z`);

beforeEach(() => {
    process.env.TZ = 'GMT';
    jest.spyOn(Date.prototype, 'setDate').mockReturnValue(+MOCKED_DATE);
    global.Date.now = jest.fn(() => MOCKED_DATE.getTime());
    jest.spyOn(global, 'Date').mockImplementation(() => MOCKED_DATE);
});

describe('Test logger library', () => {
    it('Logs are accessible after add', () => {
        // Arrange
        const logger = new Logger({name: 'test'});

        logger.error('Error!', {});
        logger.alert('Alert!', {});
        logger.warning('Warn!', {});
        logger.critical('Critical error!', {});
        logger.debug('Debug log!', {});
        //logger.addFromException(new Error('Log created from exception'));


        // Act
        const logRecords = logger.getRecords();

        // Assert
        expect(logRecords).toMatchObject([
            {
                "addon": [],
                "captureDateTime": MOCKED_DATE,
                "channel": "test",
                "context": {},
                "level": 4,
                "levelName": "error",
                "message": "Error!",
            },
            {
                "addon": [],
                "captureDateTime": MOCKED_DATE,
                "channel": "test",
                "context": {},
                "level": 6,
                "levelName": "alert",
                "message": "Alert!",
            },
            {
                "addon": [],
                "captureDateTime": MOCKED_DATE,
                "channel": "test",
                "context": {},
                "level": 3,
                "levelName": "warn",
                "message": "Warn!",
            },
            {
                "addon": [],
                "captureDateTime": MOCKED_DATE,
                "channel": "test",
                "context": {},
                "level": 5,
                "levelName": "critical",
                "message": "Critical error!",
            },
            {
                "addon": [],
                "captureDateTime": MOCKED_DATE,
                "channel": "test",
                "context": {},
                "level": 0,
                "levelName": "debug",
                "message": "Debug log!",
            },
        ]);
    });
});