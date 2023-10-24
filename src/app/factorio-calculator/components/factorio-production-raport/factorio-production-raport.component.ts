import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactorioCalculatorService } from '../../raport-generation/factorio-calculator.service';
import { ProductionRaport } from '../../raport-generation/types/production-raport';

@Component({
  selector: 'app-factorio-production-raport',
  templateUrl: './factorio-production-raport.component.html',
  styleUrls: ['./factorio-production-raport.component.scss']
})
export class FactorioProductionRaportComponent {
  public raportAsString = '';
  public raport: ProductionRaport = new ProductionRaport([], []);

  private subscriptions: Subscription = new Subscription();
  
  constructor(private factorioService: FactorioCalculatorService) {
    this.subscriptions = this.factorioService.getRaport().subscribe(newRaport => this.handleNewRaport(newRaport));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ceil(number: number): number {
    return Math.ceil(number);
  }

  private handleNewRaport(newRaport: ProductionRaport | undefined) {
    if(newRaport === undefined) {
      newRaport = new ProductionRaport([], []); 
    }
    this.raport = newRaport;
    this.raportAsString = this.raport.toString();
  }
}
