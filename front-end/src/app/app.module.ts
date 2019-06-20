import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DeviceComponent } from './device/device.component';
import { LaunchComponent } from './launch/launch.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import {MatDividerModule} from '@angular/material/divider'
import {MatListModule} from '@angular/material/list';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import { DemoComponent } from './demo/demo.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { PropAddDialogComponent } from './component/prop-add-dialog/prop-add-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LaunchComponent,
    LoginComponent,
    DeviceComponent,
    DetailComponent,
    DeviceAddComponent,
    DemoComponent,
    ConfirmDialogComponent,
    PropAddDialogComponent,
    SnackBarComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, PropAddDialogComponent, SnackBarComponent]
})
export class AppModule { }
