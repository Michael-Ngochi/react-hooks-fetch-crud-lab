import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const[questions,setQuestions]=useState([]);

  function handleDetele(id){
   console.log(`deleting ${id}`);
   fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
  .then((res) => {
    if (!res.ok) throw new Error("Failed to delete");
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  })
  .catch((error) => console.error("Error:", error));
  }

  function addnew(quest){
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quest)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setQuestions((prev) => [...prev, data]);
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(()=>{
   fetch("http://localhost:4000/questions")
   .then((res)=>res.json())
   .then((data)=>{
    console.log(data);
    setQuestions(data);
   })
  },[])


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={addnew}/> : <QuestionList questions={questions} onRemove={handleDetele}/>}
    </main>
  );
}

export default App;
