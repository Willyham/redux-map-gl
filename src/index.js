import enhance, {createViewportReducer} from './reducer';
import {changeViewport} from './actions';

const onChangeViewport = (mapState) => {
  return changeViewport(mapState);
}
export {
  createViewportReducer,
  onChangeViewport
}

export default enhance;
