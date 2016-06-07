import {fromJS} from 'immutable';

import Types from './types';

const identityReducer = (state) => state;

/**
 * viewportReducer can be used directly as a reducer rather than an enhancer
 * @param  {[type]} defaults [description]
 * @param  {[Object]} defaults = {} defaults for the initial state
 * @param  {[String]} key = 'viewport' The key which the state should be stored under
 * @return {Function} A viewport reducer
 */
export function createViewportReducer(defaults, key) {
  return enhanceReducer(identityReducer, defaults, key);
}

/**
 * Enhance a reducer by adding support for managing react-map-gl state.
 * @param  {Function} reducer The reducer to enhance
 * @param  {[Object]} defaults = {} defaults for the initial state
 * @param  {[String]} key = 'viewport' The key which the state should be stored under
 * @return {Function} An enhanced reducer
 */
export default function enhanceReducer(reducer, defaults = {}, key = 'viewport') {
  const initialState = {
    [key]: fromJS({
      latitude: 0,
      longitude: 0,
      bearing: 0,
      zoom: 1,
      isDragging: false,
      startDragLngLat: undefined,
      ...defaults
    })
  };

  return (state = initialState, action) => {
    switch(action.type) {
      case Types.CHANGE_VIEWPORT: {
        return {
          ...state,
          [key]: state[key].merge(action.payload.mapState)
        };
      }
      default:
        return reducer(state, action);
    }
  };
}
