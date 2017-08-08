**core**

* extract dom_utils.js from ascesis.js, still export them from ascesis.js, mark them as deprecated

* make dom_utils suitable for functional programming, implement currying of utils 

* ~~put 'proxy files' on root level ([filename].js -> build/[filename].js, [filename].es6.js -> src/[filename].js)~~

* ~~add basic DOM functions (attr(), addClass(), removeClass(), toggleClass(), $())~~

* ~~add $ function which returns array of elements by selector~~

* add $$ hash with refs (??)

* .html() should return refs

* ~~replace childComponents with getter, use DOM traverse~~

* remove QueriableArray class, remove querySelector[All] methods on child components

* ~~rewrite toArray according to tests https://jsperf.com/nodelist-to-array and https://jsperf.com/slice-call-vs-for-loop454545~~

* implement mixins according to http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/ or https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/ (check this one on transpileability) similar

**router**

* ~~add setParam function~~

* support custom query parser/builder

* handle query params in hashmode (??)


**delegate**

* add capturing support

* handle errors in handlers + tests

* rename 'listeners' property of observed elements to something more uniq (e.g. __ascesis_delegate_listeners)

* handle .off('event') error when there are no listeners of this event

**common**

* refactor tests
