import React, {useState,useEffect} from "react";


const Task = ({tasks}) => {
    const ListOfTasks = tasks
    const [isDisplay, setIsDisplay] = useState(false)
    const [operation, setOperation] = useState()
    const [operations, setOperations] = useState([])

    const addOperation = () => {
        setOperations( prevState => [...prevState, operation])
        setIsDisplay(false)
    }

     if(!ListOfTasks) return null

    return (
        <>
            {ListOfTasks.map((el, index) => (

                <div key={index} className={"task-container"}>
                  <section className={"header-Section"}>
                      <div className={"task-description-Container"}>
                          <h5>{el.title}</h5>
                          {el.description === "" ? null : <h6>{el.description}</h6>}
                      </div>

                      <div className={"buttons-Container"}>
                          <button onClick={() => setIsDisplay(true)} className={"btnAdd-Operation"}>Add Operation <i className="fa-solid fa-circle-plus"></i>
                          </button>
                          <button className={"btn-Finish"}>Finish <i className="fa-solid fa-box-archive"></i></button>
                          <button className={"btn-Delete"}><i className="fa-solid fa-trash"></i></button>
                      </div>
                  </section>
                   <section className={isDisplay ? "addOperation show" : "addOperation"}>
                         <div className={"addContainer"}>
                             <input onChange={ e => setOperation(e.target.value)} value={operation} placeholder={"Operation descriptions"}/>
                             <button onClick={addOperation} className={"add"}>Add<i className="fa-solid fa-circle-plus"></i></button>
                         </div>
                   </section>
                    <ul>
                        {operations.map((el,index) => (
                            <div>{el}</div>
                        ) )}
                    </ul>

                </div>

            ))}
        </>
    )

}

export default Task;