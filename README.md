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

1. useMemo() Hook
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

2. useCallback() Hook
```jsx
const memoizedCallback = useCallback(
	() => {
		doSomething(의존성 변수1, 의존성 변수2);
	},
	[의존성 변수1, 의존성 변수2]
);

// 동일한 역할을 하는 두 줄의 코드
useCallback(함수, 의존성 배열);
useMemo(() => 함수, 의존성 배열);

// 예시
import { useState } from "react";

function ParentComponent(props) {
	const [count, setCount] = useState(0);

	// 재렌더링 될 때마다 매번 함수가 새로 정의됨
	const handleClick = (event) => {
		// 클릭 이벤트 처리
	}

	return (
		<div>
			<button onClick={() => {
				setCount(count + 1);
			}}>
			{count}
			</button>

			<ChildComponent handleClick={handleClick}/>
		</div>
	);
}
```

**3. useRef() Hook**
> Reference를 사용하기 위한 Hook
> Reference란 특정 컴포넌트에 접급할 수 있는 객체
- refObject.current -> current는 현재 참조하고 있는 Element
- useRef() Hook은 내부의 데이터가 변경되었을 때 별도로 알리지 않는다.

```jsx
// useRef() 사용법
const refContainer = useRef(초기값);

// useRef를 이용하여 버튼 클릭시 input에 focus를 실행
function TextInputWithFocusButton(props) {
	const inputElem = useRef(null);

	const onButtonClick = () => {
		// `current`는 마운트된 input element를 가리킴
		inputElem.current.focus();
	};

	return (
		<>
			<input ref={inputElem} type="text"/>
			<button onClick={onButtonClick}>
				Focus the input
			</button>
		</>
	);
}

// Callback ref
function MeasureExample(props) {
	const [height, setHeight] = useState(0);

	const measureRef = useCallback(node => {
		if (node !== null ) {
			setHeight(node.getBoundingClientRect().height);
		}
	}, []);

	return (
		<>
			<h1 ref={measuredRef}>안녕, 리액트</h1>
			<h2>위 헤더의 높이는 {Math.round(height)px 입니다.}</h2>
		</>
	);
}
```
**1. Hook의 규칙**
- Hook은 무조건 최상위 레벨에서만 호출해야 한다.
- Hook은 컴포넌트가 렌더링될 때마다 매번 같은 순서로 호출되어야 한다.
- 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.

```jsx
// 잘못된 Hook 사용법
// if문의 조건이 true인 경우에만 useEffect hook을 호출
// 이런 경우, 중간에 name의 값이 빈 문자열이 되면 조건문의 값이 false가 되며
// useEffect hook이 호출되지 않음.
// 결과적으로 렌더링 할때마다 hook이 같은 순서대로 호출되는 것이 아니라
// 조건문의 결과에 따라 호출되는 hook이 달라지므로 잘못된 Hook이다.
function MyComponent(props) {
	const [name, setName] = useState('Inje');

	if (name !== '') {
		useEffect(() => {
			...
		});
	}
	...
}
```

**2. Cumstom Hook의 규칙**
- Cumstom Hook의 이름은 꼭 use로 시작해야 한다.
- 여러 개의 컴포넌트에서 하나의 Custom Hook을 사용할 때 컴포넌트 내부에 있는 모든 state와 effects는 전부 분리되어있다.
- 각 Custom Hook 호출에 대해서 분리된 state를 얻게 됨.


### Event

**1. DOM의 Event**
```jsx
// 버튼을 누르면 activate라는 함수를 호출
<button onclick="activate()">
	Activate
</button>
```
**2. React의 Event**
```jsx
// 카멜표기법으로 되어있다. 함수를 그대로 전달
<button onClick={activate}>
	Activate
</button>
```
**3. Event Handler**
> 어떤 사건이 발생하면, 사건을 처리하는 역할

