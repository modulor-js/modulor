<a name="module_modulor"></a>

## modulor
Modulor library


* [modulor](#module_modulor)
    * _static_
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
    * _inner_
        * [~BaseComponent](#module_modulor..BaseComponent)
            * _DOM API_
                * [.$(selector)](#module_modulor..BaseComponent+$) ⇒ <code>Array</code>
                * [.attr(key, [value])](#module_modulor..BaseComponent+attr) ⇒ <code>String</code>
                * [.addClass(className)](#module_modulor..BaseComponent+addClass)
                * [.removeClass(className)](#module_modulor..BaseComponent+removeClass)
                * [.toggleClass(className)](#module_modulor..BaseComponent+toggleClass)
                * [.hasClass(className)](#module_modulor..BaseComponent+hasClass) ⇒ <code>Boolean</code>
                * [.html(htmlString, [$el])](#module_modulor..BaseComponent+html) ⇒ <code>Object</code>
            * _debug_
                * [.childComponents](#module_modulor..BaseComponent+childComponents) ⇒ <code>Array.&lt;BaseComponent&gt;</code>
                * [.parentComponent](#module_modulor..BaseComponent+parentComponent) ⇒ <code>BaseComponent</code>
                * [.toggleHighlight()](#module_modulor..BaseComponent+toggleHighlight)
                * [.toggleHighlightAll()](#module_modulor..BaseComponent+toggleHighlightAll)
            * _events_
                * [.on(eventName, [selector], callback)](#module_modulor..BaseComponent+on)
                * [.off([eventName], [selector], [callback])](#module_modulor..BaseComponent+off)
                * [.trigger(eventName, [eventData])](#module_modulor..BaseComponent+trigger)
            * _properties_
                * [.componentType](#module_modulor..BaseComponent+componentType)
                * [.proxyAttributes](#module_modulor..BaseComponent+proxyAttributes)
        * ~~[~BaseController](#module_modulor..BaseController) ⇐ <code>BaseComponent</code>~~
            * [.componentType](#module_modulor..BaseController+componentType)

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

<a name="module_modulor..BaseComponent"></a>

### modulor~BaseComponent
**Kind**: inner class of [<code>modulor</code>](#module_modulor)  

* [~BaseComponent](#module_modulor..BaseComponent)
    * _DOM API_
        * [.$(selector)](#module_modulor..BaseComponent+$) ⇒ <code>Array</code>
        * [.attr(key, [value])](#module_modulor..BaseComponent+attr) ⇒ <code>String</code>
        * [.addClass(className)](#module_modulor..BaseComponent+addClass)
        * [.removeClass(className)](#module_modulor..BaseComponent+removeClass)
        * [.toggleClass(className)](#module_modulor..BaseComponent+toggleClass)
        * [.hasClass(className)](#module_modulor..BaseComponent+hasClass) ⇒ <code>Boolean</code>
        * [.html(htmlString, [$el])](#module_modulor..BaseComponent+html) ⇒ <code>Object</code>
    * _debug_
        * [.childComponents](#module_modulor..BaseComponent+childComponents) ⇒ <code>Array.&lt;BaseComponent&gt;</code>
        * [.parentComponent](#module_modulor..BaseComponent+parentComponent) ⇒ <code>BaseComponent</code>
        * [.toggleHighlight()](#module_modulor..BaseComponent+toggleHighlight)
        * [.toggleHighlightAll()](#module_modulor..BaseComponent+toggleHighlightAll)
    * _events_
        * [.on(eventName, [selector], callback)](#module_modulor..BaseComponent+on)
        * [.off([eventName], [selector], [callback])](#module_modulor..BaseComponent+off)
        * [.trigger(eventName, [eventData])](#module_modulor..BaseComponent+trigger)
    * _properties_
        * [.componentType](#module_modulor..BaseComponent+componentType)
        * [.proxyAttributes](#module_modulor..BaseComponent+proxyAttributes)

<a name="module_modulor..BaseComponent+$"></a>

#### baseComponent.$(selector) ⇒ <code>Array</code>
Select nodes

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Returns**: <code>Array</code> - Collection of nodes  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | Selector |

<a name="module_modulor..BaseComponent+attr"></a>

#### baseComponent.attr(key, [value]) ⇒ <code>String</code>
Get/set element attribute

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Returns**: <code>String</code> - Attribute value  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Attribute name |
| [value] | <code>String</code> | Attribute value |

<a name="module_modulor..BaseComponent+addClass"></a>

#### baseComponent.addClass(className)
Add a class to the element

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="module_modulor..BaseComponent+removeClass"></a>

#### baseComponent.removeClass(className)
Remove a class from the element

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="module_modulor..BaseComponent+toggleClass"></a>

#### baseComponent.toggleClass(className)
Toggle a class at the element

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="module_modulor..BaseComponent+hasClass"></a>

#### baseComponent.hasClass(className) ⇒ <code>Boolean</code>
Check if the element has a class

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |

<a name="module_modulor..BaseComponent+html"></a>

#### baseComponent.html(htmlString, [$el]) ⇒ <code>Object</code>
Set the HTML content of element

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Returns**: <code>Object</code> - refs  
**Category**: DOM API  

| Param | Type | Description |
| --- | --- | --- |
| htmlString | <code>String</code> | HTML content string |
| [$el] | <code>HTMLElement</code> | Target element |

**Example**  
```js
// set content
this.html(`<div></div>`);
```
**Example**  
```js
// set content of another element
this.html(`<div></div>`, <HTMLElement>);
```
**Example**  
```js
// get refs
const refs = this.html(`
  <div id="some_id" ref="some_ref">
    <span refs="span_elements" id="span_1"></span>
    <span refs="span_elements" id="span_2"></span>
  </div>
`) //=> { some_ref: <HTMLElement#some_id>, span_elements: [<HTMLElement#span_1>, <HTMLElement#span_2>] }
```
**Example**  
```js
// await child elements (only when instance of modulor component)
const refs = this.html(`
  <child-component ref="$childComponent"></child-component>
  <div ref="$someDiv"></div>
`);
refs['$childComponent'].whenComponentConnected.then(($childComponent) => ...);
refs['$someDiv'].whenComponentConnected.then(...never resolves...);
```
<a name="module_modulor..BaseComponent+childComponents"></a>

#### baseComponent.childComponents ⇒ <code>Array.&lt;BaseComponent&gt;</code>
*Getter*.
 List of child components.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: debug  
<a name="module_modulor..BaseComponent+parentComponent"></a>

#### baseComponent.parentComponent ⇒ <code>BaseComponent</code>
*Getter*.
 Parent component.
 **Use only for debug purposes due to low efficiency**

**Kind**: instance property of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: debug  
<a name="module_modulor..BaseComponent+toggleHighlight"></a>

#### baseComponent.toggleHighlight()
Toggle debug class on component

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: debug  
<a name="module_modulor..BaseComponent+toggleHighlightAll"></a>

#### baseComponent.toggleHighlightAll()
Toggle debug class on component and child components

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: debug  
<a name="module_modulor..BaseComponent+on"></a>

#### baseComponent.on(eventName, [selector], callback)
Subscribe an event

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: events  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| [selector] | <code>String</code> | Selector |
| callback | <code>function</code> | Event name |

<a name="module_modulor..BaseComponent+off"></a>

#### baseComponent.off([eventName], [selector], [callback])
Unsubscribe an event
 Unsibscribe all events when called without arguments
 Unsibscribe all events by selector when called without *selector* argument

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: events  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [eventName] | <code>String</code> | <code></code> | Event name |
| [selector] | <code>String</code> |  | Selector |
| [callback] | <code>function</code> |  | Event name |

<a name="module_modulor..BaseComponent+trigger"></a>

#### baseComponent.trigger(eventName, [eventData])
Fires an event on element

**Kind**: instance method of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: events  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| [eventData] | <code>\*</code> | Data to attach to event |

<a name="module_modulor..BaseComponent+componentType"></a>

#### baseComponent.componentType
**Kind**: instance property of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: properties  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| componentType | <code>String</code> | <code>&quot;component&quot;</code> | Component type |

<a name="module_modulor..BaseComponent+proxyAttributes"></a>

#### baseComponent.proxyAttributes
**Kind**: instance property of [<code>BaseComponent</code>](#module_modulor..BaseComponent)  
**Category**: properties  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| proxyAttributes | <code>Object.&lt;String, function()&gt;</code> | <code>{}</code> | Proxy attributes to properties |

<a name="module_modulor..BaseController"></a>

### ~~modulor~BaseController ⇐ <code>BaseComponent</code>~~
***Deprecated***

**Kind**: inner class of [<code>modulor</code>](#module_modulor)  
**Extends**: <code>BaseComponent</code>  
<a name="module_modulor..BaseController+componentType"></a>

#### baseController.componentType
**Kind**: instance property of [<code>BaseController</code>](#module_modulor..BaseController)  
**Category**: properties  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| componentType | <code>String</code> | <code>&quot;controller&quot;</code> | Component type |

