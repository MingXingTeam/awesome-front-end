/** @jsx hJSX */
import { hJSX } from '@cycle/dom';
import { Observable } from 'rx';
import styles from './dynamic-component.css';
//      p('Static content.')
// import { p } from '@cycle/dom';
export default function DynamicComponent(sources) {
  // const seconds$ = Observable.interval(1000)
  //   .startWith(Math.ceil(Math.random() * 100))
  //   .scan(seconds => seconds + 1);
  const timer$ = Observable.timer(0, 1000).publish();
  timer$.connect();

  const seconds$ = timer$.shareReplay(1).scan(seconds => seconds + 1);

　const vtree$ = seconds$.map(seconds =>
    <div className={styles.container}>
      I count {seconds} seconds.
    </div>
  );

  return {
    DOM: vtree$
  };
  // const sinks = {
  //   DOM: Observable.just(
  //     <p className={styles.p}>Static content.</p>
  //   )
  // };
  // return sinks;
}