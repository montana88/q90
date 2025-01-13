import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navigation-item',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss'
})
export class NavigationItemComponent {
  icon = input.required<IconProp>();
  name = input.required<string>();
  path = input.required<string>();
  selectedItem = output<string>();

}