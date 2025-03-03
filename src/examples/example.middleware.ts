import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from 'src/logger/custom-logger';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLogger) {
    this.logger.setContext(ExampleMiddleware.name);
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
