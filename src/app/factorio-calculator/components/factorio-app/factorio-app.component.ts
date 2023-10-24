import { Component, OnDestroy } from '@angular/core';
import { FactorioCalculatorService } from '../../raport-generation/factorio-calculator.service';
import { Subscription } from 'rxjs';
import { Item } from '../../raport-generation/types/item';

@Component({
  selector: 'app-factorio-app',
  templateUrl: './factorio-app.component.html',
  styleUrls: ['./factorio-app.component.scss']
})
export class FactorioAppComponent implements OnDestroy {
  public currentInputs: string[] = [];
  public availableInputs: string[] = [];
  public currentOutputs: Item[] = [];
  public availableOutputs: string[] = [];

  private subscriptions: Subscription;
  
  constructor(private factorioService: FactorioCalculatorService) {
    this.subscriptions = this.factorioService.getCurrentInputs().subscribe(newData => this.currentInputs = newData);
    this.subscriptions.add(this.factorioService.getAvailableInputs().subscribe(newData => this.availableInputs = newData));
    this.subscriptions.add(this.factorioService.getCurrentRequestedOutputs().subscribe(newData => this.currentOutputs = newData));
    this.subscriptions.add(this.factorioService.getAvailableOutputs().subscribe(newData => this.availableOutputs = newData));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
