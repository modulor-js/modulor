## Functions

<dl>
<dt><a href="#toArray">toArray(nodes)</a> ⇒ <code>Array</code></dt>
<dd><p>Converts NodeList to array</p>
</dd>
<dt><a href="#$">$(Element, [selector])</a> ⇒ <code>function</code> | <code>Array</code></dt>
<dd><p>Select nodes</p>
</dd>
<dt><a href="#attr">attr(key, [value], [element])</a> ⇒ <code>function</code> | <code>String</code> | <code>HTMLElement</code></dt>
<dd><p>Get/set element attribute</p>
</dd>
<dt><a href="#addClass">addClass(className, [element])</a> ⇒ <code>function</code> | <code>HTMLElement</code></dt>
<dd><p>Add a class to the element</p>
</dd>
<dt><a href="#removeClass">removeClass(className, [element])</a> ⇒ <code>function</code> | <code>HTMLElement</code></dt>
<dd><p>Remove a class from the element</p>
</dd>
<dt><a href="#toggleClass">toggleClass(className, [element])</a> ⇒ <code>function</code> | <code>HTMLElement</code></dt>
<dd><p>Toggle a class at the element</p>
</dd>
<dt><a href="#hasClass">hasClass(className, element)</a> ⇒ <code>function</code> | <code>Boolean</code></dt>
<dd><p>Check if the element has a class</p>
</dd>
<dt><a href="#append">append(parent, [element])</a> ⇒ <code>HTMLElement</code> | <code>function</code></dt>
<dd><p>appends one HTML Element to another HTML Element</p>
</dd>
<dt><a href="#prepend">prepend(parent, [element])</a> ⇒ <code>HTMLElement</code> | <code>function</code></dt>
<dd><p>prepends one HTML Element to another HTML Element</p>
</dd>
<dt><a href="#walkDOM">walkDOM(node, filter, skipNode)</a> ⇒ <code>Array</code></dt>
<dd><p>Traverse DOM node</p>
</dd>
<dt><a href="#fireEvent">fireEvent(eventName, target, [eventData])</a></dt>
<dd><p>Fires an event on element</p>
</dd>
<dt><a href="#html">html(target, [content])</a> ⇒ <code>Array</code> | <code>function</code></dt>
<dd><p>Set the HTML content of element, or generate DocumentFragment</p>
</dd>
<dt><a href="#isNode">isNode(element)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if element is HTMLElement or DocumentFragment</p>
</dd>
<dt><a href="#empty">empty(element)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Empty element</p>
</dd>
<dt><a href="#getRefs">getRefs(element)</a> ⇒ <code>Object</code></dt>
<dd><p>Find refs</p>
</dd>
<dt><a href="#createElement">createElement(name, [attributes], [content])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>creates HTML Element</p>
</dd>
</dl>

<a name="toArray"></a>

## toArray(nodes) ⇒ <code>Array</code>
Converts NodeList to array

**Kind**: global function  
**Returns**: <code>Array</code> - Collection of nodes  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>NodeList</code> | Elements collection |

<a name="$"></a>

## $(Element, [selector]) ⇒ <code>function</code> \| <code>Array</code>
Select nodes

**Kind**: global function  
**Returns**: <code>function</code> \| <code>Array</code> - Curried function (if selector is not provided) or collection of nodes  

| Param | Type | Description |
| --- | --- | --- |
| Element | <code>HTMLElement</code> |  |
| [selector] | <code>String</code> | Selector |

<a name="attr"></a>

## attr(key, [value], [element]) ⇒ <code>function</code> \| <code>String</code> \| <code>HTMLElement</code>
Get/set element attribute

**Kind**: global function  
**Returns**: <code>function</code> \| <code>String</code> \| <code>HTMLElement</code> - Curried function (if element is not provided) or attribute value  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Attribute name |
| [value] | <code>String</code> | Attribute value |
| [element] | <code>HTMLElement</code> | Element |

<a name="addClass"></a>

