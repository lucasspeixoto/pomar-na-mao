import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isExpandedSubject = new BehaviorSubject<boolean>(true);

  private isMobileOpenSubject = new BehaviorSubject<boolean>(false);

  private isHoveredSubject = new BehaviorSubject<boolean>(false);

  public isExpanded$ = this.isExpandedSubject.asObservable();

  public isMobileOpen$ = this.isMobileOpenSubject.asObservable();

  public isHovered$ = this.isHoveredSubject.asObservable();

  public setExpanded(val: boolean): void {
    this.isExpandedSubject.next(val);
  }

  public toggleExpanded(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  public setMobileOpen(val: boolean): void {
    this.isMobileOpenSubject.next(val);
  }

  public toggleMobileOpen(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  public setHovered(val: boolean): void {
    this.isHoveredSubject.next(val);
  }
}
