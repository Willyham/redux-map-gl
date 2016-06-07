import enhance, {viewportReducer} from './reducer';
import {changeViewport} from './actions';

const onChangeViewport = (mapState) => {
  return changeViewport(mapState);
}
export {
  viewportReducer,
  onChangeViewport
}

export default enhance;
