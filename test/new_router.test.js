let { createDelegate } = require('../src/delegate');
let { fireEvent, attr } = require('../src/ascesis');
let { Router } = require('../src/new_router');


describe.only('new router', () => {

  let r = new Router();
  r.add('/test', () => {
    console.log(111111);
    return false;
  });

  let r1 = new Router();
  r1.add('/bar', () => {
    console.log(2222222);
    return true;
  });
  r.mount('/foo', r1);
  //console.log(r.container.innerHTML);
  //console.log(r1.getRoot());
  window.history.replaceState(null, null, '/bar');
  fireEvent('popstate', window)
  //fireEvent('url-changed', r.container);

  //let a = document.createElement('div');
  //attr(a, 'route', '/');

  //let b = document.createElement('div');
  //attr(b, 'route', '/foo');

  //let c = document.createElement('div');
  //attr(c, 'route', '/bar');

  //c.rootMatches = (e) => {
    //let path = e.traverse
                //.reduce((acc, el) => acc.concat(attr(el, 'route') || []) , [])
                //.reverse()
                //.join('')
                //.replace(/\/\//ig, '/');
    //return !!~window.location.pathname.indexOf(path);
  //}

  //a.appendChild(b);
  //a.appendChild(c);

  ////console.log(a.innerHTML);

  ////let delegate = createDelegate(a);

  //a.addEventListener('foo', (e) => {
    //console.log(e.target[>, e.target.rootMatches(e)<]);
  //});

  //fireEvent('foo', c);

  it('foo', () => {
    //console.dir(window.location);
    expect(true);
  });
})
