import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabToPrettyText',
  pure: true
})
export class KebabToPrettyTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }

}
