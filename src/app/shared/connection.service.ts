import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'platform'
  }
)
export class ConnectionService {
  private connectionLostMonitor: Observable<boolean>;
  private connectionSpeedMonitor: Observable<ConnectionSpeed>;

  constructor() {
    this.connectionLostMonitor = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false)));

    this.connectionSpeedMonitor =
      of((navigator as any).connection)
        .pipe(
          tap(a => console.log('navigator', a)),
          filter(v => !!v),
          map((v: any) => {
            const effectiveType: EffectiveConnectionType = v.effectiveType;
            return (effectiveType != '4g')
              ? 'slow'
              : 'fast';
          })
        );
  }

  connectionStateMonitor(): Observable<boolean> {
    return this.connectionLostMonitor;
  };

  monitorConnectionSpeed(): Observable<ConnectionSpeed> {
    return this.connectionSpeedMonitor;
  };


  listenToConnectionChange() {
    const connection$ = new Observable((observer) => {
      const conn = (navigator as any).connection;
      const { effectiveType } = conn;
      observer.next(effectiveType);

      const onConnectionChange = () => {
        const { effectiveType } = conn;
        observer.next(effectiveType);
      };

      conn.addEventListener('change', onConnectionChange);

      return () => {
        conn.removeEventListener('change', onConnectionChange);
        observer.complete();
      };
    });
  }
}

type EffectiveConnectionType = "slow-2g" | "2g" | "3g" | "4g";
export type ConnectionSpeed = 'slow' | 'fast' | 'none';
