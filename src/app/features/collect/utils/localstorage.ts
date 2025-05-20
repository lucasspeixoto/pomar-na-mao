import { CollectFilters } from '../models/collect-filters.model';

export const checkCurrencStorageStep = (): number => {
  return localStorage.getItem('POMAR-NA-MAO:COLLECT-STEP')
    ? +localStorage.getItem('POMAR-NA-MAO:COLLECT-STEP')!
    : 0;
};

export const checkCurrencCollectFilters = (): CollectFilters | null => {
  const filters = localStorage.getItem('POMAR-NA-MAO:COLLECT-SEARCH-FILTERS');
  return filters ? JSON.parse(filters) : null;
};
