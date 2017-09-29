import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe',
  pure: false
})
export class CategoryPipe implements PipeTransform {

  transform(data: any, query: string) {
    if (data == null)
      return [];

    if (query == null)
      return data;

    return data.filter(data =>
        data.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

}
