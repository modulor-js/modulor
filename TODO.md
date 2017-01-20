**core**

* ?? html function should return: `[documentFragment, refs]`

* ?? extract acsesis_utils from ascesis.js 

* put 'proxy files' on root level ([filename].js -> build/[filename].js, [filename].es6.js -> src/[filename].js)

* add basic DOM functions (attr(), addClass(), removeClass(), toggleClass(), $())

* add $$ function which returns array of elements by selector

* add $ hash with refs

* ~~replace childComponents with getter, use DOM traverse~~

**router**

* add setParam function

**common**

* refactor tests
