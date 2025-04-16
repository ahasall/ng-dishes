import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DishService } from '../dish.service';
import { httpResource } from '@angular/common/http';
import { DishSchema } from '../dish';
import { z } from 'zod';
import { DiscountSchema } from '../discount';
import { ErrorComponent } from '../error/error.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.page.html',
  imports: [RouterLink, ErrorComponent, SpinnerComponent],
  host: {
    class: 'wma-mini-container',
  },
})
export class DishDetailsPage {
  dishId = input.required<string>();
  service = inject(DishService);
  $dish = httpResource(() => `/api/dishes/${this.dishId()}`, {
    parse: DishSchema.parse,
  });
  $discount = httpResource(() => `/api/discounts/${this.dishId()}`, {
    parse: (value) => z.array(DiscountSchema).parse(value)[0],
  });
  blob = httpResource.blob(() => this.$dish.value()?.image);

  _ = effect(() => {
    if (this.blob.hasValue()) {
      const b = this.blob.value();
      const fileURL = URL.createObjectURL(b);

      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'image.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  });
}
