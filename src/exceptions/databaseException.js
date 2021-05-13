import HttpStatus from 'http-status-codes';

export default class databaseException extends ExtendableError {
    constructor(
        message = 'Database exception occurred',
        data,
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        super(message, statusCode, errorCode);
        this.name = 'DatabaseException';
    }
}
