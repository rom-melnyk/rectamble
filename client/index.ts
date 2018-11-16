function rectamble() {
  console.info('Works fine!');
}

if (typeof window !== 'undefined') {
  (window as any).rectamble = rectamble;
}
