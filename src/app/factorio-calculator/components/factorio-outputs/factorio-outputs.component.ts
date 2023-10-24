import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactorioCalculatorService } from '../../raport-generation/factorio-calculator.service';
import { Item } from '../../raport-generation/types/item';

@Component({
  selector: 'app-factorio-outputs',
  templateUrl: './factorio-outputs.component.html',
  styleUrls: ['./factorio-outputs.component.scss']
})
export class FactorioOutputsComponent {
  public currentOutputs: Item[] = [];
  public availableOutputs: string[] = [];

  private subscriptions: Subscription = new Subscription();
  
  constructor(private factorioService: FactorioCalculatorService) {
    this.subscriptions = this.factorioService.getCurrentRequestedOutputs().subscribe(newData => this.currentOutputs = newData);
    this.subscriptions.add(this.factorioService.getAvailableOutputs().subscribe(newData => this.handleNewAvailableOutputs(newData)));
  }

  public addNewOutput(value: string): void {
    this.factorioService.addOutput(new Item(value, 1));
  }

  public deleteItem(name: string): void {
    this.factorioService.removeOutput(name);
  }

  public onProductionCountChange(newValue: number | null, item: Item): void {
    console.log({foo: 'onProductionCountChange', newValue});
    if(newValue !== null && newValue >= 0) {
      console.log({foo: 'onProductionCountChange: in', newValue});
      this.factorioService.changeOutputAmount(item.name, newValue);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleNewAvailableOutputs(newData: string[]) {
    this.availableOutputs = newData;
  }
}
