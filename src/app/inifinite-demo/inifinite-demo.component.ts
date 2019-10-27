import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil, tap} from 'rxjs/operators';
import {ScrollService} from './services/scroll.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-inifinite-demo',
  templateUrl: './inifinite-demo.component.html',
  styleUrls: ['./inifinite-demo.component.css']
})
export class InifiniteDemoComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  itemCount = 25;
  title = "Angular 6 + RxJS Infinite Scrolling Demo";

  constructor(private scrollService: ScrollService) {}

  public ngOnInit() {
    // Handle scroll event on containing dialog so we can load more results if necessary
    this.scrollService.onScrolledDown$
      .pipe(
        tap((val) => console.log('scrollDown-->', val)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.fetchMoreItems());
  }

  private fetchMoreItems() {
    // add more items
    this.itemCount += 10;
  }

  public ngOnDestroy() {
    // Remove event handlers
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
