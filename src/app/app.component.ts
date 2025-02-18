import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: ``,
})
export class AppComponent {
  /* constructor() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const altitude = position.coords.altitude || 'Não disponível';

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Altitude: ${altitude}`);
      },
      error => {
        console.error('Erro ao obter localização:', error.message);
      },
      { enableHighAccuracy: true, maximumAge: 3600000 } // Cache location for 1 hour
    );

    navigator.permissions
      .query({ name: 'geolocation' })
      .then(result => {
        if (result.state === 'granted') {
          console.log('✅ Localização permitida.');
        } else if (result.state === 'prompt') {
          console.log('⚠️ Permissão pendente (o usuário ainda não aceitou ou negou).');
        } else if (result.state === 'denied') {
          console.log('❌ Localização bloqueada.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter estado de conexão do dispositivo:', error.message);
      });
  } */
}
