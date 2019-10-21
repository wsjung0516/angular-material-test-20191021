import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../test-carousel/test-carousel.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent {
  slides: { image: string, text: string }[] = [];
  activeSlideIndex = 0;

  constructor(
//    public dialogRef: MatDialogRef<CarouselComponent>,
//    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }
/*
  onNoClick(): void {
    this.dialogRef.close();
  }
*/
  addSlide(): void {
    this.slides.push({
      image: `assets/images/${this.slides.length % 4 + 1}.jpg`,
      text: 'slide'
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
