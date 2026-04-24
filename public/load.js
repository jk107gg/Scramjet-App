async function setupSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js', { scope: '/service/' });
      console.log('Scramjet Engine Ready');
    } catch (err) {
      console.error('Engine setup failed:', err);
    }
  }
}
setupSW();
