/* eslint
    "@typescript-eslint/no-empty-interface": off
*/

import { DataOrPromise } from "./Promise"

export type StreamLimiter = null | {
    /**
     * maximum amount of times onData is called
     */
    maximum: number
    /**
     * if the provider knows that the amount of records exceeds 'maximum', it can choose to send even less records, even 0.
     */
    abortEarly: boolean
}

/**
 * the return type indicates if the stream should be aborted. If a promise is returned, the stream will suppress further onData calls until the promise is resolved
 */
export type OnData<Data, ReturnType> = (data: Data) => DataOrPromise<ReturnType>

export type StreamProcessor<Data, ReturnType, EndData> = (limiter: StreamLimiter, onData: OnData<Data, ReturnType>, onEnd: (aborted: boolean, endData: EndData) => void) => void

/**
 * a minimalistic interface that supports streaming
 */
export interface IStream<Data, ReturnType, EndData> {
    /**
     * @param limiter the limiter is a hint to the stream provider to limit the amount of times onData is called.
     * @param onData callback for a data element
     * the second argument (abort) requests the provider to abort the stream. It is not guaranteed that the provider do so.
     * If a promise is returned, the stream will suppress further onData calls until the promise is resolved
     * @param onEnd callback that will be called when the stream is finished. aborted will be set to true if not the full dataset is received. This will always be caused by the caller
     * either by setting the limiter or by calling the abort function on onData
     */
    processStream(
        limiter: StreamLimiter,
        onData: OnData<Data, ReturnType>,
        onEnd: (aborted: boolean, data: EndData) => void
    ): void
}

/**
 * a key/value pair where the key is a string and the value is generic
 */
export type KeyValuePair<Type> = {
    key: string
    value: Type
}


export type KeyValueStreamProcessor<Data, ReturnType, EndData> = StreamProcessor<KeyValuePair<Data>, ReturnType, EndData>


/**
 * a stream for key value pairs
 */
export interface IKeyValueStream<Data, ReturnType, EndData> extends IStream<KeyValuePair<Data>, ReturnType, EndData> { }
