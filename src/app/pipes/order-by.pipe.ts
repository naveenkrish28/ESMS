import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {
    if (propertyName)
      return value.sort((b: any, a: any) => b[propertyName].toString().localeCompare(a[propertyName].toString()));
    else
      return value;
  }

}
