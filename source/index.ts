import * as sp from "./safePromise"
import * as up from "./unsafePromise"
import { all as pm }  from "./all"
import { serialMap as sm }  from "./serialMap"

export const safePromise = sp
export const unsafePromise = up
export const parallelMap = pm
export const serialMap = sm