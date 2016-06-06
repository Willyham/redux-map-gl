import test from 'tape';
import {fromJS} from 'immutable';

import Types from '../types';
import enhanceMapReducer, {onChangeViewport} from '../index';

const fooReducer = (state, action) => {
  return state;
};

test('It should export a reducer enhancer', (t) => {
  const enhancedFoo = enhanceMapReducer(fooReducer);
  const state = {};
  const newState = enhancedFoo(state, {type: 'test'});
  t.equal(typeof enhanceMapReducer, 'function');
  t.equal(typeof enhancedFoo, 'function');
  t.equal(state, newState);
  t.end();
});

test('It should defer to the base reducer', (t) => {
  const enhancedReducer = enhanceMapReducer((state, action) => {
    if (action.type === 'TEST') {
      return {
        a: 2
      };
    }
    return state;
  });
  const state = {
    a: 1
  };
  const newState = enhancedReducer(state, {type: 'TEST'});
  t.equal(newState.a, 2);
  t.end();
});

test('It should change viewport state', (t) => {
  const enhancedFoo = enhanceMapReducer(fooReducer);
  const state = {
    viewport: fromJS({
      zoom: 1,
      latitude: 2,
      longitude: 3
    })
  };
  debugger;
  const newState = enhancedFoo(state, {
    type: Types.CHANGE_VIEWPORT,
    payload: {
      mapState: {
        zoom: 4,
        latitude: 5,
        longitude: 6
      }
    }
  });
  t.deepEqual(newState.viewport.toJS(), {
    zoom: 4,
    latitude: 5,
    longitude: 6
  });
  t.end();
});

test('It should set default viewport state', (t) => {
  const enhancedFoo = enhanceMapReducer(fooReducer, {
    latitude: 1,
    longitude: 2
  });
  const newState = enhancedFoo(undefined, {});
  t.deepEqual(newState.viewport.toJS(), {
    latitude: 1,
    longitude: 2,
    zoom: 1,
    bearing: 0,
    isDragging: false,
    startDragLngLat: undefined
  });
  t.end();
});

test('It should set state under any key', (t) => {
  const enhancedFoo = enhanceMapReducer(fooReducer, {
    latitude: 1,
    longitude: 2
  }, 'sausages');
  const newState = enhancedFoo(undefined, {});
  t.deepEqual(newState.sausages.toJS(), {
    latitude: 1,
    longitude: 2,
    zoom: 1,
    bearing: 0,
    isDragging: false,
    startDragLngLat: undefined
  });
  t.end();
});
