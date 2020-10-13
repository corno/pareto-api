/**
 * an opened resource that will not have an error on closing
 */
export interface ISafeOpenedResource<ResourceType> {
    readonly content: ResourceType
    close(): void
}

/**
 * an opened resource that can have an error on closing
 */
export interface IUnsafeOpenedResource<ResourceType, CloseError> {
    readonly content: ResourceType
    /**
     * @param onError onError will be called if an error occurred when the resource was closed
     */
    close(onError: (error: CloseError) => void): void
}

/**
 * a resource that will not have an error during opening
 */
export interface ISafeOpenableResource<OpenedResource> {
    /**
     * @param onOpened this callback will be called when the resource was opened
     */
    open(onOpened: (openedResource: OpenedResource) => void): void
}

/**
 * a resource that can have an error on opening
 */
export interface IUnsafeOpenableResource<OpenedResource, OpenError> {
    /**
     * @param onError this callback will be called if an error occurred when the resource was opened
     * @param onOpened this callback will be called when the resource was successfully opened
     */
    open(onError: (openError: OpenError) => void, onOpened: (openedResource: OpenedResource) => void): void
}
