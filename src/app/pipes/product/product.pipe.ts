import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'productPipe',
  pure: false
})
export class ProductPipe implements PipeTransform {

  transform(data: any, query: string) {
    if (data == null)
      return []

    if (query == null)
      return data;

    return data.filter(data =>
        data.category.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        data.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        data.quantity.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        data.price.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

}
