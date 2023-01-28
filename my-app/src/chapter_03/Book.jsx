import React from "react";

function Book(props) {
    return (
        <div>
            <h1>{`이 책의 이름은 ${props.name}입니다.`}</h1>
            <h2>{`이 책은 총 ${props.numOfPage}페이지로 이뤄져 있습니다.`}</h2>
        </div>
    );
}
// jsx 문법을 쓰지않은 코드
// 코드의 양도 늘어나고, 가독성도 떨어짐.
// react를 사용할 때는 jsx문법을 사용하길 권장.
// function Book(props) {
//     return React.createElement(
//         'div',
//         null,
//         [
//             React.createElement(
//                 'h1',
//                 null,
//                 `이 책의 이름은 ${props.name}입니다.`
//             ),
//             React.createElement(
//                 'h2',
//                 null,
//                 `이 책은 총 ${props.numOfPage}페이지로 이뤄져 있습니다.`
//             )
//         ]
//     )
// }

export default Book;