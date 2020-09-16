import { StopPropagationEventPlugin } from './stop-propagation.event-plugin';

describe('StopPropagationEventPlugin', () => {
  let testedInstance: StopPropagationEventPlugin;

  beforeEach(() => {
    testedInstance = new StopPropagationEventPlugin();
  });

  describe('Method: supports', () => {
    it('check event is supported', () => {
      expect(testedInstance.supports('click.stopPropagation')).toBe(true);
    });

    it('check event is not supported', () => {
      expect(testedInstance.supports('click')).toBe(false);
    });
  });

  describe('Method: addEventListener', () => {
    const eventNameBase = 'awesomeEvent';
    const eventSuffix = 'aSuffix';
    const eventName = `${eventNameBase}.${eventSuffix}`;
    const event = new Event(eventNameBase);
    const sanityEvent = new Event('sanity-event');

    let originalHandler: jasmine.Spy;
    let outerHandler: jasmine.Spy;
    let sanityCheckHandler: jasmine.Spy;

    let wrapperDiv: HTMLElement;
    let childDiv: HTMLElement;

    let eventCleanupFn: Function;

    beforeEach(() => {
      originalHandler = jasmine.createSpy('originalHandler');
      outerHandler = jasmine.createSpy('outerHandler');
      sanityCheckHandler = jasmine.createSpy('sanityCheckHandler');

      wrapperDiv = document.createElement('div');
      childDiv = document.createElement('div');

      wrapperDiv.addEventListener(eventNameBase, outerHandler);
      wrapperDiv.addEventListener('sanity-event', sanityCheckHandler);
      wrapperDiv.appendChild(childDiv);

      eventCleanupFn = testedInstance.addEventListener(
        childDiv,
        eventName,
        originalHandler
      );
    });

    it('registers event', () => {
      childDiv.dispatchEvent(event);

      expect(originalHandler).toHaveBeenCalledWith(event);
    });

    it('stops propagation of emitted event', () => {
      childDiv.dispatchEvent(event);
      childDiv.dispatchEvent(sanityEvent);

      expect(outerHandler).not.toHaveBeenCalledWith(event);
      expect(sanityCheckHandler).not.toHaveBeenCalledWith(sanityEvent);
    });

    it('deregister event on cleanup', () => {
      eventCleanupFn();

      childDiv.dispatchEvent(event);

      expect(originalHandler).not.toHaveBeenCalledWith(event);
    });
  });
});
