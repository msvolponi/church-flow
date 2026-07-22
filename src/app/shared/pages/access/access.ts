import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { Component } from '@angular/core';
import { RouterModule } from 'node_modules/@angular/router/types/_router_module-chunk';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-access',
  imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule],
  templateUrl: './access.html',
  styleUrl: './access.scss',
})
export class Access {

}
