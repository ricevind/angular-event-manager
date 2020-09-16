import { EventManager } from '@angular/platform-browser';

type CleanUpFunction = Function;

export interface EventPlugin {
  manager?: EventManager;
  supports: (eventName: string) => boolean;
  addEventListener: (
    element: HTMLElement,
    eventName: string,
    handler: Function
  ) => CleanUpFunction;
}
