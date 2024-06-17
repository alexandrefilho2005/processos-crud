import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { NpuMaskDirective } from './npu-mask.directive'; // Importar a diretiva

@NgModule({
  declarations: [
    AppComponent,
    ProcessFormComponent,
    NpuMaskDirective // Declarar a diretiva
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
