import Types from './types';

export function changeViewport(mapState) {
  return {
    type: Types.CHANGE_VIEWPORT,
    payload: {
      mapState
    }
  };
}
