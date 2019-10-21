import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CarouselComponent} from '../carousel/carousel.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-test-carousel',
  templateUrl: './test-carousel.component.html',
  styleUrls: ['./test-carousel.component.css']
})
export class TestCarouselComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  displayCarousel() {
    const dialogRef = this.dialog.open(CarouselComponent, {
      width: '600px',
      height: '400px',
      data: {name: 'aaa', animal: 'bbb'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, resule', result);
    });
  }


}
