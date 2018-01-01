# Cryptocurrency portfolio manager GUI

Built on top of the CoreUI Vue.js theme (Vue_Starter, not Vue_Full_Project;
https://github.com/mrholek/CoreUI-Vue) using the templates configured
webpack / Vue.js setup and components.

> All components have been edited, but the ones not originally from the template
are named Portfolio* and CurrencyTable.

## Run
```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

### Running the API on a different system?
If the API is running on a different system to the one hosting this then
the const API_URL = 'http://localhost:3000/' in ./src/portfolioAPIConnector.js
to match the new server ip/port combination.

## Build 
``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
