/* eslint
    "@typescript-eslint/no-empty-interface": off
*/

import { IValue } from "./Value"

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
 * an implementation of this interface is needed as an argument to the IStream.handle() method.
 */
export interface IStreamHandler<Data, EndData> {
    /**
     * onData is called when the stream has the next piece of Data available.
     * The consumer should return an IValue<boolean>. the boolean indicates if the stream should be aborted or not, so the default return value should be 'false'
     * The boolean is wrapped in an IValue to allow the consumer to do an asynchronous action based on the data received;
     * The next onData call or the onEnd call will not be done before the IValue's promise is resolved
     */
    onData: (data: Data) => IValue<boolean>
    /**
     * The onEnd is called when there is no data left.
     */
    onEnd: (aborted: boolean, endData: EndData) => void
}

/**
 * the return type indicates if the stream should be aborted. If a promise is returned, the stream will suppress further onData calls until the promise is resolved
 */

export type HandleStreamFunction<Data, EndData> = (
    limiter: StreamLimiter,
    consumer: IStreamHandler<Data, EndData>
) => void

/**
 * a minimalistic interface that supports streaming
 */
export interface IStream<Data, EndData> {
    /**
     * @param limiter the limiter is a hint to the stream provider to limit the amount of times onData is called.
     * @param onData callback for a data element
     * the second argument (abort) requests the provider to abort the stream. It is not guaranteed that the provider do so.
     * If a promise is returned, the stream will suppress further onData calls until the promise is resolved
     * @param onEnd callback that will be called when the stream is finished. aborted will be set to true if not the full dataset is received. This will always be caused by the caller
     * either by setting the limiter or by calling the abort function on onData
     */
    handle(
        limiter: StreamLimiter,
        consumer: IStreamHandler<Data, EndData>,
    ): void
}

/**
 * a key/value pair where the key is a string and the value is generic
 */
export type KeyValuePair<Type> = {
    key: string
    value: Type
}


export type HandleKeyValueStreamFunction<Data, EndData> = HandleStreamFunction<KeyValuePair<Data>, EndData>


/**
 * a stream for key value pairs
 */
export interface IKeyValueStream<Data, EndData> extends IStream<KeyValuePair<Data>, EndData> { }
