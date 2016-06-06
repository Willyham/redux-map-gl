import reducer from './reducer';
import {changeViewport} from './actions';

export const onChangeViewport = (mapState) => {
  return changeViewport(mapState);
}
export default reducer;
