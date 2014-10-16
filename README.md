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
require('sload')('mydefined'[,$cwd])
// ==> require(path.join(($cwd || process.cwd()), 'mydefined')
```

>Note:
>when "$cwd" is a relative path, actually $cwd is
>"path.join(process.cwd(), $cwd)" in require function

#### sload.init
the ```sload``` global function can be used after ```init``` called.

```init``` just need called once.

In the application main function ,

```
sload = require('sload')
sload().init([$cwd])
```

the ```$cwd``` parameter defined the file root directory. 
default ```$cwd``` is ```process.cwd()```

>Note:
>when "$cwd" is a relative path, actually $cwd is
>"path.join(process.cwd(), $cwd)" in require function

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

forexample.js:

```
var hello = sload('hello') # equal  require(path.join($cwd,'hello'))
```

### Test

```
cd sload
npm test
```

or see the ```slow/sample``` 