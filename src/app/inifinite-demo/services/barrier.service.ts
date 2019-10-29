import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BarrierService {
  queue = {
    arrived_at_barrier: [],
    totalCallbacks: 3
  };

  constructor() {
  }

  order(callback, executionTime) {
    return () => {
      let queueLength = 0;
      for (let i in this.queue.arrived_at_barrier) {
        queueLength++;
      }

      this.queue.arrived_at_barrier[callback.name] = {
        "executionTime": executionTime,
        "callback": callback
      };


      if (queueLength < -1 + this.queue.totalCallbacks) {
        //BARRIER
        console.log("new one");
      } else {
        console.log("last one added, starting to run all of them in order...");
        //Now order A,B,C according to their .executionTime and run them in that order

        let inOrder = [];
        for (let i in this.queue.arrived_at_barrier) {
          inOrder.push(this.queue.arrived_at_barrier[i]);
        }


        inOrder.sort(function (a, b) {
          if (a.executionTime < b.executionTime) return -1;
          if (a.executionTime > b.executionTime) return +1;
          return 0;
        });
        for (var j = 0; j < inOrder.length; j++) {
          //RUN the callbacks
          inOrder[j].callback();
        }
      }
    };
  }
}

