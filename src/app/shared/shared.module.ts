import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './template/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './template/header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    TranslateModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [FooterComponent, HeaderComponent,MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
