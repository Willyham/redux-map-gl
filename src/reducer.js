import {fromJS} from 'immutable';

import Types from './types';

/**
 * [createReducer description]
 * @param  {[type]} {latitude = 0 [description]
 * @param  {[type]} longitude = 0 [description]
 * @param  {[type]} bearing = 0 [description]
 * @param  {[type]} zoom = 12} = {} [description]
 * @return {[type]} [description]
 */
export default function mapReducer(reducer, defaults = {}, key = 'viewport') {
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
