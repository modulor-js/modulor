import Router from '../src/router';


describe('Base functionality', () => {
  before(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  after(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router();

  it('returns root correctly', () => {
    assert.equal(router.root, '');
  });

  it('matches root correctly', () => {
    assert.equal(router.root_matches, true);
  });

  it('returns query string correctly', () => {
    assert.equal(router.qs, false);
    window.history.replaceState(null, null, '/?foo=bar');
    assert.equal(router.qs, 'foo=bar');
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    assert.equal(router.qs, 'foo=bar&bar=baz');
  });

  it('returns query params correctly', () => {
    window.history.replaceState(null, null, '/');
    assert.deepEqual(router.params, {});
    window.history.replaceState(null, null, '/?foo');
    assert.deepEqual(router.params, { foo: undefined });
    window.history.replaceState(null, null, '/?foo=bar');
    assert.deepEqual(router.params, { foo: 'bar' });
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    assert.deepEqual(router.params, { foo: 'bar', bar: 'baz' });
  });

  it('returns absolute path correctly', () => {
    assert.equal(router.global_path, '/');
  });

  it('returns relative path correctly', () => {
    assert.equal(router.path, '/');
  });

  it('adds handlers correctly', () => {
    let handler = () => {};
    router.add('/', handler);
    assert.equal(router.listeners.length, 1);
    assert.equal(router.listeners[0].callback, handler);
  });

  it('navigates correctly', () => {
    router.navigate('/bar');
    assert.equal(router.path, '/bar');
  });

  it('handles route correctly', () => {
    let handler = chai.spy(() => {});
    router.add('/foo', handler);
    router.navigate('/foo');
    expect(handler).to.have.been.called.once;
  });

  it('destroys correctly', () => {
    let handler = chai.spy(() => {});
    router.add('/bar', handler);
    router.destroy();
    router.navigate('/bar');
    expect(handler).not.to.have.been.called.once;
    assert.deepEqual(router.listeners, []);
  });
});

describe('Mount on subpath', () => {
  beforeEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  afterEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router({
    root: '/subpath'
  });

  it('matches root correctly', () => {
    assert.equal(router.root_matches, false);
    window.history.replaceState(null, null, '/subpath');
    assert.equal(router.root_matches, true);
    window.history.replaceState(null, null, '/subpath/foo');
    assert.equal(router.root_matches, true);
    window.history.replaceState(null, null, '/subpath2');
    assert.equal(router.root_matches, false);
  });

  it('returns absolute path correctly', () => {
    assert.equal(router.global_path, '/');
    window.history.replaceState(null, null, '/subpath');
    assert.equal(router.global_path, '/subpath');
  });

  it('returns relative path correctly', () => {
    assert.equal(router.path, false);
    window.history.replaceState(null, null, '/subpath');
    assert.equal(router.path, '');
    window.history.replaceState(null, null, '/subpath/bar');
    assert.equal(router.path, '/bar');
    window.history.replaceState(null, null, '/subpath_/foo');
    assert.equal(router.path, false);
  });

  it('navigates correctly', () => {
    router.navigate('/bar');
    assert.equal(router.path, false);
    window.history.replaceState(null, null, '/subpath');
    router.navigate('/bar');
    assert.equal(router.path, '/bar');
    assert.equal(router.global_path, '/subpath/bar');
    router.navigate('/subpath/baz', true);
    assert.equal(router.global_path, '/subpath/baz');
  });

  it('handles route correctly', () => {
    let handler = chai.spy(() => {});
    router.add('/foo', handler);
    window.history.replaceState(null, null, '/subpath/foo');
    router.resolve();
    expect(handler).to.have.been.called.once;
  });
});

describe('Routes handling', () => {
  beforeEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  afterEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router();

  it('handles nested routes correctly', () => {
    let handler1 = chai.spy(() => {});
    let handler2 = chai.spy(() => {});
    let handler3 = chai.spy(() => {});
    router.add('/', handler1);
    router.add('/foo', handler2);
    router.add('/*', handler3);
    router.resolve();
    expect(handler1).to.have.been.called.once;
    router.navigate('/foo');
    expect(handler2).to.have.been.called.once;
    expect(handler3).to.have.been.called.twice;
  });

  it('doesnt handle silent naviagation', () => {
    let handler1 = chai.spy(() => {});
    let handler2 = chai.spy(() => {});
    router.add('/', handler1);
    router.add('/foo', handler2);
    router.resolve();
    expect(handler1).to.have.been.called.once;
    router.navigate('/foo', false, false, true);
    expect(handler2).not.to.have.been.called.once;
  });

  it('passes correct params to handler', () => {
    let args;
    let handler = chai.spy((route, foo, params) => {
      //route argument should not be here
      args = [route, foo, params];
    });
    router.add('/:foo', handler);
    router.navigate('/test?foo=bar');
    expect(handler).to.have.been.called.once;
    assert.deepEqual(args, ['/test', 'test', { foo: 'bar' }]);
  });

  it('doesnt handle same url twice', () => {
    router.navigate('/foobar?foo=bar');
    let result = router.navigate('/foobar?foo=bar');
    assert.equal(result, false);
    let result2 = router.navigate('/foobar?foo=bar', true);
    assert.equal(result2, false);
  });

});

describe('Nested Routers', () => {
  beforeEach(() => {
    window.history.replaceState(null, null, '/');
  });

  afterEach(() => {
    window.history.replaceState(null, null, '/');
  });

  const root_router = new Router();
  const sub_router_1 = new Router();
  const sub_router_2 = new Router();

  root_router.mount('/test1', sub_router_1);
  root_router.mount('/test2', sub_router_2, true);


  it('mounts correctly', () => {
    assert.equal(sub_router_1.root, '/test1');
    assert.equal(sub_router_2.root, '/test2');
    assert.equal(sub_router_2.prevent, true);
  });

  it('handles routes correctly', () => {
    let handler1 = chai.spy(() => {});
    let handler2 = chai.spy(() => {});
    let handler3 = chai.spy(() => {});
    let handler4 = chai.spy(() => {});
    root_router.add('/test1', handler1);
    root_router.add('/test2', handler2);
    sub_router_1.add('/', handler3);
    sub_router_2.add('/', handler4);
    root_router.navigate('/test1');
    expect(handler1).to.have.been.called.once;
    expect(handler3).to.have.been.called.once;
    root_router.navigate('/test2');
    expect(handler2).not.to.have.been.called.once;
    expect(handler4).to.have.been.called.once;
  });

});
