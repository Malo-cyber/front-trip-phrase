import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './template/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './template/header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DatabaseService } from './services/model/database.service';
import { FavoriteService } from './services/model/favorite.service';

@NgModule({
  declarations: [FooterComponent, HeaderComponent,TruncatePipe],
  imports: [
    TranslateModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [FooterComponent, HeaderComponent,MaterialModule,TruncatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class SharedModule {


  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        DatabaseService,
        FavoriteService
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'SharedModule is already loaded. Import it in the AppModule only');
    }
  }

}
