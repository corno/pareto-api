export interface IStream<Data> {
    process(onData: (data: Data) => void, onEnd: () => void): void;
}
