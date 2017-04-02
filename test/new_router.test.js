let { createDelegate } = require('../src/delegate');
let { fireEvent, attr } = require('../src/ascesis');
let { Router } = require('../src/new_router');


describe.only('new router', () => {

  let r = new Router();
  r.add('/:foo/:bar', (foo, bar) => {
    console.log(111111, foo, bar);
    return false;
  });

  let r1 = new Router();
  r1.add('/*', (foo) => {
    console.log(2222222, foo);
    return true;
  });
  r.mount('/foo', r1);
  //console.log(r.container.innerHTML);
  //console.log(r1.getRoot());
  window.history.replaceState(null, null, '/foo/bar');
  r.resolve();
  //fireEvent('url-changed', window);


  it('foo', () => {
    //console.dir(window.location);
    expect(true);
  });
})
