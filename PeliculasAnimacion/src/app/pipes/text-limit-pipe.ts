import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {
  transform(value: string, maxLength = 20): string {
    if (!value) return '';
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }

}
