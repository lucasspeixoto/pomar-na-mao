export const checkCurrencStorageStep = (): number => {
  return localStorage.getItem('POMAR-NA-MAO:COLLECT-STEP')
    ? +localStorage.getItem('POMAR-NA-MAO:COLLECT-STEP')!
    : 0;
};
