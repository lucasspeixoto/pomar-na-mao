import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { combineLatest, Subscription, type Observable } from 'rxjs';

type MenuItem = {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean; hidden?: boolean }[];
};

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  public sidebarService = inject(SidebarService);

  private router = inject(Router);

  private cdr = inject(ChangeDetectorRef);

  public menuItems: MenuItem[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" fill-rule="evenodd"><path d="M256 64L32 288h64v160h128V320h64v128h128V288h64L256 64z"/></svg>`,
      name: 'Minha Fazenda',
      path: '/inicio',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M176 112V80c0-17.673 14.327-32 32-32h96c17.673 0 32 14.327 32 32v32h64c17.673 0 32 14.327 32 32v288c0 17.673-14.327 32-32 32H112c-17.673 0-32-14.327-32-32V144c0-17.673 14.327-32 32-32h64zm32-32v32h96V80h-96zM112 176v256h288V176H112z"/></svg>`,
      name: 'Rotinas',
      subItems: [
        { name: 'Inspeção', path: '/rotinas-de-inspecao', hidden: false },
        { name: 'Trabalho', path: '/rotinas-de-trabalho', hidden: false },
        {
          name: 'Detalhes da Rotina',
          path: '/detalhes-rotina/:id',
          hidden: true,
        },
      ],
    },
    {
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill="currentColor"></path></svg>`,
      name: 'Perfil',
      path: '/perfil',
    },
  ];

  public openSubmenu: string | null | number = null;

  public subMenuHeights: { [key: string]: number } = {};

  @ViewChildren('subMenu') subMenuRefs!: QueryList<ElementRef>;

  public readonly isExpanded$: Observable<boolean>;

  public readonly isMobileOpen$: Observable<boolean>;

  public readonly isHovered$: Observable<boolean>;

  private subscription: Subscription = new Subscription();

  constructor() {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  public ngOnInit(): void {
    // Subscribe to router events
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setActiveMenuFromRoute(this.router.url);
        }
      })
    );

    // Subscribe to combined observables to close submenus when all are false
    this.subscription.add(
      combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
        ([isExpanded, isMobileOpen, isHovered]) => {
          if (!isExpanded && !isMobileOpen && !isHovered) {
            this.cdr.detectChanges();
          }
        }
      )
    );

    // Initial load
    this.setActiveMenuFromRoute(this.router.url);
  }

  public ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  public isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }

  public toggleSubmenu(section: string, index: number): void {
    const key = `${section}-${index}`;

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      });
    }
  }

  public onSidebarMouseEnter(): void {
    this.isExpanded$
      .subscribe(expanded => {
        if (!expanded) {
          this.sidebarService.setHovered(true);
        }
      })
      .unsubscribe();
  }

  private setActiveMenuFromRoute(currentUrl: string): void {
    const menuGroups = [
      { items: this.menuItems, prefix: 'main' },
      /* { items: this.othersItems, prefix: 'others' }, */
    ];

    let submenuOpened = false;

    menuGroups.forEach(group => {
      group.items.forEach((nav, i) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (
              currentUrl === subItem.path ||
              (subItem.path && currentUrl.startsWith(subItem.path.replace(/:.*$/, '')))
            ) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu = key;
              submenuOpened = true;

              setTimeout(() => {
                const el = document.getElementById(key);
                if (el) {
                  this.subMenuHeights[key] = el.scrollHeight;
                  this.cdr.detectChanges();
                }
              });
            }
          });
        }
      });
    });

    if (!submenuOpened) this.openSubmenu = null;
  }

  public onSubmenuClick(): void {
    this.isMobileOpen$
      .subscribe(isMobile => {
        if (isMobile) {
          this.sidebarService.setMobileOpen(false);
        }
      })
      .unsubscribe();
  }
}
