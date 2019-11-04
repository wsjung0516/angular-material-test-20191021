import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {RealTableDataSource, RealTableItem} from './real-table-datasource';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from '@angular/material';
import {RealTableService} from './real-table.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './real-table.component.html',
  styleUrls: ['./real-table.component.css']
})
export class RealTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<RealTableItem>;
  @ViewChild('filter',  {static: true}) filter: ElementRef;
  exampleDatabase: RealTableService | null;
  dataSource: ExampleDataSource | null;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['albumId', 'id', 'title', 'url', 'thumbnailUrl'];
  constructor( private http: HttpClient,
               public dialog: MatDialog,
               public dataService: RealTableService) {}
  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
  }
  public loadData() {
    this.exampleDatabase = new RealTableService(this.http);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
    // .debounceTime(150)
    // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<RealTableItem> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: RealTableItem[] = [];
  renderedData: RealTableItem[] = [];

  constructor(public _exampleDatabase: RealTableService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    // this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<RealTableItem[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      // this._sort.sortChange,
      this._filterChange,
      // this._paginator.page
    ];

    this._exampleDatabase.getAllData();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: RealTableItem) => {
          const searchStr = (issue.title + issue.url ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
      return this.filteredData;
/*
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
*/
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: RealTableItem[]): RealTableItem[] {
/*
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
*/

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
