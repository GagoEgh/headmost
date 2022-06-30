import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FramesServService } from '../shared/frames-serv.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(public frames: FramesServService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {

    const newRequest = request.clone({
      headers: request.headers.set('Authorization', `${this.frames.token} `)
    })
    return next.handle(newRequest);
  }
}
