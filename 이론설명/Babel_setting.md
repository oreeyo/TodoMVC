# Babel

크롬, 사파리, 파이어폭스와 같은 에버그린 브라우저(Evergreen browser, 사용자의 업데이트 없이도 최신 버전으로 자동 업데이트를 수행하는 모던 브라우저)의 
ES6 지원 비율은 약 98%로 거의 대부분의 ES6 사양을 구현하고 있다.

하지만 인터넷 익스플로어(IE) 11의 ES6 지원 비율은 약 11%이다. 
그리고 매년 새롭게 도입되는 ES6 이상의 버전(ES6+)과 
제안 단계에 있는 ES 제안 사양(ES NEXT)은 브라우저에 따라 지원 비율이 제각각이다.

따라서 ES6+ 또는 ES NEXT의 ES 최신 사양을 사용하여 프로젝트를 진행하려면 
최신 사양으로 작성된 코드를 경우에 따라 
IE를 포함한 구형 브라우저에서 문제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다. 
특히 모듈의 경우, 모듈 로더가 필요하다.

모던 브라우저(Chrome 61, FF 60, SF 10.1, Edge 16 이상)에서 ES6 모듈을 사용할 수 있다. 
단, 아래와 같은 이유로 아직까지는 브라우저가 지원하는 ES6 모듈 기능보다는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다.

* IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.
* 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.
* 아직 지원하지 않는 기능(Bare import 등)이 있다. (ECMAScript modules in browsers 참고)
* 점차 해결되고는 있지만 아직 몇가지 이슈가 있다. (ECMAScript modules in browsers 참고)


* 트랜스파일러(Transpiler) Babel과 모듈 번들러(Module bundler) Webpack을 이용하여 ES6+ 개발환경을 구축해보자.
* 아울러 Webpack을 통해 ES6+ 코드와 Sass를 트랜스파일링하는 방법도 알아볼 것이다.


**Babel이란 ?**
아래 예제는 ES6의 화살표 함수와 ES7의 지수 연산자를 사용하고 있다.

// ES6 화살표 함수와 ES7 지수 연산자
``` jsx
[1, 2, 3].map(n => n ** n);

```

IE와 다른 구형 브라우저에서는 이 두가지 기능을 지원하지 않을 수 있다. 
Babel을 사용하면 위 코드를 아래와 같이 ES5 이하의 버전으로 변환할 수 있다.

// ES5
```jsx
"use strict";

[1, 2, 3].map(function (n) {
  return Math.pow(n, n);
});
```

이처럼 Babel는 최신 사양의 자바스크립트 코드를 
IE나 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환(트랜스파일링)할 수 있다. 
Babel을 사용하기 위한 개발 환경을 구축해 보자.

# Babel CLI 설치
npm을 사용하여 Babel CLI을 설치해 보자. 
프로젝트에 따라 설정이 다를 수 있으므로 전역으로 설치하지 말고 
로컬로 설치하도록 하자.

# babel-core, babel-cli 설치
$ npm install --save-dev @babel/core @babel/cli

설치가 완료된 이후 package.json 파일은 아래와 같다.

``` json
{
  "name": "todomvc",
  "version": "1.0.0",
  "devDependencies": {
    "@babel/cli": "^7.23.0",
    "@babel/core": "^7.23.3",
  }
}
```


# babelrc 설정 파일 작성

Babel을 사용하려면 @babel/preset-env을 설치해야 한다. 
@babel/preset-env은 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 Babel 프리셋이라고 부른다.
Babel이 제공하는 공식 Babel 프리셋(Official Preset)은 아래와 같다.

@babel/preset-env
@babel/preset-flow
@babel/preset-react
@babel/preset-typescript

@babel/preset-env도 공식 프리셋의 하나이며 
필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다. 
프로젝트 지원 환경은 Browserslist 형식으로 .browserslistrc 파일에 상세히 설정할 수 있다. 
프로젝트 지원 환경 설정 작업을 생략하면 기본값으로 설정된다.

일단은 기본 설정으로 진행하도록 하자. 기본 설정은 모든 ES6+ 코드를 변환한다.

# env preset 설치
$ npm install --save-dev @babel/preset-env

설치가 완료된 이후 package.json 파일은 아래와 같다.
``` json
"devDependencies": {
    "@babel/cli": "^7.23.0",
    "@babel/core": "^7.23.3",
    "@babel/eslint-parser": "^7.23.3",
    "@babel/preset-env": "^7.23.3"
    }
```

설치가 완료되었으면 프로젝트 루트에 .babelrc 파일을 생성하고 
아래와 같이 작성한다. 
지금 설치한 @babel/preset-env를 사용하겠다는 의미이다.

