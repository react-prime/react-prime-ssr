<p align="center">
  <img src="https://github.com/JBostelaar/react-prime/blob/master/src/static/images/prime-logo.png" alt="prime-logo" width="250px" />
</p>

# React Prime SSR

## Quick start
Use [create-react-prime](https://www.npmjs.com/package/create-react-prime) for easy install.
```
npx create-react-prime -b react-ssr my-app
cd my-app
npm start
```

## Features
* [TypeScript](https://www.typescriptlang.org/)
* [NextJS](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Redux Thunk](https://github.com/gaearon/redux-thunk) to handle async actions
* [Next Redux Wrapper](https://github.com/kirill-konshin/next-redux-wrapper) to simplify server-client state sync
* [Styled-Components](https://www.styled-components.com)
* [Workbox](https://developers.google.com/web/tools/workbox/) for offline support and caching
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience).
* [ESLint](http://eslint.org) to maintain a consistent code style
* Refer to `package.json` for more details

## NPM Scripts
* Start develop server: `$ npm start`
* Create production build: `$ npm run build`
* Start server: `$ npm run server`
* Run ESLint: `$ npm run lint`
* Run webpack-bundle-analyzer: `$ npm run analyzer`

## Deployment
Make sure all modules are installed:
`$ npm install`

Create a build for production, this will add a `/dist` folder to the root with all bundles.
`$ npm run build`

Run the server file to start server:
`$ npm run server`

For production I recommend to use [PM2](http://pm2.keymetrics.io/) to run the server with advanced process management.

## Development Workflow
### Components
The components are separated in `Modules` and `Common`. Modules are bundled components which depend on each other. Common components are components that are self-contained and can be used through the entire app.

### Ducks
This boilerplate uses the [Ducks](https://github.com/erikras/ducks-modular-redux) pattern for Redux, that means that the actionTypes, actions and reducers are bundled together in an isolated module.

### Redux DevTools
To use de Redux DevTools install the [Redux DevTools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) from the chrome webstore.

### Static Assets
Any static assets, such as images, are now placed inside the `public` folder. Next will optimize these assets when you use the `<Image />` component provided by Next and importing can be done simply by writing the relative URL (i.e. `/images/your-img.png`) in both CSS and JS. Because of the way SVG images are handled by React, these are still placed in the `src/static/vectors` folder and can be used as a React component.
