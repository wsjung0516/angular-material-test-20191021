import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {TableDataSource, TableItem} from '../table/table-datasource';
import {CdkTableDatasource} from './cdk-table-datasource';
import {BehaviorSubject, concat, defer, empty, forkJoin, fromEvent, Observable, of, timer, zip} from 'rxjs';
import {concatMap, debounceTime, delay, map, mergeMap, switchMap, take, tap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-cdk-table',
  templateUrl: './cdk-table.component.html',
  styleUrls: ['./cdk-table.component.css']
})
export class CdkTableComponent implements OnInit, AfterViewInit {

  public get lastPage(): number {
    return Math.min(this.totalNumberOfPages, this.firstPage + this.numberOfPagesInBuffer -1);
  }

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private cdkTableDataService: CdkTableDatasource) {
    this.dataStream = new BehaviorSubject<USER[]>([]);
    this.dataSource = this.dataStream.asObservable();
  }
  //@ViewChild(MatTable) public matTable: MatTable<Element[]>;
  @ViewChild('table', {read: ElementRef, static: false}) public matTableRef: ElementRef;
  public displayedColumns: string[] = ['id', 'name', 'email'];
  public dataSource: Observable<USER[]>;
  private dataStream: BehaviorSubject<USER[]>;
  private numberOfPagesInBuffer = 3;
  private firstPage = 1;
  private pageSize = 20;
  private totalNumberOfPages = 20; // input

  tdata: USER[] = [];
  public ngOnInit(): void {
    this.fetchData()
      .pipe(
          tap(value => {
            this.tdata = this.tdata.concat(value);
            this.dataStream.next(this.tdata);}
            )
        ).subscribe();

  }

  public ngAfterViewInit(): void {
    fromEvent(this.matTableRef.nativeElement, 'scroll')
      .pipe(debounceTime(500))
      .subscribe((e: any) => this.onTableScroll(e));
  }

  private onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const scrollThreshold = 200;

    // this.tdata = [];
    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit && this.lastPage < this.totalNumberOfPages) {
      this.firstPage++;
      // console.log(`onTableScroll(): firstPage increased to ${this.firstPage}. Now fetching data...`);
      this.cdkTableDataService.getUserData( this.firstPage, 20).pipe(
        tap( () => {

        }),
      ).subscribe( value => {
        console.table(e.target.offsetHeight, e.target.scrollHeight, e.target.scrollTop);
        // this.scrollTo(scrollLocation * 0.99);
        this.scrollTo(tableScrollHeight * 0.95);
        // this.scrollTo(tableScrollHeight/ 2 - 2*tableViewHeight);
        this.tdata = this.tdata.concat(value);
        this.dataStream.next(this.tdata);
      });
    }
  }
  private fetchData() {
      return this.cdkTableDataService.getUserData( this.firstPage, 20);
  }

  private generateFakePageData(forPage: number): Element[] {
    let fakePageData = [];
    fakePageData.push(...Array.from<Element>({length: this.pageSize}).map((_: any, i: number) => { return {page: ''+forPage, index: i+1}; }));
    return fakePageData;
  }

  private scrollTo(position: number): void {
    this.renderer.setProperty(this.matTableRef.nativeElement, 'scrollTop', position);
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface USER {
  id: number;
  name: string;
  email: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];



