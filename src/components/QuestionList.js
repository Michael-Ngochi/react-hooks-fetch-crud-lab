import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions,onRemove}) {
  function handleCLick(id){
    onRemove(id)
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map((question)=>{
          return <QuestionItem key={question.id} question={question} onClick={handleCLick}/>
        })
        }</ul>
    </section>
  );
}


export default QuestionList;
