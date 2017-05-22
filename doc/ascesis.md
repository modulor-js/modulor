## Modules

<dl>
<dt><a href="#module_ascesis">ascesis</a></dt>
<dd><p>Ascesis library</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#AscesisComponent">AscesisComponent</a></dt>
<dd></dd>
</dl>

<a name="module_ascesis"></a>

## ascesis
Ascesis library


* [ascesis](#module_ascesis)
    * ~~[.QueryableArray](#module_ascesis.QueryableArray) ⇐ <code>Array</code>~~
    * [.BaseController](#module_ascesis.BaseController)
    * [.BaseComponent](#module_ascesis.BaseComponent)
    * [.$(selector, [element])](#module_ascesis.$) ⇒ <code>Array</code>
    * [.attr(element, key, [value])](#module_ascesis.attr) ⇒ <code>String</code>
    * [.addClass(element, className)](#module_ascesis.addClass)
    * [.removeClass(element, className)](#module_ascesis.removeClass)
    * [.toggleClass(element, className)](#module_ascesis.toggleClass)
    * [.hasClass(element, className)](#module_ascesis.hasClass)
    * [.walkDOM(node, filter, skipNode)](#module_ascesis.walkDOM) ⇒ <code>Array</code>
    * [.toArray(nodes)](#module_ascesis.toArray) ⇒ <code>Array</code>
    * [.fireEvent(eventName, target, [eventData])](#module_ascesis.fireEvent)
    * [.html(htmlString, [target])](#module_ascesis.html) ⇒ <code>HTMLElement</code> \| <code>DocumentFragment</code>
    * [.extend(baseClass)](#module_ascesis.extend) ⇒ [<code>AscesisComponent</code>](#AscesisComponent)

<a name="module_ascesis.QueryableArray"></a>

### ~~ascesis.QueryableArray ⇐ <code>Array</code>~~
***Deprecated***

QueryableArray Extends array with querySelector(All) methods

**Kind**: static class of [<code>ascesis</code>](#module_ascesis)  
**Extends**: <code>Array</code>  
<a name="module_ascesis.BaseController"></a>

### ascesis.BaseController
BaseController Base controller

**Kind**: static class of [<code>ascesis</code>](#module_ascesis)  
<a name="module_ascesis.BaseComponent"></a>

### ascesis.BaseComponent
BaseComponent Base component

**Kind**: static class of [<code>ascesis</code>](#module_ascesis)  
<a name="module_ascesis.$"></a>

### ascesis.$(selector, [element]) ⇒ <code>Array</code>
Select nodes

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: <code>Array</code> - Collection of nodes  
**Params**

- selector <code>String</code> - Selector
- [element] <code>HTMLElement</code> <code> = window.document</code> - Element

<a name="module_ascesis.attr"></a>

### ascesis.attr(element, key, [value]) ⇒ <code>String</code>
Get/set element attribute

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: <code>String</code> - Attribute value  
**Params**

- element <code>HTMLElement</code> - Element
- key <code>String</code> - Attribute name
- [value] <code>String</code> - Attribute value

<a name="module_ascesis.addClass"></a>

### ascesis.addClass(element, className)
Add a class to the element

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Params**

- element <code>HTMLElement</code> - Element
- className <code>String</code> - Class name

<a name="module_ascesis.removeClass"></a>

### ascesis.removeClass(element, className)
Remove a class from the element

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Params**

- element <code>HTMLElement</code> - Element
- className <code>String</code> - Class name

<a name="module_ascesis.toggleClass"></a>

### ascesis.toggleClass(element, className)
Toggle a class at the element

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Params**

- element <code>HTMLElement</code> - Element
- className <code>String</code> - Class name

<a name="module_ascesis.hasClass"></a>

### ascesis.hasClass(element, className)
Check if the element has a class

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Params**

- element <code>HTMLElement</code> - Element
- className <code>String</code> - Class name

<a name="module_ascesis.walkDOM"></a>

### ascesis.walkDOM(node, filter, skipNode) ⇒ <code>Array</code>
Traverse DOM node

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: <code>Array</code> - Collection of nodes  
**Params**

- node <code>HTMLElement</code> - Element
- filter <code>function</code> - Filter child nodes function
- skipNode <code>function</code> - Skip child nodes function

<a name="module_ascesis.toArray"></a>

### ascesis.toArray(nodes) ⇒ <code>Array</code>
Converts NodeList to array

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: <code>Array</code> - Collection of nodes  
**Params**

- nodes <code>NodeList</code> - Elements collection

<a name="module_ascesis.fireEvent"></a>

### ascesis.fireEvent(eventName, target, [eventData])
Fires an event on element

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Params**

- eventName <code>String</code> - Event name
- target <code>HTMLElement</code> - Element to trigger event on
- [eventData] <code>\*</code> - Data to attach to event

<a name="module_ascesis.html"></a>

### ascesis.html(htmlString, [target]) ⇒ <code>HTMLElement</code> \| <code>DocumentFragment</code>
Set the HTML content of element, or generate DocumentFragment

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: <code>HTMLElement</code> \| <code>DocumentFragment</code> - Target if target parameter is set or document fragment  
**Params**

- htmlString <code>String</code> - HTML content string
- [target] <code>HTMLElement</code> - Element to set content

<a name="module_ascesis.extend"></a>

### ascesis.extend(baseClass) ⇒ [<code>AscesisComponent</code>](#AscesisComponent)
Extend component class with ascesis methods

**Kind**: static method of [<code>ascesis</code>](#module_ascesis)  
**Returns**: [<code>AscesisComponent</code>](#AscesisComponent) - Extended component class  
**Params**

- baseClass <code>Class</code> - Component class

<a name="AscesisComponent"></a>

## AscesisComponent
**Kind**: global class  

* [AscesisComponent](#AscesisComponent)
    * _DOM API_
        * [.$(selector)](#AscesisComponent+$) ⇒ <code>Array</code>
        * [.attr(key, [value])](#AscesisComponent+attr) ⇒ <code>String</code>
        * [.addClass(className)](#AscesisComponent+addClass)
        * [.removeClass(className)](#AscesisComponent+removeClass)
        * [.toggleClass(className)](#AscesisComponent+toggleClass)
        * [.hasClass(className)](#AscesisComponent+hasClass)
        * [.html(htmlString, [$el])](#AscesisComponent+html) ⇒ <code>HTMLElement</code>
    * _debug_
        * [.childComponents](#AscesisComponent+childComponents) : [<code>Array.&lt;AscesisComponent&gt;</code>](#AscesisComponent)
        * [.parentComponent](#AscesisComponent+parentComponent) : [<code>AscesisComponent</code>](#AscesisComponent)
        * [.toggleHighlight()](#AscesisComponent+toggleHighlight)
        * [.toggleHighlightAll()](#AscesisComponent+toggleHighlightAll)
    * _events_
        * [.on(eventName, [selector], callback)](#AscesisComponent+on)
        * [.off([eventName], [selector], [callback])](#AscesisComponent+off)
        * [.trigger(eventName, [eventData])](#AscesisComponent+trigger)

<a name="AscesisComponent+$"></a>

### ascesisComponent.$(selector) ⇒ <code>Array</code>
Select nodes

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Returns**: <code>Array</code> - Collection of nodes  
**Category**: DOM API  
**Params**

- selector <code>String</code> - Selector

<a name="AscesisComponent+attr"></a>

### ascesisComponent.attr(key, [value]) ⇒ <code>String</code>
Get/set element attribute

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Returns**: <code>String</code> - Attribute value  
**Category**: DOM API  
**Params**

- key <code>String</code> - Attribute name
- [value] <code>String</code> - Attribute value

<a name="AscesisComponent+addClass"></a>

### ascesisComponent.addClass(className)
Add a class to the element

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: DOM API  
**Params**

- className <code>String</code> - Class name

<a name="AscesisComponent+removeClass"></a>

### ascesisComponent.removeClass(className)
Remove a class from the element

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: DOM API  
**Params**

- className <code>String</code> - Class name

<a name="AscesisComponent+toggleClass"></a>

### ascesisComponent.toggleClass(className)
Toggle a class at the element

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: DOM API  
**Params**

- className <code>String</code> - Class name

<a name="AscesisComponent+hasClass"></a>

### ascesisComponent.hasClass(className)
Check if the element has a class

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: DOM API  
**Params**

- className <code>String</code> - Class name

<a name="AscesisComponent+html"></a>

### ascesisComponent.html(htmlString, [$el]) ⇒ <code>HTMLElement</code>
Set the HTML content of element

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Returns**: <code>HTMLElement</code> - Target if target parameter is set or document fragment  
**Category**: DOM API  
**Params**

- htmlString <code>String</code> - HTML content string
- [$el] <code>HTMLElement</code> - Target element

<a name="AscesisComponent+childComponents"></a>

### ascesisComponent.childComponents : [<code>Array.&lt;AscesisComponent&gt;</code>](#AscesisComponent)
*Getter*.
 List of child components.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: debug  
<a name="AscesisComponent+parentComponent"></a>

### ascesisComponent.parentComponent : [<code>AscesisComponent</code>](#AscesisComponent)
*Getter*.
 Parent component.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: debug  
<a name="AscesisComponent+toggleHighlight"></a>

### ascesisComponent.toggleHighlight()
Toggle debug class on component

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: debug  
<a name="AscesisComponent+toggleHighlightAll"></a>

### ascesisComponent.toggleHighlightAll()
Toggle debug class on component and child components

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: debug  
<a name="AscesisComponent+on"></a>

### ascesisComponent.on(eventName, [selector], callback)
Subscribe an event

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: events  
**Params**

- eventName <code>String</code> - Event name
- [selector] <code>String</code> - Selector
- callback <code>function</code> - Event name

<a name="AscesisComponent+off"></a>

### ascesisComponent.off([eventName], [selector], [callback])
Unsubscribe an event
 Unsibscribe all events when called without arguments
 Unsibscribe all events by selector when called without *selector* argument

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: events  
**Params**

- [eventName] <code>String</code> <code> = </code> - Event name
- [selector] <code>String</code> - Selector
- [callback] <code>function</code> - Event name

<a name="AscesisComponent+trigger"></a>

### ascesisComponent.trigger(eventName, [eventData])
Fires an event on element

**Kind**: instance method of [<code>AscesisComponent</code>](#AscesisComponent)  
**Category**: events  
**Params**

- eventName <code>String</code> - Event name
- [eventData] <code>\*</code> - Data to attach to event

