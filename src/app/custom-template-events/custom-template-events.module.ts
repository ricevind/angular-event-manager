import { NgModule } from '@angular/core';

import * as fromEventPlugins from './event-plugins';

@NgModule({
  providers: [...fromEventPlugins.providers],
})
export class CustomTemplateEventsModule {}
