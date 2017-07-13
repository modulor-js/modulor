## Modules

<dl>
<dt><a href="#module_delegate">delegate</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
</dl>

<a name="module_delegate"></a>

## delegate

* [delegate](#module_delegate)
    * [.createDelegate](#module_delegate.createDelegate) ⇒ [<code>Delegate</code>](#Delegate)
    * [.delegate](#module_delegate.delegate) : [<code>Delegate</code>](#Delegate)

<a name="module_delegate.createDelegate"></a>

### delegate.createDelegate ⇒ [<code>Delegate</code>](#Delegate)
**Kind**: static constant of [<code>delegate</code>](#module_delegate)  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>HTMLElement</code> | Delegate root |

<a name="module_delegate.delegate"></a>

### delegate.delegate : [<code>Delegate</code>](#Delegate)
Delegate instance with root of window.document

**Kind**: static constant of [<code>delegate</code>](#module_delegate)  
<a name="Delegate"></a>

## Delegate
**Kind**: global class  

* [Delegate](#Delegate)
    * [.on(eventName, element, selector, callback)](#Delegate+on)
    * [.off([eventName], [element], [selector], [callback])](#Delegate+off)
    * [.setRoot(newRoot)](#Delegate+setRoot)
    * [.destroy()](#Delegate+destroy)

<a name="Delegate+on"></a>

### delegate.on(eventName, element, selector, callback)
Subscribe an event

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| element | <code>HTMLElement</code> | Delegate node |
| selector | <code>String</code> \| <code>Null</code> | Selector |
| callback | <code>function</code> | Callback |

<a name="Delegate+off"></a>

### delegate.off([eventName], [element], [selector], [callback])
Unsubscribe an event

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  

| Param | Type | Description |
| --- | --- | --- |
| [eventName] | <code>String</code> | Event name |
| [element] | <code>HTMLElement</code> | Delegate node |
| [selector] | <code>String</code> \| <code>Null</code> | Selector |
| [callback] | <code>function</code> | Callback |

<a name="Delegate+setRoot"></a>

### delegate.setRoot(newRoot)
Set delegate root

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  

| Param | Type | Description |
| --- | --- | --- |
| newRoot | <code>HTMLElement</code> | Delegate root |

<a name="Delegate+destroy"></a>

### delegate.destroy()
Destroy delegate

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
