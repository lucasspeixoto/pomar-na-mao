import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer bg-primary dark:bg-accent-content p-10">
      <nav>
        <h6 class="footer-title">Services</h6>
        <a class="link link-hover">Branding</a>
        <a class="link link-hover">Design</a>
        <a class="link link-hover">Marketing</a>
        <a class="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 class="footer-title">Empresa</h6>
        <a class="link link-hover">Sobre nós</a>
        <a class="link link-hover">Contato</a>
        <a class="link link-hover">Empregos</a>
        <a class="link link-hover">Kit de imprensa</a>
      </nav>
      <nav>
        <h6 class="footer-title">Jurídico</h6>
        <a class="link link-hover">Termos de uso</a>
        <a class="link link-hover">Política de privacidade</a>
        <a class="link link-hover">Política de cookies</a>
      </nav>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
