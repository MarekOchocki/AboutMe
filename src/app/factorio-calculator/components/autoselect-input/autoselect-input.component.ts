import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { KebabToPrettyTextPipe } from 'src/app/pipes/kebab-to-pretty-text.pipe';

@Component({
  selector: 'app-autoselect-input',
  templateUrl: './autoselect-input.component.html',
  styleUrls: ['./autoselect-input.component.scss']
})
export class AutoselectInputComponent {
  addInputControl = new FormControl('');
  public filteredOptions: Observable<string[]> = of([]);
  public showAutocomplete = false;
  private availableOptions: string[] = [];

  @Output() click = new EventEmitter<string>();
  
  @Input() placeholder: string = '';
  @Input() set options(availableOptions: string[]) {
    this.availableOptions = availableOptions;
    this.filteredOptions = this.addInputControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = value?.toLocaleLowerCase() ?? '';
        return this.availableOptions.filter(o => this.machesPrettifiedText(o, filterValue));
      }),
    );
  }

  constructor(private eRef: ElementRef) {
  }

  emitNewValue(newValue: string): void {
    this.click.emit(newValue);
    this.addInputControl.reset();
  }

  onFocus() {
    this.showAutocomplete = true;
  }

  onFocusOut() {
    this.showAutocomplete = false;
  }
  
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.onFocusOut();
    }
  }

  private machesPrettifiedText(value: string, filterValue: string): boolean {
    const pipe = new KebabToPrettyTextPipe();
    return pipe.transform(value).toLocaleLowerCase().includes(filterValue);
  }
}
