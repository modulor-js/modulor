<a name="module_router"></a>

## router
Ascesis router


* [router](#module_router)
    * [~Route](#module_router..Route)
        * [.getRouter()](#module_router..Route+getRouter)
        * [.getPath()](#module_router..Route+getPath) ⇒ <code>String</code>
        * [.getParams()](#module_router..Route+getParams) ⇒ <code>Object</code>
        * [.routeMatches()](#module_router..Route+routeMatches) ⇒ <code>Boolean</code>
        * [.getGlobalPath()](#module_router..Route+getGlobalPath) ⇒ <code>String</code>
        * [.resolve()](#module_router..Route+resolve)
    * [~Router](#module_router..Router)
        * [.handleRouteChange()](#module_router..Router+handleRouteChange)
        * [.isRouter($el)](#module_router..Router+isRouter) ⇒ <code>Boolean</code>
        * [.getChildRouters()](#module_router..Router+getChildRouters) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
        * [.resolve()](#module_router..Router+resolve)
        * [.getRootRouter()](#module_router..Router+getRootRouter) ⇒ <code>HTMLElement</code>
        * [.getRoot()](#module_router..Router+getRoot) ⇒ <code>String</code>
        * [.getQs()](#module_router..Router+getQs) ⇒ <code>String</code>
        * [.getParams()](#module_router..Router+getParams) ⇒ <code>Object</code>
        * [.setParams(queryParams, navigationParams)](#module_router..Router+setParams)
        * [.updateParams(queryParams, navigationParams)](#module_router..Router+updateParams)
        * [.useHash()](#module_router..Router+useHash) ⇒ <code>Boolean</code>
        * [.getGlobalPath()](#module_router..Router+getGlobalPath) ⇒ <code>String</code>
        * [.getPath()](#module_router..Router+getPath) ⇒ <code>String</code>
        * [.rootMatches()](#module_router..Router+rootMatches) ⇒ <code>Boolean</code>
        * [.add(path, callback)](#module_router..Router+add)
        * [.navigate(path, params)](#module_router..Router+navigate)
        * [.getRoutes()](#module_router..Router+getRoutes) ⇒ <code>Array.&lt;Route&gt;</code>
        * [.mount(path, router)](#module_router..Router+mount)
        * [.unmount(router)](#module_router..Router+unmount)
        * [.destroy()](#module_router..Router+destroy)
    * [~NavigationParams](#module_router..NavigationParams) : <code>Object</code>

<a name="module_router..Route"></a>

### router~Route
**Kind**: inner class of [<code>router</code>](#module_router)  

* [~Route](#module_router..Route)
    * [.getRouter()](#module_router..Route+getRouter)
    * [.getPath()](#module_router..Route+getPath) ⇒ <code>String</code>
    * [.getParams()](#module_router..Route+getParams) ⇒ <code>Object</code>
    * [.routeMatches()](#module_router..Route+routeMatches) ⇒ <code>Boolean</code>
    * [.getGlobalPath()](#module_router..Route+getGlobalPath) ⇒ <code>String</code>
    * [.resolve()](#module_router..Route+resolve)

<a name="module_router..Route+getRouter"></a>

#### route.getRouter()
Get router instance

**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
<a name="module_router..Route+getPath"></a>

#### route.getPath() ⇒ <code>String</code>
**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
**Returns**: <code>String</code> - Relative path (global path without router base)  
<a name="module_router..Route+getParams"></a>

#### route.getParams() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
**Returns**: <code>Object</code> - URL query parameters  
<a name="module_router..Route+routeMatches"></a>

#### route.routeMatches() ⇒ <code>Boolean</code>
Indicates if route matches path

**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
<a name="module_router..Route+getGlobalPath"></a>

#### route.getGlobalPath() ⇒ <code>String</code>
**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
**Returns**: <code>String</code> - Global path  
<a name="module_router..Route+resolve"></a>

#### route.resolve()
Resolves route

**Kind**: instance method of [<code>Route</code>](#module_router..Route)  
<a name="module_router..Router"></a>

### router~Router
**Kind**: inner class of [<code>router</code>](#module_router)  

* [~Router](#module_router..Router)
    * [.handleRouteChange()](#module_router..Router+handleRouteChange)
    * [.isRouter($el)](#module_router..Router+isRouter) ⇒ <code>Boolean</code>
    * [.getChildRouters()](#module_router..Router+getChildRouters) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
    * [.resolve()](#module_router..Router+resolve)
    * [.getRootRouter()](#module_router..Router+getRootRouter) ⇒ <code>HTMLElement</code>
    * [.getRoot()](#module_router..Router+getRoot) ⇒ <code>String</code>
    * [.getQs()](#module_router..Router+getQs) ⇒ <code>String</code>
    * [.getParams()](#module_router..Router+getParams) ⇒ <code>Object</code>
    * [.setParams(queryParams, navigationParams)](#module_router..Router+setParams)
    * [.updateParams(queryParams, navigationParams)](#module_router..Router+updateParams)
    * [.useHash()](#module_router..Router+useHash) ⇒ <code>Boolean</code>
    * [.getGlobalPath()](#module_router..Router+getGlobalPath) ⇒ <code>String</code>
    * [.getPath()](#module_router..Router+getPath) ⇒ <code>String</code>
    * [.rootMatches()](#module_router..Router+rootMatches) ⇒ <code>Boolean</code>
    * [.add(path, callback)](#module_router..Router+add)
    * [.navigate(path, params)](#module_router..Router+navigate)
    * [.getRoutes()](#module_router..Router+getRoutes) ⇒ <code>Array.&lt;Route&gt;</code>
    * [.mount(path, router)](#module_router..Router+mount)
    * [.unmount(router)](#module_router..Router+unmount)
    * [.destroy()](#module_router..Router+destroy)

<a name="module_router..Router+handleRouteChange"></a>

#### router.handleRouteChange()
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..Router+isRouter"></a>

#### router.isRouter($el) ⇒ <code>Boolean</code>
Indicates if element is router node

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type |
| --- | --- |
| $el | <code>HTMLElement</code> | 

<a name="module_router..Router+getChildRouters"></a>

#### router.getChildRouters() ⇒ <code>Array.&lt;HTMLElement&gt;</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>Array.&lt;HTMLElement&gt;</code> - Child router nodes  
<a name="module_router..Router+resolve"></a>

#### router.resolve()
Resolves router

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..Router+getRootRouter"></a>

#### router.getRootRouter() ⇒ <code>HTMLElement</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>HTMLElement</code> - Root router  
<a name="module_router..Router+getRoot"></a>

#### router.getRoot() ⇒ <code>String</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>String</code> - Path base  
<a name="module_router..Router+getQs"></a>

#### router.getQs() ⇒ <code>String</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>String</code> - URL query string  
<a name="module_router..Router+getParams"></a>

#### router.getParams() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>Object</code> - URL query parameters  
<a name="module_router..Router+setParams"></a>

#### router.setParams(queryParams, navigationParams)
Set new query parameters. Leave only provided parameters in query string

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| queryParams | <code>Object</code> | URL query parameters |
| navigationParams | <code>NavigationParams</code> | Navigation params |

<a name="module_router..Router+updateParams"></a>

#### router.updateParams(queryParams, navigationParams)
Update query parameters. Overwrite if param exists, add if not

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| queryParams | <code>Object</code> | URL query parameters |
| navigationParams | <code>NavigationParams</code> | Navigation params |

<a name="module_router..Router+useHash"></a>

#### router.useHash() ⇒ <code>Boolean</code>
Indicates if router uses hashbang

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..Router+getGlobalPath"></a>

#### router.getGlobalPath() ⇒ <code>String</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>String</code> - Global path  
<a name="module_router..Router+getPath"></a>

#### router.getPath() ⇒ <code>String</code>
**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
**Returns**: <code>String</code> - Relative path (global path without router base)  
<a name="module_router..Router+rootMatches"></a>

#### router.rootMatches() ⇒ <code>Boolean</code>
Indicates if router base matches current path

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..Router+add"></a>

#### router.add(path, callback)
Add route

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path |
| callback | <code>function</code> | Callback |

<a name="module_router..Router+navigate"></a>

#### router.navigate(path, params)
Navigate to path

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path relative to router base |
| params | <code>NavigationParams</code> | Navigation params |

<a name="module_router..Router+getRoutes"></a>

#### router.getRoutes() ⇒ <code>Array.&lt;Route&gt;</code>
Get routes

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..Router+mount"></a>

#### router.mount(path, router)
Mount another router on subpath of current one

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path |
| router | <code>Router</code> | Router |

<a name="module_router..Router+unmount"></a>

#### router.unmount(router)
Unmount child router

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  

| Param | Type | Description |
| --- | --- | --- |
| router | <code>Router</code> | Router |

<a name="module_router..Router+destroy"></a>

#### router.destroy()
Destroy router

**Kind**: instance method of [<code>Router</code>](#module_router..Router)  
<a name="module_router..NavigationParams"></a>

### router~NavigationParams : <code>Object</code>
**Kind**: inner typedef of [<code>router</code>](#module_router)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| absolute | <code>boolean</code> | <code>false</code> | Use absolute path instead of relative by default |
| silent | <code>boolean</code> | <code>false</code> | Do not resolve routers after navigation |
| replace | <code>boolean</code> | <code>false</code> | Replace history state instead of push |

