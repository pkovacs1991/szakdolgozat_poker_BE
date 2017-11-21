

export class RecordNotFoundException implements Error {
    name: string;
    message: string;
    stack?: string;
}