### Conditional Rendering
> 조건에 따른 렌더링 즉, 조건부 렌더링

```jsx
// 예시
function UserGreeting(props) {
	return <h1>다시 오셨군요!</h1>;
}

function GuestGreeting(props) {
	return <h1>회원가입 해주세요.</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;

	// 로그인 했다면 UserGreeting 호출
	if (isLoggedIn) {
		return <UserGreeting />;
	}
	// guest라면 GusetGreeting 호출
	return <GuestGreeting />;
}
```

**1. Boolean 자료형**
> 참(True)/거짓(False)

- Truthy : true는 아니지만, true로 여겨지는 값
- Falsy : false는 아니지만, false로 여겨지는 값

```jsx
// truthy
true는
{} (empty object)
[] (empty array)
42 (number, not zero)
"0", "false" (string, not empty)

// falsy
false
0, -0 (zero, minus zero)
0n (BigInt zero)
'', "", `` (empty string)
null
undefined
NaN (not a number)
```

**2. Element Variables**
```jsx
function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			로그인
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			로그아웃
		</button>
	)
}

function LoginControl(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLoginClick = () => {
		setIsLoggedIn(true);
	}

	const handleLogoutClick = () => {
		setIsLoggedIn(false);
	}

	// 조건에 따라 button이라는 컴포넌트에 대입하는 것이 달라짐.
	let button;
	if (isLoggedIn) {
		button = <LogoutButton onClick={handleLogoutClick} />;
	} else {
		button = <LoginButton onClick={handleLoginClick} />;
	}

	// 컴포넌트가 렌더링 되도록 만듦
	return (
		<div>
			<Greeting isLoggedIn={isLoggedIn} />
			{button}
		</div>
	)
}
```

**3. Inline Conditions**
> 조건문을 코드 안에 집어넣는 것

- Inline If
  - if문의 경우 && 연산자를 사용
  - true && expression -> expression
  - fals && expression -> false

```jsx
// 예시
function Mailbox(props) {
	const unreadMessages = props.unreadMessages;

	return (
		<div>
			<h1>안녕하세요!</h1>
			{unreadMessages.length > 0 &&
				<h2>
					현재 {unreadMessages.length}개의 읽지 않은 메시지가 있습니다.
				</h2>
			} 
		</div>
	);
}
```

- Inline if-else
> if-else문의 경우 ? 연산자를 사용

?(삼항연산자)
condition ? true : false -> 컨디션이 true이면 true를, false이면 false를 반환

```jsx
// isLoggIn이 true면 로그인, false면 로그인하지 않음을 반환
function UserStatus(props) {
	return (
		<div>
			이 사용자는 현재 <b>{props.isLoggedIn ? '로그인' : '로그인하지 않음'}</b> 상태입니다.
		</div>
	);
}
```

- Component 렌더링 막기
  - null을 리턴하면 렌더링하지 않음

```jsx
// null이 리턴되면 경고! 문구를 리턴함.
function WarningBanner(props) {
	if (!props.warning) {
		return null;
	}

	return (
		<div>경고!</div>
	);
}
```

### List and Keys

**1. 여러 개의 Component 렌더링 하기**
```jsx
// map()
const doubled = number.map((number) => number * 2);

// map 함수 예시
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
	<li>{number}/li>
);

ReactDOM.render(
	<ul>{listItems}</ul>,
	document.getElementById('root')
);

// 최종적으로 아래처럼 렌더링
ReactDOM.render(
	<ul>
		<li>{1}</li>
		<li>{2}</li>
		<li>{3}</li>
		<li>{4}</li>
		<li>{5}</li>	
	</ul>,
	document.getElementById('root')
);
```

**2. 기본적인 List Component**
```jsx
function NumberList(props) {
	const { numbers } = props;

	const listItems = numbers.map((number) =>
		<li>{number}</li>
	);

	return (
		<ul>{listItems}</ul>
	);
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	<NumberList numbers={numbers} />,
	document.getElementById('root')
);
```

