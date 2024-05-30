import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(data => {
            const { timestamp, level, message, ...meta } = data;
            return `${timestamp} ${JSON.stringify({ level, message, meta })}`;
        })
    ),
    transports: [
        // Store controller wrapper errors in a daily rotating file
        new DailyRotateFile({
            level: 'error',
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        // Info level logging in a daily rotating file
        new DailyRotateFile({
            level: 'info',
            filename: 'logs/info-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        // Console transport for all levels
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
        // Add more transports here if needed
    ],
    exceptionHandlers: [
        // Application high-level exception store in a daily rotating file
        new DailyRotateFile({
            filename: 'logs/exception-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});
