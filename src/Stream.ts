export interface IStream<Data, End> {
    process(onData: (data: Data) => void, onEnd: (end: End) => void): void;
}
