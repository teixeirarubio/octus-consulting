/**
 * View-event dispatch with consent-aware dedupe.
 * Deduplication keys are recorded only after a successful enqueue.
 */

export type ViewFireResult = {
  attempted: boolean;
  enqueued: boolean;
  key: string | null;
  eventName: string | null;
};

export type ViewDispatcherDeps = {
  viewEventForPath: (pathname: string) => string | null;
  trackEvent: (name: string, params: Record<string, unknown>) => boolean;
  contentMetaForPath: (pathname: string) => Record<string, unknown>;
  getPageTitle: () => string | undefined;
};

/**
 * Stateful dispatcher for path view events.
 * Call `evaluate(pathname)` on path change and when analytics consent becomes granted.
 */
export function createViewEventDispatcher(deps: ViewDispatcherDeps) {
  let lastEnqueuedKey: string | null = null;

  function evaluate(pathname: string | null | undefined): ViewFireResult {
    if (!pathname) {
      return { attempted: false, enqueued: false, key: null, eventName: null };
    }

    const eventName = deps.viewEventForPath(pathname);
    if (!eventName) {
      return { attempted: false, enqueued: false, key: null, eventName: null };
    }

    const key = `${eventName}:${pathname}`;
    if (lastEnqueuedKey === key) {
      return { attempted: true, enqueued: false, key, eventName };
    }

    const meta = deps.contentMetaForPath(pathname);
    const enqueued = deps.trackEvent(eventName, {
      page_path: pathname,
      page_title: deps.getPageTitle(),
      ...meta,
    });

    if (enqueued) {
      lastEnqueuedKey = key;
    }

    return { attempted: true, enqueued, key, eventName };
  }

  function reset() {
    lastEnqueuedKey = null;
  }

  function getLastEnqueuedKey() {
    return lastEnqueuedKey;
  }

  return { evaluate, reset, getLastEnqueuedKey };
}
