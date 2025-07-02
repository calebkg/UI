import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 300000; // 5 minutes

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) {
      return false;
    }
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  // Cache wrapper for observables
  cacheObservable<T>(
    key: string, 
    source$: Observable<T>, 
    ttl: number = this.DEFAULT_TTL
  ): Observable<T> {
    const cached = this.get<T>(key);
    
    if (cached !== null) {
      return of(cached);
    }
    
    return source$.pipe(
      tap(data => this.set(key, data, ttl))
    );
  }

  // Get cache statistics
  getStats(): {
    size: number;
    keys: string[];
    totalMemoryEstimate: number;
  } {
    const keys = Array.from(this.cache.keys());
    const totalMemoryEstimate = keys.reduce((total, key) => {
      const item = this.cache.get(key);
      return total + (JSON.stringify(item).length * 2); // Rough estimate in bytes
    }, 0);

    return {
      size: this.cache.size,
      keys,
      totalMemoryEstimate
    };
  }

  // Clean expired items
  cleanup(): number {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    return removedCount;
  }

  // Auto cleanup every 5 minutes
  startAutoCleanup(): void {
    setInterval(() => {
      const removed = this.cleanup();
      if (removed > 0) {
        console.log(`🧹 Cache cleanup: removed ${removed} expired items`);
      }
    }, 300000); // 5 minutes
  }
}