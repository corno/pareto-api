export type StreamLimiter = null | {
    /**
     * maximum amount of times onData is called
     */
    maximum: number,
    /**
     * if the provider knows that the amount of records exceeds 'maximum', it can choose to send even less records, even 0.
     */
    abortEarly: boolean
}

export type StreamProcessor<Data> = (limiter: StreamLimiter, onData: (data: Data, abort: () => void) => void, onEnd: (aborted: boolean) => void) => void

/**
 * a minimalistic interface that supports streaming
 */
export interface IInStream<Data> {
    /**
     * @param limiter the limiter is a hint to the stream provider to limit the amount of times onData is called.
     * @param onData callback for a data element, the second argument (abort) requests the provider to abort the stream. This is not quaranteed
     * @param onEnd callback that will be called when the stream is finished. aborted will be set to true if not the full dataset is received. This will always be caused by the caller
     * either by setting the limiter or by calling the abort function on onData
     */
    processStream(limiter: StreamLimiter, onData: (data: Data, abort: () => void) => void, onEnd: (aborted: boolean) => void): void
}

/**
 * a key/value pair where the key is a string and the value is generic
 */
export type KeyValuePair<Type> = {
    key: string,
    value: Type
}


export type KeyValueStreamProcessor<Data> = StreamProcessor<KeyValuePair<Data>>


/**
 * a stream for key value pairs
 */
export interface IInKeyValueStream<Data> extends IInStream<KeyValuePair<Data>> {}
