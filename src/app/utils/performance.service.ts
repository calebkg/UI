import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metrics: Map<string, number> = new Map();

  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    // Log performance metrics in development
    if (!environment.production) {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  measurePageLoad(pageName: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      const navigationStart = performance.timing.navigationStart;
      const loadComplete = performance.timing.loadEventEnd;
      
      if (loadComplete > 0) {
        const loadTime = loadComplete - navigationStart;
        
        if (!environment.production) {
          console.log(`📊 Page Load Time (${pageName}): ${loadTime}ms`);
        }
        
        // Send to analytics in production
        if (environment.production) {
          this.sendToAnalytics('page_load_time', {
            page: pageName,
            loadTime: loadTime,
            timestamp: new Date().toISOString()
          });
        }
      }
    }
  }

  measureComponentRender(componentName: string, renderFn: () => void): void {
    this.startTiming(`${componentName}_render`);
    renderFn();
    this.endTiming(`${componentName}_render`);
  }

  private sendToAnalytics(event: string, data: any): void {
    // Implement your analytics service here
    // Example: Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', event, data);
  }

  getMemoryUsage(): any {
    if (typeof window !== 'undefined' && (window.performance as any).memory) {
      const memory = (window.performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  logMemoryUsage(label: string): void {
    const memory = this.getMemoryUsage();
    if (memory && !environment.production) {
      console.log(`🧠 Memory Usage (${label}):`, {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      });
    }
  }
}