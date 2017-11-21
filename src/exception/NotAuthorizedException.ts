

export class NotAuthoreizedException implements Error {
    name: string;
    message: string;
    stack?: string;
}