import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'checklistPipe',
  pure: false
})
export class ChecklistPipe implements PipeTransform {

  transform(data: any, query: string) {
    if (data == null)
      return []

    if (query == null)
      return data;

    return data.filter(data =>
        data.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

}
