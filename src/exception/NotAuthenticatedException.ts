

export class NotAuthenticatedException implements Error {
    name: string;
    message: string;
    stack?: string;
}