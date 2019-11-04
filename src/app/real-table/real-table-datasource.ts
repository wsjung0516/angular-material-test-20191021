import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Optional} from "@angular/core";

// TODO: Replace this with your own data model type
export interface RealTableItem {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// TODO: replace this with real data from your application
/*
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, name: 'Hydrogen'},
  {id: 2, name: 'Helium'},
  {id: 3, name: 'Lithium'},
  {id: 4, name: 'Beryllium'},
  {id: 5, name: 'Boron'},
  {id: 6, name: 'Carbon'},
  {id: 7, name: 'Nitrogen'},
  {id: 8, name: 'Oxygen'},
  {id: 9, name: 'Fluorine'},
  {id: 10, name: 'Neon'},
  {id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},
  {id: 21, name: 'Hydrogen'},
  {id: 22, name: 'Helium'},
  {id: 23, name: 'Lithium'},
  {id: 24, name: 'Beryllium'},
  {id: 25, name: 'Boron'},
  {id: 26, name: 'Carbon'},
  {id: 27, name: 'Nitrogen'},
  {id: 28, name: 'Oxygen'},
  {id: 29, name: 'Fluorine'},
  {id: 30, name: 'Neon'},
  {id: 31, name: 'Sodium'},
  {id: 32, name: 'Magnesium'},
  {id: 33, name: 'Aluminum'},
  {id: 34, name: 'Silicon'},
  {id: 35, name: 'Phosphorus'},
  {id: 36, name: 'Sulfur'},
  {id: 37, name: 'Chlorine'},
  {id: 38, name: 'Argon'},
  {id: 39, name: 'Potassium'},
  {id: 30, name: 'Calcium'},
];
*/

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RealTableDataSource extends DataSource<RealTableItem> {
  // data: RealTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(@Optional() private http: HttpClient) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RealTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      // observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData();
      // return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData() {
    let url = `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${this.paginator.page}`;
    let bdata: RealTableItem[] = [];
    return  this.http.get<RealTableItem[]>(url).subscribe((da)=> {
    console.log('bdata-->',da);
      bdata = [...da];
      return bdata;
    });

/*
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const adata =  data.splice(startIndex, this.paginator.pageSize);
    console.log('adata-->', adata, startIndex);
    return adata;
*/
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RealTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
