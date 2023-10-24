import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-production-number-input',
  templateUrl: './production-number-input.component.html',
  styleUrls: ['./production-number-input.component.scss']
})
export class ProductionNumberInputComponent {
  public currentValue: string = '1';

  @Input() set model(newValue: number) {
    this.currentValue = `${newValue}`;
  }

  @Output() modelChange = new EventEmitter<number>();

  formatValue(): void {
    let currentValueAsNumber = +this.currentValue;
    if(Number.isNaN(currentValueAsNumber) || currentValueAsNumber < 0) {
      currentValueAsNumber = 0;
    }
    this.currentValue = `${currentValueAsNumber}`;
    this.modelChange.emit(currentValueAsNumber);
  }
}
