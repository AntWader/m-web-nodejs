import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request as RequestType, Response as ResponseType } from 'express';
import * as util from 'util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: RequestType = context.switchToHttp().getRequest();

        // generate console massage about request
        process.stdout.write(
            `${new Date().toUTCString()
            } :: ${request.originalUrl
            } -> ${request.method
            } user:${util.inspect(request.user, { showHidden: false, depth: null, colors: true })
            }`);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(` +${Date.now() - now}ms`)),
            );
    }
}