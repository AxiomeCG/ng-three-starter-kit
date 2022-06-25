import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ThreeViewerComponent } from './three-viewer/three-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
