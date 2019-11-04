import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-p-dragdrop',
  templateUrl: './p-dragdrop.component.html',
  styleUrls: ['./p-dragdrop.component.css']
})
export class PDragdropComponent implements OnInit {
  items = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados',
    'Oranges',
    'Bananas',
    'Cucumbers'
  ];

  basket = [
  ];
  pItems;
  constructor() { }

  ngOnInit() {
    this.pItems = [...this.items];
  }

  dropA(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('A--dropA', event.container.data)
      console.log('A--dropB', event.previousContainer.data)
    }
  }
  dropB(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('dropA', event.previousContainer.data)
      console.log('dropB', event.currentIndex, event.container.data)
    }
  }
}
