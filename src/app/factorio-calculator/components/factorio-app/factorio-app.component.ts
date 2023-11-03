import { Component, OnDestroy } from '@angular/core';
import { FactorioCalculatorService } from '../../raport-generation/factorio-calculator.service';
import { Subscription } from 'rxjs';
import { Item } from '../../raport-generation/types/item';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-factorio-app',
  templateUrl: './factorio-app.component.html',
  styleUrls: ['./factorio-app.component.scss'],
  providers: [ FactorioCalculatorService ]
})
export class FactorioAppComponent implements OnDestroy {
  public currentInputs: string[] = [];
  public availableInputs: string[] = [];
  public currentOutputs: Item[] = [];
  public availableOutputs: string[] = [];

  private subscriptions: Subscription;

  public blueprintWidth: number = 0;
  
  constructor(private factorioService: FactorioCalculatorService, private clipboard: Clipboard) {
    this.subscriptions = this.factorioService.getCurrentInputs().subscribe(newData => this.currentInputs = newData);
    this.subscriptions.add(this.factorioService.getAvailableInputs().subscribe(newData => this.availableInputs = newData));
    this.subscriptions.add(this.factorioService.getCurrentRequestedOutputs().subscribe(newData => this.currentOutputs = newData));
    this.subscriptions.add(this.factorioService.getAvailableOutputs().subscribe(newData => this.availableOutputs = newData));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onClick(): void {
    const blueprintString = this.factorioService.calculateBlueprintFromRaport(this.blueprintWidth);
    console.log({blueprintString});
    this.clipboard.copy(blueprintString);
  }
}
