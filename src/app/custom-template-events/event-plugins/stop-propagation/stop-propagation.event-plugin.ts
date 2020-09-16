import { EventPlugin } from 'app/core/custom-template-events/models';

const eventNamePattern = /\.stopPropagation/;

export class StopPropagationEventPlugin implements EventPlugin {
  supports(eventName: string) {
    return eventNamePattern.test(eventName);
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    originalHandler: Function
  ) {
    const [htmlEventName] = eventName.split('.');

    const innerHandler = (event: Event) => {
      event.stopPropagation();
      originalHandler(event);
    };

    element.addEventListener(htmlEventName, innerHandler);

    return () => element.removeEventListener(htmlEventName, innerHandler);
  }
}
