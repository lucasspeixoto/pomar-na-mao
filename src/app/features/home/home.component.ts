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
    .main-container{
      display: grid;
      grid-template-columns:repeat(auto-fill,minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .container{
    display: block;
    margin: 10px;
    padding: 10px;
    border: 4px solid #00A96E;
    border-radius: 10px;
    width: 100%;
    background-color: #00A96E;
    transition: filter 0.3s ease;
    }
    .titulo{
      color: Black;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container:hover{
      filter: brightness(0.8);

    }
    .container2{
    display: block;
    margin: 10px;
    padding: 10px;
    border: 4px solid #00A96E;
    border-radius: 10px;
    width: 100%;
    background-color: #00A96E;
    transition: filter 0.3s ease;
    }
    .titulo2{
      color: Black;
      transition: filter 0.3s ease;;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container2:hover{
      filter: brightness(0.8);

    }
    .container3{
    display: block;
    margin: 10px;
    padding: 10px;
    border: 4px solid #00A96E;
    border-radius: 10px;
    width: 100%;
    background-color: #00A96E;
    transition: filter 0.3s ease;
    }
    .titulo3{
      color: Black;
      transition: filter 0.3s ease;;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container3:hover{
      filter: brightness(0.8);

    }
    .container4{
    display: block;
    margin: 10px;
    padding: 10px;
    border: 4px solid #00A96E;
    border-radius: 10px;
    width: 100%;
    background-color: #00A96E;
    transition: filter 0.3s ease;
    }
    .titulo4{
      color: Black;
      transition: filter 0.3s ease;;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .container4:hover{
      filter: brightness(0.8);

    }
  `
})
export class HomeComponent {}
