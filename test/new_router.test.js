let { createDelegate } = require('../src/delegate');
let { fireEvent, attr } = require('../src/ascesis');
let { Router } = require('../src/new_router');


describe.only('new router', () => {

  let r = new Router();
  r.add('/:foo/:bar', (foo, bar) => {
    console.log(111111, foo, bar);
    return true;
  });

  let r1 = new Router();
  r1.add('/:foo/:bar?/:bla?', (foo, bar) => {
    console.log(2222222, foo, bar);
    return true;
  });
  r.mount('/foo', r1);
  //console.log(r.container.innerHTML);
  window.history.replaceState(null, null, '/foo/bar');
  //console.log(r1.getPath());
  //r.resolve();
  fireEvent('url-changed', window);


  it('foo', () => {
    //console.dir(window.location);
    expect(true);
  });
})
