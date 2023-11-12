# 2. 렌더링

## **문서객체모델**

- 데이터를 표시한다는 것은 요소를 화면이나 다른 출력장치에 렌더링하는 것을 의미함.

문서 객체 모델 이란?

⇒ 프로그래밍 방식으로 요소를 렌더링하는 방식 이다.

DOM 이란?

⇒ 웹 애플리케이션을 구성하는 요소를 조작할 수 있는 API 이다.

- 애플리케이션 ⇒

"응용 프로그램"이라는 용어의 줄임말로, 컴퓨터 소프트웨어의 일종이다.

“응용 프로그램”은 컴퓨터 사용자가 특정 작업을 수행하는 데 도움을 주거나 특정 기능을 실행하는 데 사용되는 소프트웨어 프로그램이다.

- API ⇒

API는 "Application Programming Interface"의 약자로, 응용 프로그램 간에 상호 작용하기 위한 규약이나 도구를 의미한다.

- 기술적 관점에서 보면 모든 HTML 페이지는 트리로 구성된다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/1cf6dd62-4a6f-453c-bd25-6695bddbb9bb/35a3889c-d8f6-49c0-b3c8-4f0c37363a80/Untitled.png)

```jsx
const SELECTOR = 'tr:nth-child(3) > td';
const cell = document.querySelector(SELECTOR);
cell.style.backgroundColor = 'blue';
```

querySelector 메서드는 Node 메서드다.

Node는 HTML 트리에서 노드를 나타내는 기본 인터페이스 이다.

### 렌더링 성능 모니터링

- 웹용 렌더링 엔진을 설계할 때, 가독성, 유지관리성, 성능을 염두에 둬야함.

**렌더링 엔진의 성능을 모니터링하는 도구들**

1. **크롬 개발자 도구**

⇒ 초당 프레임 수 (FPS) → Frame-Per-Second

개발자 도구에서 Cmd + Shift + P 를 눌러 명령메뉴를 표시.

Show frame Per seconds (FPS) meter 메뉴 항목 선택.

GPU 에서 사용하는 메모리양이 표시되는 걸 볼 수 있음.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/1cf6dd62-4a6f-453c-bd25-6695bddbb9bb/b78d992c-bfab-4f1b-aa98-f847ddab45e2/Untitled.png)

1. **state.js**

⇒ state.js 를 사용해서 애플리케이션의 FPS 를 모니터링 할 수 있다.

http://statejs.org/ 참고

1. **사용자 정의 성능 위젯**

⇒ 애플리케이션의 FPS를 보여주는 위젯을 작성하는 방법.

requestAnimationFrame 콜백을 사용해서

현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하고

콜백이 1초내에 호출되는 횟수를 추적하면 된다.

```jsx
let panel;
let start;
let frames = 0;

const create = () => {
  const div = document.createElement('div');

  div.style.position = 'fixed';
  div.style.left = '0px';
  div.style.top = '0px';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.backgroundColor = 'black';
  div.style.color = 'white';

  return div;
};

const tick = () => {
  frames++;

  const now = window.performance.now();
  if (now >= start + 1000) {
    panel.innerText = frames;
    frames = 0;
    start = now;
  }

  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();

  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default {
  init,
};
```

1. **`panel`**, **`start`**, **`frames`** 변수 선언:
   - **`panel`**: HTML 요소를 저장하는 변수로, 나중에 프레임 속도를 표시할 패널 역할을 한다.
   - **`start`**: 프레임 카운트를 시작하는 시간을 저장하는 변수로, 성능 측정에 사용된다.
   - **`frames`**: 1초 동안의 프레임 수를 저장하는 변수로, 1초가 지날 때마다 이 값을 패널에 업데이트 한다.
2. **`create`** 함수:
   - **`create`** 함수는 HTML **`div`** 엘리먼트를 생성하고 스타일을 설정하여 반환한다.
   - 이 div는 나중에 프레임 수를 표시할 패널 역할을 한다.
3. **`tick`** 함수:
   - **`tick`** 함수는 애니메이션 프레임마다 호출되며, 1초 동안의 프레임 수를 계산하고 패널에 업데이트 한다.
   - **`window.performance.now()`**를 사용하여 현재 시간을 가져와 1초가 지났는지 확인하고,
   - 지났다면 프레임 수를 패널에 표시하고 초기화 한다.
4. **`init`** 함수:
   - **`init`** 함수는 외부에서 호출할 때, 성능 측정 패널을 생성하고 프레임 카운트를 시작한다.
   - **`parent`** 매개변수를 통해 패널을 추가할 부모 요소를 지정할 수 있다. 기본값은 **`document.body`**이다.
   - **`window.requestAnimationFrame`**을 사용하여 애니메이션 프레임마다 **`tick`** 함수를 호출한다.
5. **`export default`**:
   - 모듈로 사용하기 위해 이 코드를 내보낸다.
   - 이 코드를 가져다 사용하는 곳에서는 **`init`** 함수만을 호출하여 성능 측정 패널을 초기화할 수 있다.

FPS 를 계산한 다음, 위젯에 숫자를 표시하거나 콘솔을 사용해서 데이터를 출력하면 된다.
