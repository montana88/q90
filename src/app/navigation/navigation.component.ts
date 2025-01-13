import { Component } from '@angular/core';
import { faGauge, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

const items = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: faGauge
  },
  {
    name: 'Help',
    path: '/help',
    icon: faCircleQuestion
  },
]

@Component({
  selector: 'app-navigation',
  imports: [NavigationItemComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  items = items;
}
