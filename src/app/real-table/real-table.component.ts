import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {RealTableDataSource, RealTableItem} from './real-table-datasource';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './real-table.component.html',
  styleUrls: ['./real-table.component.css']
})
export class RealTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<RealTableItem>;
  dataSource: RealTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['albumId', 'id', 'title', 'url', 'thumbnailUrl'];
  constructor( private http: HttpClient) {}
  ngOnInit() {
    this.dataSource = new RealTableDataSource(this.http);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
