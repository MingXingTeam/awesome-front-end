/** @jsx hJSX */
import { run } from '@cycle/core';
import { makeDOMDriver, hJSX } from '@cycle/dom';
// import { makeDOMDriver, div } from '@cycle/dom';
import { Observable } from 'rx';
import isolate from '@cycle/isolate';
import combineLatestObj from 'rx-combine-latest-obj';
import InteractiveComponent from './interactive-component';
  // const vtree$ = staticComponent.DOM.map(staticVTree => div(staticVTree));

function main(sources) {
  const componentVtrees$ = combineLatestObj({
    interactiveComponent1$: isolate(InteractiveComponent)(sources).DOM,
    interactiveComponent2$: isolate(InteractiveComponent)(sources).DOM
  });
  const vtree$ = componentVtrees$.map(vtrees =>
    <div>
       {vtrees.interactiveComponent1}
       {vtrees.interactiveComponent2}
    </div>
  );
  
  // const vtree = div();
  // const vtree$ = Observable.just(vtree);
  // const staticComponent = StaticComponent(sources);
  // const vtree$ = staticComponent.DOM.map(staticVTree => <div>{staticVTree}</div>);
  const sinks = {
    DOM: vtree$
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#example-app')
};

run(main, drivers);