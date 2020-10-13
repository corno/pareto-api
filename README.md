# pareto-api

this package defines the API for the pareto package (https://github.com/corno/pareto)
This package can be included in packages that only define API's and that want to use the pareto style of programming

pareto has the following interfaces:
* `Value`

    Value is a promise like interface

    it supports the following method:
    * `handle`

    there are 2 flavors: `IValue` and `IUnsafeValue`.
    
    The unsafe value has a possible error state (which is similar to the native `Promise` class, but where the error is typesafe).

    The safe value does not have an error state

* `Lookup`

    supports the following method:
    * `getEntry`

    there are 2 flavors: `Save` and `Unsave`: An unsafe lookup can give a custom error when the getEntry method is called. This is useful when the Lookup is not guaranteed to be always available

* `Dictionary`
    
    extends `Lookup`, supports the following additional methods
    * `createEntry`
    * `deleteEntry`
    * `renameEntry`
    * `copyEntry`
    * `getKeys`

    there are 2 additional flavors; `Loose` vs `Strict`, leading to 4 alternatives:
    * `ISafeLooseDictionary`
    * `IUnsafeLooseDictionary`
    * `ISafeStrictDictionary`
    * `IUnsafeStrictDictionary`

    Loose/Strict: Stict means that the provider is guaranteed to implement all methods. Loose means that the provider is *not* guaranteed to implement all methods

* `Resource`

    a Resource is an interface that can be opened (giving access to the content), and must be closed afterwards.

    there are `Openable` and `Opened` interfaces, both in 2 flavors: `Safe` and `Unsafe`

    `Openable` interfaces have a method called `open` giving access to the `Opened` inteface

    `Opened` interfaces have a method called `close` and a member called `content`

    `Safe` vs `Unsafe` indicates wether the `open` or `close` method can result in an error


* Stream

    a Stream is an interface that has a method called `handle` to which a `StreamConsumer` must be provided. The StreamConsumer must implement a method called `onData` and a method called `onEnd`.
    The stream is calling `onData` zero or more times until the end of the stream is reached and then `onEnd` is called.

    There is a specialization of the `Stream` interface called `KeyValueStream` which enforces that the data are key/value pairs
