import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FooterComponent } from './footer/footer.component';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatChipsModule, MatDialogModule} from '@angular/material';
import { CarouselComponent } from './carousel/carousel.component';
import { TestCarouselComponent } from './test-carousel/test-carousel.component';
import {CarouselModule} from 'ngx-bootstrap';
import { CdkTableComponent } from './cdk-table/cdk-table.component';
import {HttpClientModule} from '@angular/common/http';
import { InifiniteDemoComponent } from './inifinite-demo/inifinite-demo.component';
import {StickyHeaderComponent} from "./components/sticky-header.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TableComponent,
    FooterComponent,
    TreeComponent,
    DragdropComponent,
    CarouselComponent,
    TestCarouselComponent,
    CdkTableComponent,
    StickyHeaderComponent,
    InifiniteDemoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    DragDropModule,
    InfiniteScrollModule,
    // ScrollingModule,
    MatChipsModule,
    MatDialogModule,
    CarouselModule.forRoot()
  ],
  entryComponents: [DragdropComponent, CarouselComponent],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
