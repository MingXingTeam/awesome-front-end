/** @jsx hJSX */
import { hJSX } from '@cycle/dom';
import { Observable } from 'rx';
import styles from './static-component.css';
//      p('Static content.')
// import { p } from '@cycle/dom';
export default function StaticComponent(sources) {
  const sinks = {
    DOM: Observable.just(
      <p className={styles.p}>Static content.</p>
    )
  };
  return sinks;
}