``` json
{
  "presets": ["@babel/preset-env"]
}
```


# Transfiling (트랜스파일링)

Babel을 사용하여 ES6+ 코드를 ES5 이하의 코드로 트랜스파일링하기 위해
Babel CLI 명령어를 사용할 수도 있지만
npm script를 사용하여 트랜스파일링하는 방법에 대해 알아보도록 하자.

package.json 파일에 scripts를 추가한다. 완성된 package.json 파일은 아래와 같다.

``` json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src/js -w -d dist/js"
  }
```

위 npm script는 src/js 폴더(타깃 폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 
그 결과물을 dist/js 폴더에 저장한다. 사용한 옵션의 의미는 아래와 같다.

**-w**
타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일한다. (--watch 옵션의 축약형)

**-d**
트랜스파일링된 결과물이 저장될 폴더를 지정한다. (--out-dir 옵션의 축약형)
이제 트랜스파일링을 테스트하기 위해 ES6+ 파일을 작성해 보자. 
프로젝트 루트에 src/js 폴더를 생성한 후 lib.js와 main.js를 추가하고 내용을 작성한 후에,
터미널에서 아래 명령으로 트랜스파일링을 실행한다.

``` bash
npm run build

```



# Babel 플러그인

설치가 필요한 플러그인은 Babel 홈페이지에서 검색할 수 있다.
상단 메뉴의 Search에 제안(프로포절)의 이름을 입력하면 
해당 플러그인을 검색할 수 있다. 
클래스 필드 정의 제안 플러그인을 검색하기 위해 “Class field”를 입력해보자.

검색한 플러그인 @babel/plugin-proposal-class-properties를 설치해보자.

``` bash
npm install --save-dev @babel/plugin-proposal-class-properties

```


설치 이후 package.json 파일은 아래와 같다.
``` json
 "devDependencies": {
    "@babel/cli": "^7.23.0",
    "@babel/core": "^7.23.3",
    "@babel/eslint-parser": "^7.23.3",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/preset-env": "^7.23.3"
 }
```

설치한 플러그인은 .babelrc 파일에 추가해 주어야 한다.
```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

다시 터미널에서 아래 명령으로 트랜스파일링을 실행해보자.
```bash
npm run build
```

트랜스파일링에 성공하면 프로젝트 루트에 dist/js 폴더가 자동 생성되고 트랜스파일링된 main.js와 lib.js가 저장된다.

트랜스파일링된 main.js를 실행하여 보자. 결과는 아래와 같다.

```bash
node dist/js/main

3.141592653589793
36.4621596072079
{ a: 1, b: 2, x: { c: 3, d: 4 } }
10
```


# 브라우저에서 모듈 로딩 테스트

앞에서 main.js와 lib.js 모듈을 트랜스파일링하여 
ES5로 변환된 main.js을 실행한 결과, 문제없이 실행되는 것을 확인하였다. 
ES6+에서 새롭게 추가된 기능은 물론 현재 제안 상태에 있는 “클래스 필드 정의 제안”도 ES5로 트랜스파일링되었고
ES6의 모듈의 import와 export 키워드도 트랜스파일링되어 모듈 기능도 정상적으로 동작하는 것을 확인하였다.

하지만 모듈 기능은 node.js 환경에서 동작한 것이고 
Babel이 모듈을 트랜스파일링한 것도 node.js가 기본 지원하는 CommonJS 방식의 module loading system에 따른 것이다. 
아래는 src/js/main.js가 Babel에 의해 트랜스파일링된 결과이다.

```jsx
// dist/js/main.js
"use strict";

var _lib = require("./lib");

console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar());
```

브라우저는 CommonJS 방식의 module loading system(require 함수)을 지원하지 않으므로 
위에서 트랜스파일링된 결과를 그대로 브라우저에서 실행하면 에러가 발생한다.

프로젝트 루트 폴더에 아래와 같이 index.html을 작성하여 
트랜스파일링된 자바스크립트 파일을 브라우저에서 실행해보자.

<!DOCTYPE html>
<html>
<body>
  <script src="dist/js/lib.js"></script>
  <script src="dist/js/main.js"></script>
</body>
</html>

위 html 파일을 브라우저 실행하면 아래와 같은 에러가 발생한다.

Uncaught ReferenceError: exports is not defined
    at lib.js:3
main.js:3 Uncaught ReferenceError: require is not defined
    at main.js:3

브라우저의 ES6 모듈 기능을 사용하도록 Babel을 설정할 수도 있으나 
앞서 설명한 바와 같이 브라우저의 ES6 모듈 기능을 사용하는 것은 문제가 있다.

Webpack을 통해 이러한 문제를 해결해보도록 하자.  (webpack.md 파일 참고)


