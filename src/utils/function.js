export function throttle(fn, ms = 500) {
  let timeId = null;
  let isHandled = false;
  return (...args) => {
    if (timeId && !isHandled) clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn(...args);
      isHandled = true;
    }, ms);
  };
}

export function debounce(fn, ms = 500) {
  let startTime = Date.now();
  return (...args) => {
    if (Date.now() - startTime < ms) return;
    fn(...args);
    startTime = Date.now();
  };
}
