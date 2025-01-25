import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetectionComponent } from '../detection/components/detection/detection.component';

@Component({
  selector: 'app-home',
  imports: [DetectionComponent],
  template: `
    <div class="w-full" style="height: calc(100vh - 4rem)">
      <div
        class="p-4 md:p-8 lg:p-12 gap-2 flex h-full w-full flex-col items-center lg:flex-row">
        <div
          class="border-2 border-red-400 h-full w-full md:w-1/2 flex items-center justify-center p-0 md:p-2 overflow-none rounded-box">
          <app-detection />
        </div>
        <div class="divider divider-horizontal"></div>
        <div
          class="border-2 border-orange-400 h-full w-full md:w-1/2 flex items-center justify-center p-0 md:p-2 overflow-none rounded-box">
          <!--Inicio -->
          <div class="main-container">
            <div class="container">
              <span class="titulo">Gráficos</span>
            </div>
            <div class="container2">
              <span class="titulo2">Relatórios</span>
            </div>
            <div class="container3">
              <span class="titulo3">Ordem serviço</span>
            </div>
            <div class="container4">
              <span class="titulo4">Outros</span>
            </div>
          </div>
          <!--Fim-->
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .main-container {
      border: 400px;
      flex-wrap: wrap;
      justify-content: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      height: 100%;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      padding: 10px;
      border: 4px #655d8a;
      border-radius: 10px;
      width: 100%;
      height: 85px;
      background-color: #655d8a;
      transition:
        filter 0.3s ease,
        transform 0.3s ease;
      max-width: 500px;
    }
    .titulo {
      color: Black;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container:hover {
      filter: brightness(0.8);
      transform: scale(1.03);
    }
    .container:active {
      transform: scale(0.9);
    }
    .container2 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      padding: 10px;
      border: 4px #7897ab;
      border-radius: 10px;
      width: 100%;
      height: 85px;
      background-color: #7897ab;
      transition:
        filter 0.3s ease,
        transform 0.3s ease;
      max-width: 500px;
    }
    .titulo2 {
      color: Black;
      transition: filter 0.3s ease;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container2:hover {
      filter: brightness(0.8);
      transform: scale(1.03);
    }
    .container2:active {
      transform: scale(0.9);
    }
    .container3 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      padding: 10px;
      border: 4px #d885a3;
      border-radius: 10px;
      width: 100%;
      height: 85px;
      background-color: #d885a3;
      transition:
        filter 0.3s ease,
        transform 0.3s ease;
      max-width: 500px;
    }
    .titulo3 {
      color: Black;
      transition: filter 0.3s ease;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container3:hover {
      filter: brightness(0.8);
      transform: scale(1.03);
    }
    .container3:active {
      transform: scale(0.9);
    }
    .container4 {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      padding: 10px;
      border: 4px solid #fdceb9;
      border-radius: 10px;
      width: 100%;
      height: 85px;
      background-color: #fdceb9;
      transition:
        filter 0.3s ease,
        transform 0.3s ease;
      max-width: 500px;
    }
    .titulo4 {
      color: Black;
      transition: filter 0.3s ease;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container4:hover {
      filter: brightness(0.8);
      transform: scale(1.03);
    }
    .container4:active {
      transform: scale(0.9);
    }

    @media (max-width: 1200px) {
      .container4,
      .container3,
      .container2,
      .container {
        width: 70%;
      }
    }
    @media (max-width: 700px) {
      .container4,
      .container3,
      .container2,
      .container {
        width: 50%;
      }
      .main-container {
        justify-content: center;
        align-items: center;
      }
    }
  `,
})
export class HomeComponent {}
