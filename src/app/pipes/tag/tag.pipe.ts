import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagPipe',
  pure: false
})
export class TagPipe implements PipeTransform {

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
