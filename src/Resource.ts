import * as SP from "./SafePromise"
import * as UP from "./UnsafePromise"

export interface IUnsafeOpenResource<Resource, CloseError> {
    readonly resource: Resource
    readonly close: UP.IUnsafePromise<null, CloseError>
}

export interface ISafeOpenResource<Resource> {
    readonly resource: Resource
    readonly close: SP.ISafePromise<null>
}

export interface IUnsafeResource<Resource, OpenError, CloseError> {
    readonly open: UP.IUnsafePromise<IUnsafeOpenResource<Resource, CloseError>, OpenError>
    with<ReturnType, WithError>(
        onOpenError: (error: OpenError) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
        onSuccess: (resource: Resource) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
        //onCloseError is only called in case the resource is successfully opened but not successfully closed
        //when onCloseError is called, the return value of onSuccess is already set
        //if onCloseError returns null, the return value will not be overridden
        //if onCloseError returns non null, this will become the new return value
        onCloseError: (error: CloseError) => null | UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>
    ): UP.IUnsafePromise<ReturnType, WithError>
}

export interface IUnsafeOnOpenResource<Resource, OpenError> {
    readonly open: UP.IUnsafePromise<ISafeOpenResource<Resource>, OpenError>
    with<ReturnType, WithError>(
        onOpenError: (error: OpenError) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
        onSuccess: (resource: Resource) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
    ): UP.IUnsafePromise<ReturnType, WithError>
}

export interface IUnsafeOnCloseResource<Resource, CloseError> {
    readonly open: SP.ISafePromise<IUnsafeOpenResource<Resource, CloseError>>
    with<ReturnType, WithError>(
        onSuccess: (resource: Resource) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
        //onCloseError is only called in case the resource is successfully opened but not successfully closed
        //when onCloseError is called, the return value of onSuccess is already set
        //if onCloseError returns null, the return value will not be overridden
        //if onCloseError returns non null, this will become the new return value
        onCloseError: (error: CloseError) => null | UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>
    ): UP.IUnsafePromise<ReturnType, WithError>
}

export interface ISafeResource<Resource> {
    readonly open: SP.ISafePromise<ISafeOpenResource<Resource>>
    with<ReturnType, WithError>(
        onSuccess: (resource: Resource) => UP.UnsafeWrappedOrUnwrapped<ReturnType, WithError>,
    ): UP.IUnsafePromise<ReturnType, WithError>
}
