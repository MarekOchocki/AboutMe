import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactorioCalculatorService } from '../../raport-generation/factorio-calculator.service';

@Component({
  selector: 'app-factorio-inputs',
  templateUrl: './factorio-inputs.component.html',
  styleUrls: ['./factorio-inputs.component.scss']
})
export class FactorioInputsComponent implements OnDestroy {
  public currentInputs: string[] = [];
  public availableInputs: string[] = [];

  private subscriptions: Subscription = new Subscription();
  
  constructor(private factorioService: FactorioCalculatorService) {
    this.subscriptions = this.factorioService.getCurrentInputs().subscribe(newData => this.currentInputs = newData);
    this.subscriptions.add(this.factorioService.getAvailableInputs().subscribe(newData => this.handleNewAvailableInputs(newData)));
  }

  public addNewInput(value: string): void {
    this.factorioService.addInput(value);
  }

  public deleteItem(name: string): void {
    this.factorioService.removeInput(name);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleNewAvailableInputs(newData: string[]) {
    this.availableInputs = newData;
  }
}
