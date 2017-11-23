

export class PokerTableNotFoundException implements Error {
    name: string;
    message: string;
    stack?: string;
}