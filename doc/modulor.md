## Modules

<dl>
<dt><a href="#module_modulor">modulor</a></dt>
<dd><p>Modulor library</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ModulorComponent">ModulorComponent</a></dt>
<dd></dd>
</dl>

<a name="module_modulor"></a>

## modulor
Modulor library


* [modulor](#module_modulor)
    * [.BaseController](#module_modulor.BaseController)
    * [.BaseComponent](#module_modulor.BaseComponent)
    * [.$](#module_modulor.$) ⇒ <code>Array</code>
    * [.toArray](#module_modulor.toArray) ⇒ <code>Array</code>
    * [.attr](#module_modulor.attr) ⇒ <code>String</code>
    * [.html](#module_modulor.html) ⇒ <code>HTMLElement</code> \| <code>DocumentFragment</code>
    * [.addClass](#module_modulor.addClass)
    * [.removeClass](#module_modulor.removeClass)
    * [.toggleClass](#module_modulor.toggleClass)
    * [.hasClass](#module_modulor.hasClass)
    * [.fireEvent](#module_modulor.fireEvent)
    * [.walkDOM](#module_modulor.walkDOM) ⇒ <code>Array</code>
    * [.extend(baseClass)](#module_modulor.extend) ⇒ [<code>ModulorComponent</code>](#ModulorComponent)

<a name="module_modulor.BaseController"></a>

### modulor.BaseController
BaseController Base controller

**Kind**: static class of [<code>modulor</code>](#module_modulor)  
<a name="module_modulor.BaseComponent"></a>

### modulor.BaseComponent
BaseComponent Base component

**Kind**: static class of [<code>modulor</code>](#module_modulor)  
<a name="module_modulor.$"></a>

### modulor.$ ⇒ <code>Array</code>
Select nodes

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  
**Returns**: <code>Array</code> - Collection of nodes  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | Selector |
| [element] | <code>HTMLElement</code> | <code>window.document</code> | Element |

<a name="module_modulor.toArray"></a>

### modulor.toArray ⇒ <code>Array</code>
Converts NodeList to array

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  
**Returns**: <code>Array</code> - Collection of nodes  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>NodeList</code> | Elements collection |

<a name="module_modulor.attr"></a>

### modulor.attr ⇒ <code>String</code>
Get/set element attribute

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  
**Returns**: <code>String</code> - Attribute value  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element |
| key | <code>String</code> | Attribute name |
| [value] | <code>String</code> | Attribute value |

<a name="module_modulor.html"></a>

### modulor.html ⇒ <code>HTMLElement</code> \| <code>DocumentFragment</code>
Set the HTML content of element, or generate DocumentFragment

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  
**Returns**: <code>HTMLElement</code> \| <code>DocumentFragment</code> - Target if target parameter is set or document fragment  

| Param | Type | Description |
| --- | --- | --- |
| htmlString | <code>String</code> | HTML content string |
| [target] | <code>HTMLElement</code> | Element to set content |

<a name="module_modulor.addClass"></a>

### modulor.addClass
Add a class to the element

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element |
| className | <code>String</code> | Class name |

<a name="module_modulor.removeClass"></a>

### modulor.removeClass
Remove a class from the element

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element |
| className | <code>String</code> | Class name |

<a name="module_modulor.toggleClass"></a>

### modulor.toggleClass
Toggle a class at the element

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element |
| className | <code>String</code> | Class name |

<a name="module_modulor.hasClass"></a>

### modulor.hasClass
Check if the element has a class

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element |
| className | <code>String</code> | Class name |

<a name="module_modulor.fireEvent"></a>

### modulor.fireEvent
Fires an event on element

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| target | <code>HTMLElement</code> | Element to trigger event on |
| [eventData] | <code>\*</code> | Data to attach to event |

<a name="module_modulor.walkDOM"></a>

### modulor.walkDOM ⇒ <code>Array</code>
Traverse DOM node

**Kind**: static constant of [<code>modulor</code>](#module_modulor)  
**Returns**: <code>Array</code> - Collection of nodes  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>HTMLElement</code> | Element |
| filter | <code>function</code> | Filter child nodes function |
| skipNode | <code>function</code> | Skip child nodes function |

<a name="module_modulor.extend"></a>

### modulor.extend(baseClass) ⇒ [<code>ModulorComponent</code>](#ModulorComponent)
Extend component class with modulor methods

**Kind**: static method of [<code>modulor</code>](#module_modulor)  
**Returns**: [<code>ModulorComponent</code>](#ModulorComponent) - Extended component class  

| Param | Type | Description |
| --- | --- | --- |
| baseClass | <code>Class</code> | Component class |

<a name="ModulorComponent"></a>

## ModulorComponent
**Kind**: global class  

* [ModulorComponent](#ModulorComponent)
    * _DOM API_
        * [.$(selector)](#ModulorComponent+$) ⇒ <code>Array</code>
        * [.attr(key, [value])](#ModulorComponent+attr) ⇒ <code>String</code>
        * [.addClass(className)](#ModulorComponent+addClass)
        * [.removeClass(className)](#ModulorComponent+removeClass)
        * [.toggleClass(className)](#ModulorComponent+toggleClass)
        * [.hasClass(className)](#ModulorComponent+hasClass)
        * [.html(htmlString, [$el])](#ModulorComponent+html) ⇒ <code>HTMLElement</code>
    * _debug_
        * [.childComponents](#ModulorComponent+childComponents) : [<code>Array.&lt;ModulorComponent&gt;</code>](#ModulorComponent)
        * [.parentComponent](#ModulorComponent+parentComponent) : [<code>ModulorComponent</code>](#ModulorComponent)
        * [.toggleHighlight()](#ModulorComponent+toggleHighlight)
        * [.toggleHighlightAll()](#ModulorComponent+toggleHighlightAll)
    * _events_
        * [.on(eventName, [selector], callback)](#ModulorComponent+on)
        * [.off([eventName], [selector], [callback])](#ModulorComponent+off)
        * [.trigger(eventName, [eventData])](#ModulorComponent+trigger)

<a name="ModulorComponent+$"></a>

### modulorComponent.$(selector) ⇒ <code>Array</code>
Select nodes

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Returns**: <code>Array</code> - Collection of nodes  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | Selector |

<a name="ModulorComponent+attr"></a>

### modulorComponent.attr(key, [value]) ⇒ <code>String</code>
Get/set element attribute

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Returns**: <code>String</code> - Attribute value  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Attribute name |
| [value] | <code>String</code> | Attribute value |

<a name="ModulorComponent+addClass"></a>

### modulorComponent.addClass(className)
Add a class to the element

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="ModulorComponent+removeClass"></a>

### modulorComponent.removeClass(className)
Remove a class from the element

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="ModulorComponent+toggleClass"></a>

### modulorComponent.toggleClass(className)
Toggle a class at the element

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="ModulorComponent+hasClass"></a>

### modulorComponent.hasClass(className)
Check if the element has a class

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="ModulorComponent+html"></a>

### modulorComponent.html(htmlString, [$el]) ⇒ <code>HTMLElement</code>
Set the HTML content of element

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Returns**: <code>HTMLElement</code> - Target if target parameter is set or document fragment  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| htmlString | <code>String</code> | HTML content string |
| [$el] | <code>HTMLElement</code> | Target element |

<a name="ModulorComponent+childComponents"></a>

### modulorComponent.childComponents : [<code>Array.&lt;ModulorComponent&gt;</code>](#ModulorComponent)
*Getter*.
 List of child components.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: debug  
<a name="ModulorComponent+parentComponent"></a>

### modulorComponent.parentComponent : [<code>ModulorComponent</code>](#ModulorComponent)
*Getter*.
 Parent component.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: debug  
<a name="ModulorComponent+toggleHighlight"></a>

### modulorComponent.toggleHighlight()
Toggle debug class on component

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: debug  
<a name="ModulorComponent+toggleHighlightAll"></a>

### modulorComponent.toggleHighlightAll()
Toggle debug class on component and child components

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: debug  
<a name="ModulorComponent+on"></a>

### modulorComponent.on(eventName, [selector], callback)
Subscribe an event

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: events  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| [selector] | <code>String</code> | Selector |
| callback | <code>function</code> | Event name |

<a name="ModulorComponent+off"></a>

### modulorComponent.off([eventName], [selector], [callback])
Unsubscribe an event
 Unsibscribe all events when called without arguments
 Unsibscribe all events by selector when called without *selector* argument

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: events  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eventName] | <code>String</code> | <code></code> | Event name |
| [selector] | <code>String</code> |  | Selector |
| [callback] | <code>function</code> |  | Event name |

<a name="ModulorComponent+trigger"></a>

### modulorComponent.trigger(eventName, [eventData])
Fires an event on element

**Kind**: instance method of [<code>ModulorComponent</code>](#ModulorComponent)  
**Category**: events  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| [eventData] | <code>\*</code> | Data to attach to event |

