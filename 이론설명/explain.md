
설정 패키지 목록

* ESLint :  JavaScript 코드를 분석하고 규칙을 적용하여 코드 품질을 검사하는 도구

* prettier : 코드를 일관된 스타일로 자동으로 포맷팅하여 읽기 쉽고 일관된 코드 스타일을 유지하기 위한 코드 포맷팅 도구

* eslint-config-prettier : ESLint와 Prettier를 함께 사용할 때, ESLint와 Prettier 간의 충돌을 방지하기 위해 설치한다. 
                           ESLint에서 Prettier와 겹치는 포매팅룰을 삭제한다.

* eslint-plugin-prettier : ESLint 규칙과 Prettier 규칙 간의 충돌을 자동으로 해결하도록 도와준다. 
                           이 플러그인을 사용하면 코드 포맷팅에 관한 ESLint 규칙을 활성화하고, 
                           이러한 규칙을 Prettier로 전달하여 일관된 코드 스타일을 유지할 수 있다.


* .prettierrc.json 에 관한 설명
    
// singleQuote: 모든 문자열을 작은따옴표로 지정합니다.
// bracketSpacing: 객체 리터럴에서 괄호 주위에 공백을 적용합니다.
// bracketSameLine: 객체 리터럴의 여는 중괄호'(' , '{'를 같은 줄에 배치합니다.
// arrowParens: 화살표 함수의 매개변수에 괄호를 사용할 방식을 결정합니다.
// avoid: 가능한 경우 생략합니다.
// printWidth: 코드 줄의 최대 길이를 120자로 제한합니다.


* eslintrc.json
=>
env: 사용 환경 의미
extends : 확장 기능 사용
parserOptions: 버전과 모듈 사용 여부
plugins : 사용되는 플러그인
rules : 세부 설정 (규칙) 추가


VS Code 익스텐션에서 eslint를 검색하여 설치하면,
코드에디터에서 바로 eslint 검사결과를 표시해준다.
(오류일 경우 빨간줄, 경고일 경우 노란줄 표시
마우스 올리면 어떤 문제인지 알려줌)


* prettier 패키지 설치
npm install --save-dev prettier
코드 포맷팅만을 집중적으로 수행하는 툴인 Prettier를 설치한다.


* eslint-config-prettier 패키지 설치
npm install --save-dev eslint-config-prettier
Prettier 설정과 충돌나는 ESLint의 설정을 비활성화하는 역할을 수행한다.

* eslint-plugin-prettier 패키지 설치
npm install --save-dev eslint-plugin-prettier
ESLint 안에서 Prettier 검사를 실행하도록 설정한다. 즉, Prettier 검사 결과를 ESLint 검사 결과처럼 보여주도록 한다.

* eslint-plugin-html 패키지 설치	
HTML 파일에 포함된 인라인 자바스크립트 지원 플러그인


* ESLint에 Airbnb Style Guide를 적용하기 위한 패키지 일괄 설치
eslint 컨벤션으로 유명한 airbnb 코드 컨벤션을 따라하기로함.
npx install-peerdeps --dev eslint-config-airbnb
ESLint에 Airbnb Style Guide를 적용하기 위한 여러 개의 패키지들을 일괄 설치한다.

*  private 필드 정의 제안과 같이 아직 ECMAScript 정식 표준이 아닌 제안 단계의 자바스크립트 코드의 경우 
eslint가 소스 코드를 파싱할 수 없어 에러가 발생하는 경우가 있다.

예시 => 
class MyClass {
  #privateField = ''; // Parsing error: Unexpected character '#'
}

* 이러한 경우 @babel/eslint-parser를 사용해 자바스크립트 소스 코드를 파싱해야 한다. 다음과 같이 @babel/eslint-parser를 설치한다.
$ npm install --D @babel/core @babel/eslint-parser @babel/preset-env

다음과 같이 babel.config.json을 생성한다.

{
  "presets": ["@babel/preset-env"]
}

* Babel은 주로 현재 또는 미래의 JavaScript 코드를 이전 버전의 JavaScript로 변환하기 위해 사용됩니다. 
이때, presets는 Babel이 어떤 변환을 수행해야 하는지를 결정하는데 사용됩니다.

["@babel/preset-env"]는 Babel이 자동으로 환경에 맞게 필요한 트랜스파일(Transpile) 설정을 처리하도록 하는 프리셋입니다. 
이 프리셋은 코드를 지원되는 환경에 맞게 변환해줍니다.

예를 들어, 최신 브라우저에서만 지원되는 ES6+ 기능을 사용하여 코드를 작성하더라도, 
이 설정을 사용하면 이전 버전의 브라우저나 Node.js와 같은 환경에서도 호환되도록 변환됩니다. 
이 preset은 사용자가 수동으로 설정하지 않아도 
Babel이 필요한 변환을 자동으로 수행하게 해주는 편리한 방법입니다.



다음과 같이 .eslintrc.json에도 parser를 설정하면 에러가 발생하지 않는다.

{
  "parser": "@babel/eslint-parser",
  ...
}

ESLint는 JavaScript 코드를 분석하고 규칙을 적용하여 코드 품질을 검사하는 도구입니다. 
이때 코드를 파싱하고 분석하기 위해 파서가 필요합니다. 
Babel은 최신 JavaScript 문법을 사용하는 코드를 이전 버전의 JavaScript로 변환해주는 데 사용됩니다. 
이 변환 작업을 ESLint에서도 사용하기 위해 @babel/eslint-parser를 선택할 수 있습니다.

"@babel/eslint-parser"는 Babel이 제공하는 파서를 ESLint에 통합하여 
최신 문법을 사용하는 코드를 분석하고 검사할 수 있게 해줍니다. 
이것은 ESLint가 최신 JavaScript 문법을 이해하고 적용할 수 있도록 도와주는 역할을 합니다.