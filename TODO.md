**core**

* ~~extract dom_utils.js from modulor.js, still export them from modulor.js, mark them as deprecated~~

* ~~make dom_utils suitable for functional programming, implement currying of utils~~

* ~~put 'proxy files' on root level ([filename].js -> build/[filename].js, [filename].es6.js -> src/[filename].js)~~

* ~~add basic DOM functions (attr(), addClass(), removeClass(), toggleClass(), $())~~

* ~~add $ function which returns array of elements by selector~~

* add $$ hash with refs (??)

* ~~.html() should return refs~~

* ~~allow html() to take DocumentFragment as first argument [#10](https://github.com/holidaypirates/modulor/issues/10)~~

* ~~replace childComponents with getter, use DOM traverse~~

* ~~remove QueriableArray class, remove querySelector[All] methods on child components~~

* ~~rewrite toArray according to tests https://jsperf.com/nodelist-to-array and https://jsperf.com/slice-call-vs-for-loop454545~~

* implement mixins according to http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/ or https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/ (check this one on transpileability) similar

* implement attribute to property proxy like in skatejs


**router**

* ~~add setParam function~~

* ~~support custom query parser/builder~~

* handle query params in hashmode (??)

* fix bug with parameters update when there is no base (path gets removed)


**delegate**

* add capturing support

* handle errors in handlers + tests

* rename 'listeners' property of observed elements to something more uniq (e.g. __modulor_delegate_listeners)

* handle .off('event') error when there are no listeners of this event

* fix stopPropagation() (addEventListener catches stopped events anyway)

**common**

* refactor tests
