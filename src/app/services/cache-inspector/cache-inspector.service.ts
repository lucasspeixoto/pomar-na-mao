import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheInspectorService {
  async checkAssetsCache(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      console.log('Available cache names:', cacheNames);

      for (const cacheName of cacheNames) {
        if (cacheName.includes('ngsw')) {
          const cache = await caches.open(cacheName);
          const cachedRequests = await cache.keys();

          console.log(`\nCache: ${cacheName}`);
          console.log('Assets in cache:');

          cachedRequests
            .filter(request => new URL(request.url).pathname.startsWith('/assets/'))
            .forEach(request => {
              console.log(`- ${request.url}`);
            });
        }
      }
    } catch (error) {
      console.error('Error checking cache:', error);
    }
  }
}
