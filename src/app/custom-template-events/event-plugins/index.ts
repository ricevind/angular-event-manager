import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { StopPropagationEventPlugin } from './stop-propagation/stop-propagation.event-plugin';

export * from './stop-propagation/stop-propagation.event-plugin';

export const providers = [
  {
    provide: EVENT_MANAGER_PLUGINS,
    useClass: StopPropagationEventPlugin,
    multi: true,
  },
];
