[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# babel-plugin-transform-react-router-optimize

The [React Router][0] library exposes all methods on the top level import, but
allows developers to use imports referencing files directly inside `/lib`,
which can result in smaller bundle sizes as it doesn't import all of the
Router's dependencies.

See here for more information: [Minimizing Bundle Size][1].

This plugin can be added to your `.babelrc` file and automatically transform
ES2015 imports to their size optimized counterpart.

## Example
**In**
```javascript
import { Route, IndexRoute } from 'react-router';
```

**Out**
```javascript
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
```

## Installation
**Note** This plugin is built for babel 6 and does not work with babel 5.
```sh
npm install --save-dev babel-plugin-transform-react-router-optimize
```

## Usage

### Via `.babelrc` (recommended)
**.babelrc**
```json
{
  "plugins": ["transform-react-router-optimize"]
}
```

### Via CLI
```sh
babel --plugins transform-react-router-optimize script.js
```

### Via Node API
```javascript
require('babel-core').transform('code', {
    plugins: ['transform-react-router-optimize']
});
```

## License

MIT

[0]: https://github.com/reactjs/react-router/
[1]: https://github.com/reactjs/react-router/blob/master/docs/guides/MinimizingBundleSize.md