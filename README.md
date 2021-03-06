sload ---- slow-load
---------
pakaging require function.

### How to install
```
  npm install sload --save
```

### How to use

#### sload
```
_sload = require('sload')
_sload('mydefined'[,$cwd])

// actually ==> 
require(path.join(($cwd || process.cwd()), 'mydefined')
```

>Note:
>when "$cwd" is a relative path, actually 
>$cwd === path.join(process.cwd(), $cwd)

#### sload.init  Note: obsolescent. Don't suggest use it. (now use sload.loader)
the ```sload``` global function can be used after ```init``` called.

```init``` just need called once.

In the application main function ,

```
sload = require('sload')
sload.init([$cwd])
```

the ```$cwd``` parameter defined the file root directory. 
default ```$cwd``` is ```process.cwd()```

>Note:
>when "$cwd" is a relative path, actually 
>$cwd === path.join(process.cwd(), $cwd)

and in other files you can use ```sload(filepath)```, for example:

a appliactions file structor:
```
-/
  -a.js
  -a
    -b.js
    -b
      -c.js
```
if ```c.js``` require ```a.js``` ,
normally, c.js:

```
var a = require("../../a")
```

if use ```sload``` , c.js: 

```
var a = sload("a") // or  sload("a.js")
```

for example.js:

```
var hello = sload('hello') # ===>  require(path.join($cwd,'hello'))
```
#### sload.loader (instead sload.init)

Now sload no longer provide global object ```sload``` ,just return a function.
eg.

```
_sload = require('sload')
global.sload = _sload.loader([$cwd])

//equals
//==>
_sload = require('sload')
_sload.init([$cwd])

```


#### sload.scan
Get module list from directory.

accept three arguments. ```directoryPath``` ```cwd``` ```options```

##### directoryPath

the directory where is module files. (relative path.)

if directory is absolute, ignore arument ```cwd``

##### cwd

set the require root path.(default is ```process.cwd()```)

##### options

A options object. {ignore: [[regexp1|function(exp){}, ...], match: [regexp1|function(exp){}, ..]}

###### ignore

the module scanner will ignore the file that match in ```ignore```  list.

```ignore``` list item can be regexp or function. if it is a function,will accept a
argument, and remember make it return boolean.

eg.
```
function(exp){
  return exp.indexOf('.html') !== -1
}
```

eg. {ignore: [/\.coffee$/, function(exp){ do thing; return false}]}

if ignore is ```undefined``` , nothing will be ignored.

###### match

the module scanner will push the file that match in ```match```  list.

if ```match``` is ```undefined``` , all file will be push.(except file that in ```ignore``` list)

### Test

```
cd sload
npm test
```

or see the ```slow/sample/index.coffee```
 
 
### History

v0.1.2

1. add module Scanner