import Router from '../src/router';


describe('Base functionality', () => {
  beforeAll(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  afterAll(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router();

  it('returns root correctly', () => {
    expect(router.root).toBe('');
  });

  it('matches root correctly', () => {
    expect(router.root_matches).toBe(true);
  });

  it('returns query string correctly', () => {
    expect(router.qs).toBe(false);
    window.history.replaceState(null, null, '/?foo=bar');
    expect(router.qs).toBe('foo=bar');
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    expect(router.qs).toBe('foo=bar&bar=baz');
  });

  it('returns query params correctly', () => {
    window.history.replaceState(null, null, '/');
    expect(router.params).toEqual({});
    window.history.replaceState(null, null, '/?foo');
    expect(router.params).toEqual({ foo: undefined });
    window.history.replaceState(null, null, '/?foo=bar');
    expect(router.params).toEqual({ foo: 'bar' });
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    expect(router.params).toEqual({ foo: 'bar', bar: 'baz' });
  });

  it('returns absolute path correctly', () => {
    expect(router.global_path).toEqual('/');
  });

  it('returns relative path correctly', () => {
    expect(router.path).toEqual('/');
  });

  it('adds handlers correctly', () => {
    let handler = () => {};
    router.add('/', handler);
    expect(router.listeners.length).toEqual(1);
    expect(router.listeners[0].callback).toEqual(handler);
  });

  it('navigates correctly', () => {
    router.navigate('/bar');
    expect(router.path).toEqual('/bar');
  });

  it('handles route correctly', () => {
    let handler = jest.fn(() => {});
    router.add('/foo', handler);
    router.navigate('/foo');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('destroys correctly', () => {
    let handler = jest.fn(() => {});
    router.add('/bar', handler);
    router.destroy();
    router.navigate('/bar');
    expect(handler).not.toHaveBeenCalled();
    expect(router.listeners).toEqual([]);
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
    expect(router.root_matches).toEqual(false);
    window.history.replaceState(null, null, '/subpath');
    expect(router.root_matches).toEqual(true);
    window.history.replaceState(null, null, '/subpath/foo');
    expect(router.root_matches).toEqual(true);
    window.history.replaceState(null, null, '/subpath2');
    expect(router.root_matches).toEqual(false);
  });

  it('returns absolute path correctly', () => {
    expect(router.global_path).toEqual('/');
    window.history.replaceState(null, null, '/subpath');
    expect(router.global_path).toEqual('/subpath');
  });

  it('returns relative path correctly', () => {
    expect(router.path, false);
    window.history.replaceState(null, null, '/subpath');
    expect(router.path, '');
    window.history.replaceState(null, null, '/subpath/bar');
    expect(router.path, '/bar');
    window.history.replaceState(null, null, '/subpath_/foo');
    expect(router.path, false);
  });

  it('navigates correctly', () => {
    router.navigate('/bar');
    expect(router.path).toEqual(false);
    window.history.replaceState(null, null, '/subpath');
    router.navigate('/bar');
    expect(router.path).toEqual('/bar');
    expect(router.global_path).toEqual('/subpath/bar');
    router.navigate('/subpath/baz', true);
    expect(router.global_path).toEqual('/subpath/baz');
  });

  it('handles route correctly', () => {
    let handler = jest.fn();
    router.add('/foo', handler);
    window.history.replaceState(null, null, '/subpath/foo');
    router.resolve();
    expect(handler).toHaveBeenCalled();
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
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    let handler3 = jest.fn();
    router.add('/', handler1);
    router.add('/foo', handler2);
    router.add('/*', handler3);
    router.resolve();
    expect(handler1).toHaveBeenCalledTimes(1);
    router.navigate('/foo');
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(2);
  });

  it('doesnt handle silent naviagation', () => {
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    router.add('/', handler1);
    router.add('/foo', handler2);
    router.resolve();
    expect(handler1).toHaveBeenCalledTimes(1);
    router.navigate('/foo', false, false, true);
    expect(handler2).not.toHaveBeenCalled();
  });

  it('passes correct params to handler', () => {
    let args;
    let handler = jest.fn();
    router.add('/:foo', handler);
    router.navigate('/test?foo=bar');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('/test', 'test', { foo: 'bar' });
  });

  it('doesnt handle same url twice', () => {
    router.navigate('/foobar?foo=bar');
    let result = router.navigate('/foobar?foo=bar');
    expect(result).toEqual(false);
    let result2 = router.navigate('/foobar?foo=bar', true);
    expect(result2).toEqual(false);
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
    expect(sub_router_1.root).toEqual('/test1');
    expect(sub_router_2.root).toEqual('/test2');
    expect(sub_router_2.prevent).toEqual(true);
  });

  it('handles routes correctly', () => {
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    let handler3 = jest.fn();
    let handler4 = jest.fn();
    root_router.add('/test1', handler1);
    root_router.add('/test2', handler2);
    sub_router_1.add('/', handler3);
    sub_router_2.add('/', handler4);
    root_router.navigate('/test1');
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(1);
    root_router.navigate('/test2');
    expect(handler2).not.toHaveBeenCalled();
    expect(handler4).toHaveBeenCalledTimes(1);
  });

});
