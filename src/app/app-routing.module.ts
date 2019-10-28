import { DragdropComponent } from './dragdrop/dragdrop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TreeComponent } from './tree/tree.component';
import {TestCarouselComponent} from './test-carousel/test-carousel.component';
import {CarouselComponent} from './carousel/carousel.component';
import {CdkTableComponent} from './cdk-table/cdk-table.component';
import {InifiniteDemoComponent} from './inifinite-demo/inifinite-demo.component';
import {PDragdropComponent} from './p-dragdrop/p-dragdrop.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'cdk-table', component: CdkTableComponent },
  { path: 'infinite-demo', component: InifiniteDemoComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'drag', component: DragdropComponent },
  { path: 'p-drag', component: PDragdropComponent },
  { path: 'test_carousel', component: TestCarouselComponent },
  { path: 'carousel', component: CarouselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
