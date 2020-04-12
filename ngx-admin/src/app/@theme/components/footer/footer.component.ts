import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b>Bolivia Solidaria</b> fue desarrollada por <b>ingenieros voluntarios</b> si deseas apoyar contactate a 77370309.
    </span>
    <div class="socials">
      <a href="https://www.facebook.com/BoliviaSolidariacom-109541160717809" target="_blank" class="ion ion-social-facebook"></a>
    </div>
  `,
})
export class FooterComponent {
}
