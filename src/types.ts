import { Request } from 'express'

export interface RequestWithSession extends Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: any
}