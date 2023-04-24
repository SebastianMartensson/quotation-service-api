import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import RequestValidators from './interface/RequestValidators';


export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.body) {
                console.log("VAFALLS");
                req.body = await validators.body.parseAsync(req.body);
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(422);
            }
            next(error);
        }
    };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404);
    const error = new Error( `🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
    const statusCode = res.statusCode !== 200 ? res.statusCode: 500;
    res.status(statusCode);
    res.json({
        message: err.message
    });
}