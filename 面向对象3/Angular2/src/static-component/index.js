import { Component, View } from 'angular2/angular2';
import styles from './static-component.css';
//        template: `<p>Static content.</p>`

export default class StaticComponent {
  static get annotations() {
    return [
      new Component({
        selector: 'static-component'
      }),
      new View({
        template: `<p class="${styles.p}">Static content.</p>`
      })
    ];
  }
}