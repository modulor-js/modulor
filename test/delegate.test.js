let { delegate, createDelegate } = require('../src/delegate');
let { fireEvent } = require('../src/modulor');

describe('Delegation', () => {
  let container = document.createElement('div');
  let _delegate;
  beforeEach(() => {
    _delegate = new createDelegate(document.body);
    document.body.appendChild(container);
    container.innerHTML = `
      <div id="layer-0">
        <div id="layer-1">
          <div id="layer-2">
            <span id="layer-2-1"></span>
          </div>
        </div>
      </div>
    `;
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.innerHTML = '';
    _delegate.destroy();
  });

  it('can subscribe on element events', (done) => {
    let handler = jest.fn();
    let layer21 = container.querySelector('#layer-2-1');
    _delegate.on('click', layer21, null, handler);
    fireEvent('click', layer21);
    expect(handler).toHaveBeenCalled();
    done();
  });

  it('can subscribe on children elements events', (done) => {
    let handler = jest.fn();
    let layer1 = container.querySelector('#layer-1');
    let layer21 = container.querySelector('#layer-2-1');
    _delegate.on('click', layer1, '#layer-2-1', handler);
    fireEvent('click', layer21);
    expect(handler).toHaveBeenCalled();
    done();
  });

  it('can handle dynamically added content', (done) => {
    let handler = jest.fn();
    let layer1 = container.querySelector('#layer-1');
    layer1.innerHTML = `
      <div id="dynamic_content_element"></div>
    `;
    let dynamic_div = layer1.querySelector('#dynamic_content_element');
    _delegate.on('click', layer1, '#dynamic_content_element', handler);
    fireEvent('click', dynamic_div);
    expect(handler).toHaveBeenCalled();
    done();
  });

  it('applies handlers in correct order', () => {
    let handler = jest.fn();

    let layer1 = container.querySelector('#layer-1');
    let layer21 = container.querySelector('#layer-2-1');

    _delegate.on('click', layer1, '#layer-2-1', handler.bind(1));
    _delegate.on('click', layer21, null, handler.bind(2));
    _delegate.on('click', layer1, null, handler.bind(3));

    fireEvent('click', layer21);
    expect(handler).toHaveBeenCalledTimes(3);
    expect(handler.mock.instances).toEqual([1, 2, 3]);
  });

  it('passes correct arguments to event handler', (done) => {
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    let layer1 = container.querySelector('#layer-1');
    let layer21 = container.querySelector('#layer-2-1');
    _delegate.on('click', layer1, '#layer-2-1', handler1);
    _delegate.on('click', layer1, null, handler2);
    fireEvent('click', layer21);
    expect(handler1).toHaveBeenCalledWith(expect.anything(), layer21);
    expect(handler2).toHaveBeenCalledWith(expect.anything(), layer1);
    done();
  });

  describe('removing events', () => {
    it('can remove all events from subdelegate', (done) => {
      let handler1 = jest.fn();
      let handler2 = jest.fn();
      let handler3 = jest.fn();
      let handler4 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer1, '#layer-2-1', handler1);
      _delegate.on('click', layer1, null, handler2);
      _delegate.on('cluck', layer1, '#layer-2-1', handler3);
      _delegate.on('cluck', layer1, null, handler4);
      fireEvent('click', layer21);
      fireEvent('cluck', layer21);
      _delegate.off(null, layer1);
      fireEvent('click', layer21);
      fireEvent('cluck', layer21);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(1);
      expect(handler4).toHaveBeenCalledTimes(1);
      done();
    });

    it('can remove all events by type from subdelegate', (done) => {
      let handler1 = jest.fn();
      let handler2 = jest.fn();
      let handler3 = jest.fn();
      let handler4 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer1, '#layer-2-1', handler1);
      _delegate.on('click', layer1, null, handler2);
      _delegate.on('cluck', layer1, '#layer-2-1', handler3);
      _delegate.on('cluck', layer1, null, handler4);
      fireEvent('click', layer21);
      fireEvent('cluck', layer21);
      _delegate.off('click', layer1);
      fireEvent('click', layer21);
      fireEvent('cluck', layer21);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler3).toHaveBeenCalledTimes(2);
      expect(handler4).toHaveBeenCalledTimes(2);
      done();
    });

    it('can remove child events', (done) => {
      let handler1 = jest.fn();
      let handler2 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer1, '#layer-2-1', handler1);
      _delegate.on('click', layer1, null, handler2);
      fireEvent('click', layer21);
      _delegate.off('click', layer1, '#layer-2-1', handler1);
      fireEvent('click', layer21);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(2);
      done();
    });

    it('can remove self events', (done) => {
      let handler1 = jest.fn();
      let handler2 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer1, '#layer-2-1', handler1);
      _delegate.on('click', layer1, null, handler2);
      fireEvent('click', layer21);
      _delegate.off('click', layer1, null, handler2);
      fireEvent('click', layer21);
      expect(handler1).toHaveBeenCalledTimes(2);
      expect(handler2).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe('stop propagation', () => {
    it('stops propagation between two subdelegates', (done) => {
      let handler1 = jest.fn((event) => {
        event.stopPropagation();
      });
      let handler2 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer21, null, handler1);
      _delegate.on('click', layer1, null, handler2);
      fireEvent('click', layer21);
      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
      done();
    });

    it('stops propagation from children to subdelegate', (done) => {
      let handler1 = jest.fn((event) => {
        event.stopPropagation();
      });
      let handler2 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer1, '#layer-2-1', handler1);
      _delegate.on('click', layer1, null, handler2);
      fireEvent('click', layer21);
      expect(handler1).toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
      done();
    });

    it('still notifies listener on the same dom level when propagation stopped', (done) => {
      let handler1 = jest.fn((event) => {
        event.stopPropagation();
      });
      let handler2 = jest.fn();
      let handler3 = jest.fn();
      let layer1 = container.querySelector('#layer-1');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer21, null, handler1);
      _delegate.on('click', layer1, '#layer-2-1', handler2);
      _delegate.on('click', layer1, null, handler3);
      fireEvent('click', layer21);
      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
      expect(handler3).not.toHaveBeenCalled();
      done();
    });

    it('handles nested propagation stopping logic', (done) => {
      let handler1 = jest.fn();
      let handler2 = jest.fn((event) => { event.stopPropagation(); });
      let handler3 = jest.fn();
      let handler4 = jest.fn();
      let layer0 = container.querySelector('#layer-0');
      let layer1 = container.querySelector('#layer-1');
      let layer2 = container.querySelector('#layer-2');
      let layer21 = container.querySelector('#layer-2-1');
      _delegate.on('click', layer0, null, handler1);
      _delegate.on('click', layer0, '#layer-2', handler2);
      _delegate.on('click', layer1, '#layer-2-1', handler3);
      _delegate.on('click', layer1, null, handler4);
      fireEvent('click', layer21);
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalled();
      expect(handler4).not.toHaveBeenCalled();
      done();
    });
  });

});


describe('Setting a new root', () => {
  let container = document.createElement('div');
  let _delegate = new createDelegate(document.body);
  document.body.appendChild(container);
  container.innerHTML = `
    <div id="layer-0">
      <div id="layer-1">
        <div id="layer-2">
          <span id="layer-2-1"></span>
        </div>
      </div>
    </div>
  `;

  it('works correctly', (done) => {
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    let handler3 = jest.fn();
    let handler4 = jest.fn();
    let layer0 = container.querySelector('#layer-0');
    let layer1 = container.querySelector('#layer-1');
    let layer2 = container.querySelector('#layer-2');
    let layer21 = container.querySelector('#layer-2-1');
    _delegate.on('click', layer0, null, handler1);
    _delegate.on('click', layer0, '#layer-2', handler2);
    _delegate.on('click', layer1, '#layer-2-1', handler3);
    _delegate.on('click', layer1, null, handler4);
    fireEvent('click', layer21);
    _delegate.setRoot(layer1);
    fireEvent('click', layer21);
    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler3).toHaveBeenCalledTimes(2);
    expect(handler4).toHaveBeenCalledTimes(2);
    done();
  });
});
