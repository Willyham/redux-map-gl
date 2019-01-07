# redux-map-gl

A small library to remove the boilerplate of connecting the [react-map-gl](https://github.com/uber/react-map-gl/) component to a redux store.

## Getting started

### Install

```sh
$ npm install --save redux-map-gl
```

### Usage Example

The redux-map-gl package consists of two parts, a reducer enhancer (or just a reducer) which you should connect to your store and an action creator which you should dispatch.

```javascript
import {combineReducers} from 'redux';
import {createViewportReducer} from 'redux-map-gl';

import fooReducer from './foo';

export default combineReducers({
  foo: fooReducer,
  map: createViewportReducer()
});
```

Once the reducer is connected to the store, simply modify your map container to pass the `mapState` back to your Map component
and pass the onChangeViewport as an action creator to be dispatched. By default, the reducer will attach all map state under the `viewport` key.

The map state is an immutableJS object. If you want a plain object, call `.toJS()` on the viewport state.

```javascript
import {connect} from 'react-redux';
import {onChangeViewport} from 'redux-map-gl';

import Map from '../components/map/map';
import {getMapStyle} from '../selectors/map-style';

function mapStateToProps(state) {
  const mapState = state.map.viewport.toJS();
  const mapStyle = getMapStyle(state);

  return {
    mapState,
    mapStyle
  };
}

const actions = {
  onChangeViewport
};

export default connect(mapStateToProps, actions)(Map);

```

In your Map component, you can then render with the mapState:

```javascript
import React, {PropTypes} from 'react';
import MapGL from 'react-map-gl';

import {MAPBOX_ACCESS_TOKEN} from '../../lib/constants';

const Map = ({
  mapState,
  mapStyle,
  onChangeViewport
}) => {

  return (
    <MapGL
      {...mapState}
      showZoomControls={true}
      width={500}
      height={500}
      mapStyle={mapStyle}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      onViewportChange={onChangeViewport}
    />
  );
};

export default Map;
```

### Use as an enhancer

If you already have a map reducer which handles some other map state, such as things to show on the map, then you may want to enhance that reducer rather than replacing it.
redux-map-gl exports a reducer enhancer by default for this purpose. For example:

```javascript
import {combineReducers} from 'redux';
import enhanceMapReducer from 'redux-map-gl';

import fooReducer from './foo';
import mapReducer from './map';

export default combineReducers({
  foo: fooReducer,
  map: enhanceMapReducer(mapReducer)
});
```

This will add the `viewport` key to your existing `map` state tree, but defer all other actions to your existing reducer.

## Defaults and options

As many apps will render an initial map in a specific place before the viewport changes, you can specify default options as the second argument to
the reducer or reducer enhancer:

```javascript
export default combineReducers({
  foo: fooReducer,
  map: enhanceMapReducer(mapReducer, {
    latitude: 52.1,
    longitude: 0,
    zoom: 10,
    bearing: 90
  })
});
```

If you wish to put the viewport state under a different key. You can do this by passing it as a third parameter:

```javascript
export default combineReducers({
  foo: fooReducer,
  map: enhanceMapReducer(mapReducer, {}, 'world')
});
```

In this example, state could be fetched with `state.map.world`.

## Development

```sh
$ npm install
$ npm run build
```
