import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PagesetupComponent } from './components/pagesetup/pagesetup.component';
import { RootComponent } from './components/root/root.component';
import { PreviewdialogComponent } from './components/previewdialog/previewdialog.component';
import { JsonDialogComponent } from './json-dialog.component';
import { SectionComponent } from './components/section/section.component';
import { PreviewallComponent } from './components/previewall/previewall.component';
import { RenderviewComponent } from './components/renderview/renderview.component';
import { DynamicsectionComponent } from './components/dynamicsection/dynamicsection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NameComponent } from './components/name/name.component';
import { TreeComponent } from './components/tree/tree.component';


@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
     OrderByPipe,
     PagesetupComponent,
     RootComponent,
     PreviewdialogComponent,
     JsonDialogComponent,
     SectionComponent,
     PreviewallComponent,
     RenderviewComponent,
     DynamicsectionComponent,
     NameComponent,
     TreeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    FontAwesomeModule ,
    FormsModule,
  ],
  providers: [],
  entryComponents: [JsonDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
