import { parallelMap as pm } from "./parallelMap"
import * as sp from "./safePromise"
import { serialMap as sm } from "./serialMap"
import * as up from "./unsafePromise"

export const safePromise = sp
export const unsafePromise = up
export const parallelMap = pm
export const serialMap = sm