## addClass(className, [element]) ⇒ <code>function</code> \| <code>HTMLElement</code>
Add a class to the element

**Kind**: global function  
**Returns**: <code>function</code> \| <code>HTMLElement</code> - Curried function (if element is not provided) or element  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |
| [element] | <code>HTMLElement</code> | Element |

<a name="removeClass"></a>

## removeClass(className, [element]) ⇒ <code>function</code> \| <code>HTMLElement</code>
Remove a class from the element

**Kind**: global function  
**Returns**: <code>function</code> \| <code>HTMLElement</code> - Curried function (if element is not provided) or element  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |
| [element] | <code>HTMLElement</code> | Element |

<a name="toggleClass"></a>

## toggleClass(className, [element]) ⇒ <code>function</code> \| <code>HTMLElement</code>
Toggle a class at the element

**Kind**: global function  
**Returns**: <code>function</code> \| <code>HTMLElement</code> - Curried function (if element is not provided) or element  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |
| [element] | <code>HTMLElement</code> | Element |

<a name="hasClass"></a>

## hasClass(className, element) ⇒ <code>function</code> \| <code>Boolean</code>
Check if the element has a class

**Kind**: global function  
**Returns**: <code>function</code> \| <code>Boolean</code> - Curried function (if element is not provided) or boolean  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | Class name |
| element | <code>HTMLElement</code> | Element |

<a name="append"></a>

## append(parent, [element]) ⇒ <code>HTMLElement</code> \| <code>function</code>
appends one HTML Element to another HTML Element

**Kind**: global function  
**Returns**: <code>HTMLElement</code> \| <code>function</code> - parent  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>HTMLElement</code> | element to attach to |
| [element] | <code>HTMLElement</code> | new node |

<a name="prepend"></a>

## prepend(parent, [element]) ⇒ <code>HTMLElement</code> \| <code>function</code>
prepends one HTML Element to another HTML Element

**Kind**: global function  
**Returns**: <code>HTMLElement</code> \| <code>function</code> - parent  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>HTMLElement</code> | element to attach to |
| [element] | <code>HTMLElement</code> | new node |

<a name="walkDOM"></a>

## walkDOM(node, filter, skipNode) ⇒ <code>Array</code>
Traverse DOM node

**Kind**: global function  
**Returns**: <code>Array</code> - Collection of nodes  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>HTMLElement</code> | Element |
| filter | <code>function</code> | Filter child nodes function |
| skipNode | <code>function</code> | Skip child nodes function |

<a name="fireEvent"></a>

## fireEvent(eventName, target, [eventData])
Fires an event on element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | Event name |
| target | <code>HTMLElement</code> | Element to trigger event on |
| [eventData] | <code>\*</code> | Data to attach to event |

<a name="html"></a>

## html(target, [content]) ⇒ <code>Array</code> \| <code>function</code>
Set the HTML content of element, or generate DocumentFragment

**Kind**: global function  
**Returns**: <code>Array</code> \| <code>function</code> - tuple [target || DocumentFragment, refs object] or render function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>HTMLElement</code> \| <code>String</code> | Element to set content or html string |
| [content] | <code>String</code> \| <code>HTMLElement</code> \| <code>DocumentFragment</code> | HTML content string |

<a name="isNode"></a>

## isNode(element) ⇒ <code>Boolean</code>
Check if element is HTMLElement or DocumentFragment

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element to check |

<a name="empty"></a>

## empty(element) ⇒ <code>HTMLElement</code>
Empty element

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - element  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element to empty |

<a name="getRefs"></a>

## getRefs(element) ⇒ <code>Object</code>
Find refs

**Kind**: global function  
**Returns**: <code>Object</code> - refs object  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Element to find refs on |

<a name="createElement"></a>

## createElement(name, [attributes], [content]) ⇒ <code>HTMLElement</code>
creates HTML Element

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - created element  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | tag name |
| [attributes] | <code>Object</code> | element attributes |
| [content] | <code>String</code> | element content |

