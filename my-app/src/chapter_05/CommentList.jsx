import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "이인제",
        comment: "안녕하세요, 소플입니다.",
    },
    {
        name: "유재석",
        comment: "리액트 재밌어요~",
    },
    {
        name: "강민경",
        comment: "리액트 배우고싶다.",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) =>
            <Comment name={comment.name} comment={comment.comment}/>)}
        </div>
    );
}

export default CommentList;