# Webpack이란?

Webpack은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다. 
Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 
그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로
html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.


# Webpack

Webpack과 Babel을 이용하여 ES6+ 개발 환경을 구축하여 보자. 
Webpack이 자바스크립트 파일을 번들링하기 전에 
Babel을 로드하여 ES6+ 코드를 ES5 코드로 트랜스파일링하는 작업을 실행하도록 설정할 것이다. 
그리고 Sass를 사용하는 경우, Sass 트랜스파일링도 Webpack에서 관리하도록 할 것이다.

# Webpack 설치
아래 명령으로 Webpack을 설치한다.
Webpack V4는 webpack-cli를 요구한다

```bash
$ npm install --save-dev webpack webpack-cli

```

package.json 의 dependency 에 다음 항목들이 추가된걸 볼 수 있다.  
"webpack": "^5.89.0",
"webpack-cli": "^5.1.4"


# babel-loader
Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+ 코드를 ES5 코드로 트랜스파일링하도록 babel-loader를 설치한다.

# babel-loader 설치
$ npm install --save-dev babel-loader
이제 npm script를 변경하여 Babel 대신 Webpack을 실행하도록 수정하자. 
아래와 같이 package.json 파일의 scripts의 bulid 부분을 변경한다. 완성된 package.json 파일은 아래와 같다.

``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack -w"
  },
```

# webpack.config.js
webpack.config.js은 Webpack이 실행될 때 참조하는 설정 파일이다. 
프로젝트 루트에 webpack.config.js 파일을 생성하고 작성한다.

이제 Webpack을 실행하여 트랜스파일링 및 번들링을 실행한다. 
트랜스파일링은 Babel이 실행하고 번들링은 Webpack이 실행한다. 
만약 이전에 실행시킨 빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

``` bash
npm run build

```

실행 결과 dist/js 폴더에 bundle.js이 생성되었다. 
이 파일은 main.js, lib.js 모듈이 하나로 번들링된 결과물이다.

index.html을 아래와 같이 수정하고 브라우저에서 실행해 보자.
```html
<!DOCTYPE html>
<html>
<body>
  <script src="./dist/js/bundle.js"></script>
</body>
</html>
```

main.js, lib.js 모듈이 하나로 번들링된 bundle.js가 브라우저에서 문제없이 실행된 것을 확인할 수 있다.


# babel-polyfill
Babel을 사용하여 ES6+ 코드를 ES5 이하로 트랜스파일링하여도 
브라우저가 지원하지 않는 코드가 남아 있을 수 있다. 
예를 들어, ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 이하로 트랜스파일링하여도 
대체할 ES5 기능이 없기 때문에 그대로 남아 있다.

src/js/main.js을 아래와 같이 수정 후, 어떻게 트랜스파일링 되는지 보자
```jsx
// src/js/main.js
import { pi, power, Foo } from './lib';

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// polyfill이 필요한 코드
console.log(new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 100);
}));

// polyfill이 필요한 코드
console.log(Object.assign({}, { x: 1 }, { y: 2 }));

// polyfill이 필요한 코드
console.log(Array.from([1, 2, 3], v => v + v));
```

다시 트랜스파일링과 번들링을 실행한 다음, dist/js/bundle.js을 확인해보자.

확인해보면
Promise, Object.assign, Array.from 등과 같이
ES5 이하로 대체할 수 없는 기능은 트랜스파일링이 되지 않는다.

따라서 오래된 브라우저에서도 
ES6+에서 새롭게 추가된 객체나 메소드를 사용하기 위해서는 
@babel/polyfill을 설치해야 한다.


설치가 완료된 이후 package.json 파일은 아래와 같다.
```json
"dependencies": {
    "@babel/polyfill": "^7.12.1"
  }
```

babel-polyfill은 개발 환경에서만 사용하는 것이 아니라 
실제 환경에서도 사용하여야 하므로 
--save-dev 옵션으로 개발 설치를 하지 않도록 한다.

ES6의 import를 사용하는 경우에는 진입점의 선두에서 먼저 폴리필을 로드하도록 한다.

```jsx

// src/js/main.js
import "@babel/polyfill";
....

```

webpack을 사용하는 경우에는 위 방법 대신 
폴리필을 webpack.config.js 파일의 entry 배열에 추가한다.

// webpack.config.js
const path = require('path');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/main.js'],
  ...
위와 같이 webpack.config.js 파일을 수정하여 폴리필을 반영해보자. 
빌드 명령이 실행 중인 상태라면 중지시키고 다시 아래 명령을 실행한다.

$ npm run build

dist/js/bundle.js을 확인해보면 아래와 같이 polyfill이 추가된 것을 확인할 수 있다.


