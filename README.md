Pure 함수
- 입력값(input)을 변경하지 않으며,
  같은 입력값에 대해서는 항상 같은 출력값(output)을 리턴

Impure 함수
- pure함수와 반대로 입력값이 변경된다.

모든 리액트 컴포넌트는 props를 직접 바꿀 수 없고,
같은 props에 대해서는 항상 같은 결과를 보여줄 것!

### Component
> Component 이름은 항상 대문자로 시작해야 한다.

#### Component 종류
- Function Component
  - 함수가 간단하다
  - state 사용 불가
  - Lifecycle에 따른 기능 구현 불가
    ```jsx
    function Welcome(props) {
        return <h1>안녕, {props.name}</h1>;
    }
    ```
- Class Component
  - 상속
  - 생성자에서 state를 정의
  - setState() 함수를 통해 state 업데이트
  - Lifecycle methods 제공
    ```jsx
    class Welcome extends React.Component {
        render () {
            return <h1>안녕, {this.props.name}</h1>;
        }
    }
    ```
#### Component 합성과 추출
1. 합성
- Component를 합성하여 하나의 Component로 만들 수 있다.
  
2. 추출
- 큰 Component를 산산조각 내어 추출한다.
  - 재사용성, 가독성 올라감.
  - 재사용 가능한 Component를 많이 갖고 있을수록 개발속도가 빨라진다!

```jsx
// 추출된 avatar component
function Avatar(props) {
	return(
		<img className="avatar"
			src={props.author.avatarUrl}
			alt={props.author.name}
		/>
	);
}
function UserInfo(props) {
	return (
		<div className="user-info">
			<Avatar user={props.author}/>
			<div className="user-info-name">
				{props.author.name}
			</div>
		</div>
	)
}
function Component(props) {
  	return (
		<div className="comment">
			<UserInfo user={props.author}/>
			<div className="comment-text">
				{props.text}
			</div>
			<div className="comment-text">
				{formatDate(props.date)}
			</div>
  	);
}
```

### State
> 리액트 Component의 상태
> 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야 함!
> state는 javascript 객체이다.

```jsx
class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		// 현재 component의 상태를 정의
		this.state = {
			liked: false
		}
	}
}
```
### Lifecycle
> 리액트의 Component 생명주기
> component가 계속 존재하는 것이 아니라, 
> 시간의 흐름에 따라 생성되고 업데이트 되다가 사라진다.

1. 출생(Mounting)
   - Component가 생성되는 시점.
   - constructor(생성자)가 실행
   - component가 렌더링 됨
2. 인생(Updating)
   - component의 state가 변경 
3. 사망(Unmounting)
   - 상위 component에서 현재 commponent를 더 이상 화면에 표시하지 않을 

### Hooks
> 원래 존재하는 어떤 기능에 갈고기를 걸어 끼어 들어가서 같이 수행.
> 갈고리를 걸어 원하는 시점에 정해진 함수를 실행
> 이때, 실행되는 함수가 Hooks

```jsx
import React, { useState } from "react";

function Counter(props) {
	var count = 0;

	return (
		<div>
			<p>총 {count}번 클릭했습니다.</p>
			<button onClick={() => count ++}>
				클릭
			</button>
		</div>
	)
}

// useState() 사용법
const [변수명, set함수명] = useState(초기값);
```

#### Side effect
> 일반적으로 부작용을 의미하지만, 리액트에서는 효과라는 의미

```jsx
// useEffect 사용법
useEffect(이펙트 함수, 의존성 배열);

// Effect function이 mount, unmount 시에 단 한번씩만 실행 됨
useEffect(이펙트 함수, []);

// 의존성 배열을 생략하면 컴포넌트가 업데이트될 때마다 호출 됨
useEffect(이펙트 함수);

// 예시
import React, { useState, useEffect } from "react";

function Counter(props) {
	const [count, setCount] = useState(0);

	// componentDidMount, componentDidUpdate와 비슷하게 작동합니다.
	useEffect(() => {
		// 브라우저 API를 사용해서 document의 title을 업데이트합니다.
		document.title = `You clicked ${count} times`;
	});

	return (
		<div>
			<p>총 {count}번 클릭했습니다.</p>
			<button onClick={() => setCount(count + 1)}>
				클릭
			</button>
		</div>
	);
}

// 정리
useEffect(() => {
	// 컴포넌트가 마운트 된 이후,
	// 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
	// 의존성 배열에 빈 배열([])을 넣으면 마운트와 언마운트시에 단 한 번씩만 실행됨
	// 의존성 배열 생략 시 컴포넌트 업데이트 시마다 실행됨
	...

	return () => {
		// 컴포넌트가 마운트 해제되기 전에 실행됨
		...
	}
}, [의존성 변수1, 의존성 변수2, ...]);
```

#### Memoization
> Memoized value


```jsx
// useMemo Hook은 랜더링이 일어나는 동안 실행된다.
const memoizedValue = useMemo(
	() => {
		// 연산량이 높은 작업을 수행하여 결과를 반환
		return computeExpensiveValue(의존성 변수1, 의존성 변수2);
	},
	[의존성 변수1, 의존성 변수2]
);

// 의존성 배열을 넣지 않을 경우, 매 렌더링마다 함수가 실행 됨
const memoizedValue = useMemo(
	() => computeExpensiveValue(a, b)
);

// 의존성 배열이 빈 배열일 경우, 컴포넌트 마운트 시에만 호출됨
const memoizedValue = useMemo(
	() => {
		return computeExpensiveValue(a, b);
	},
	[]
);
```
