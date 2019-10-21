import { DragdropComponent } from './dragdrop/dragdrop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TreeComponent } from './tree/tree.component';
import {TestCarouselComponent} from './test-carousel/test-carousel.component';
import {CarouselComponent} from './carousel/carousel.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'tree', component: TreeComponent },
  { path: 'drag', component: DragdropComponent },
  { path: 'test_carousel', component: TestCarouselComponent },
  { path: 'carousel', component: CarouselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
