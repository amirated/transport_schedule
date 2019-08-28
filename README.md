# Quick start

## setup
$ npm install
$ npm start

For building:
$ npm run build

This will create a dist folder with the combined static bundle in the project root directory. The path can be changed from the webpack.config.js >> module.exports >> output 


## Reference
The testing framework used is Jest: https://jestjs.io/

Bundling is done using webpack: https://webpack.js.org

Antd library has been used for the design: https://ant.design/docs/react/introduce


## To keep in mind: 
### geolocation
Although the geolocation is being fetched, its value is not being used in fetching the data. 

### logging
Since there was no requirement for maintaining the states, Redux was not used. When used, it can serve as a good logging tool.

### realtime
The ideal solution for realtime web application is to fetch data from a websocket api. In this example, periodic REST calls are made to update the data (not ideal).
