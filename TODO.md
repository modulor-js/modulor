**core**

* ?? extract acsesis_utils from ascesis.js 

* put 'proxy files' on root level ([filename].js -> build/[filename].js, [filename].es6.js -> src/[filename].js)

* ~~add basic DOM functions (attr(), addClass(), removeClass(), toggleClass(), $())~~

* ~~add $ function which returns array of elements by selector~~

* add $$ hash with refs

* ~~replace childComponents with getter, use DOM traverse~~

* remove QueriableArray class, remove querySelector[All] methods on child components

* ~~rewrite toArray according to tests https://jsperf.com/nodelist-to-array and https://jsperf.com/slice-call-vs-for-loop454545~~

* implement mixins according to http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/ or similar

**router**

* add setParam function

**common**

* refactor tests
