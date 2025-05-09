import { useCallback } from 'react';
const useEventLogger = () => {
  const logEvent = useCallback((eventName, data) => {
    console.log(`LOG EVENT IS CAPTURED: ${eventName} occurred`, data);
    // Call your backend API to log the event
    fetch('/api/logEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, data })
    });
  }, []);
  return logEvent;
};
export default useEventLogger;