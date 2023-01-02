# Shopinity Admin Panel

## Technologies

-  Core: `react`, `react-dom`, `react-router`, `redux`,`redux-toolkit`, `axios`
-  Dev: `npm`, `react-scripts`, `react-css-modules`, `sass`, `prettier`
-  UI: `material-ui`, `recharts`

## Scripts

### `npm ... [packages]`

-  **`install`** Add dependencies
-  **`uninstall`** Remove dependencies
-  **`upgrade`** Upgrade dependencies

### `npm ...`

-  **`dev`** Starts app in development mode.
-  **`build`** Creates an optimized production build.
-  **`serve`** Serves `/build`.
-  **`analyze`** Analyzes app's bundle size.
-  **`format`** Formats staged files.

## Naming Conventions

> Files with different types named this way: [fle_name].[type].[extension], e.g. `foo.test.js`, `foo.container.js`, `foo.reducer.js`, `foo.ac.js` (action creators), `foo.module.scss`.

-  Folders, css files, JS files and variables that are not component are **camelCase**.
-  class names and Components are **PascalCase**.

## Imports

Order of imports:

```js
// node_modules
import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

// other: components, utils, actions, ...
import { fetchHumanResources } from 'redux/actions';

import Calendar from './calendar';

// assets
import { ReactComponent as Icon } from 'assets/icons/icon.svg';

// css
import './styles.scss';
```

## CSS

With help of babel-plugin for react-css-modules we can use stylesheets and classes in a better way.

```js
import css from 'app.module.scss';

const App = () => {
   return (
      <>
         <div className={css.container}></div>
         <div className={css['some-thing']}></div>
      </>
   );
};
```

## Functional Components Structure

> Any variable that is not depend on component state or props should be outside of on it!

Following is the order of logics inside component:

1. Expressions and Computations
2. useRefs, useContexts and useDispatch
3. Local State: useState and useReducer
4. Global State: useSelector
5. Side Effects: useEffect
6. Functions and Handlers
7. return (`<Element />`)

#### `Component.js`

```js
const obj = {
    title: 'foo'
}

const Component = (props) => {
    const foo = props.foo;
    const arr = props.array.map(el => el);
    const x = func();
    const y = useMemo(() => /* computations */, [])

    const ref = useRef(null);
    const { value } = useContext(context);
    const dispatch = useDispatch();

    const [state, state] = useState(false);
    const [state2, dispatchLocal] = useReducer(reducer, initialState);

    const { ... } = useSelector(selector);

    useEffect(() => /* side effects */, []);

    const clickHandler = e => {}

    return (
        <div onClick={clickHandler} foo={foo}>
            Hello World!
        </div>
    )
}

export default Component;
```
