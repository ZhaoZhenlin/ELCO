import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchComponent } from './launch/launch.component';
import { LoginComponent } from './login/login.component';
import { DeviceComponent } from './device/device.component';
import { DetailComponent } from './detail/detail.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DemoComponent } from './demo/demo.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'launch', component: LaunchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'deviceAdd', component: DeviceAddComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'detail/:id', component: DetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