**3. List와 Key**
- key로 값을 사용하는 경우
```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
	<li key={number.toString()}>
		{number}
	</li>
);
```
- key로 id를 사용하는 경우
```jsx
const todoItems = todos.map((todo) =>
	// 아이템들의 고유한 ID가 없을 경우에만 사용해야 함
	<li key={todo.id}>
		{todo.text}
	</li>
);
```
- key로 index를 사용하는 경우
```jsx
const todoItems = todos.map((todo, index) =>
	// 아이템들의 고유한 ID가 없을 경우에만 사용해야 함
	<li key={index}>
		{todo.text}
	</li>
);
```
- map() 함수 안에 있는 Elements는 꼭 key가 필요하다!

### Form
> Form은 사용자로부터 입력을 받기 위해 사용

**1. Controlled Components**
> 값이 리액트의 통제를 받는 Input Form Element
- HTML Form : 자체적으로 state를 관리
  - input_state, textarea_state, select_state
- Controlled Component : 모든 데이터를 state에서 관리
  - Component의 state = {}, setState()

**2. Textarea 태그**
- HTML textarea 태그
```jsx
<textarea>
	안녕하세요, 여기에 이렇게 택스트가 들어가게 됩니다.
</textarea>
```

**3. Select 태그**
> Drop-down 목록을 보여주기 위한 HTML 태그

```js
<select>
	<option value="apple">사과</option>
	<option value="banana">바나나</option>
	<option selected value="grape">포도</option>
	<option value="apple">수박</option>
</select>
```

**4. File input 태그**
> 디바이스의 저장 장치로부터 하나 또는 여러 개의 파일을 선택할 수 있게 해주는 HTML 태그
> Uncontrolled Component
```jsx
<input type="file"/>
```

**5. Input Null Value**
```jsx
// value값이 정해져서 입력이 불가능이지만,
ReactDOM.render(<input value="hi"/>, rootNode);
// value값을 null로 만들면서 입력이 가능하게 만들어진다.
setTimeout(function() {
	ReactDOM.render(<input value={null}/>, rootNode);
}, 1000);

```

### Shared State

1. 하위 컴포넌트에서 State 공유
```jsx
// 예시
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>물이 끓습니다.</p>;
	}
	return <p>물이 끓지 않습니다.</p>;
}

function Calculator(props) {
	const [temperature, setTemperature] = useState('');

	const handleChange = (event) => {
		setTemperature(event.target.value);
	}

	return (
		<fieldset>
			<legend>섭씨 온도를 입력하세요:</legend>
			<input
				value={temperature}
				onChange={handleChange}
				/>
			<BoilingVerdict
				celsius={parseFloat(temperature)} />
		</fieldset>
	)
}
```
```jsx
const scaleNames = {
	c: '섭씨',
	f: '화씨'
};

function temperatureInput(props) {
	const [temperature, setTemperature] = useState('');

	const handleChange = (event) => {
		setTemperature(event.target.value);
	}

	return (
		<fieldset>
			<legend>
				온도를 입력해 주세요(단위:{scaleNames[props.scale]});
			</legend>
			<input value={temperature} onChange={handleChange}/>
		</fieldset>
	)
}

function Calculator(props) {
	return (
		<div>
			<temperatureInput scale="c" />
			<temperatureInput scale="f" />
		</div>
	);
}
// 섭씨온도 계산
function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}
// 화씨온도 계산
function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

tryConvert('abc', toCelsius); // empty string을 리턴
tryConvert('10.22', toFahrenheit); // '50.396'을 리턴
```
**2. Shared State 적용하기**
- 하위 컴포넌트의 state를 공통 상위 컴포넌트로 올림
```jsx
return (
	...
		// 변경 전: <input value={temperature} onChange={handleChange}/>
		<input value={props.temperature} onChange={handleChange} />
	...
)
```