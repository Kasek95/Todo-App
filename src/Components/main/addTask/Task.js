import React, {useState,useEffect} from "react";


const Task = ({tasks, API_URL,API_KEY, setNewTask}) => {

    const [isDisplay, setIsDisplay] = useState(false)
    const [operation, setOperation] = useState()
    const [operations, setOperations] = useState([])
    const [show, setShow] = useState(false)


    const deleteItem = (taskId) => {
        fetch(`${API_URL}/tasks/${taskId}`, {
            headers: {
                "Authorization": API_KEY
            },
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
               setNewTask(taskId)
            }

            throw Error(`${response.status} - ${response.statusText}`);
        }).catch(error => {
            console.error(error);
        })
    }


    const addOperation = (taskId) => {

        const descriptionOperation = {
            description: operation,
            timeSpent: 0
        }
        setOperations( prevState => [...prevState, operation])
        setIsDisplay(false)
        fetch(`${API_URL}/tasks/${taskId}/operations`, {
            method: "POST",
            body: JSON.stringify(descriptionOperation),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY,
            }
        })
            .then(response => response.json())
            .then(data => {
               console.log(data)
            })
            .catch(error => {
                console.log(error);
            });
    }


     if(!tasks) return null

    return (
        <>
            {tasks.map((el) => (

                <div key={el.id} className={"task-container"}>
                  <section className={"header-Section"}>
                      <div className={"task-description-Container"}>
                          <h5>{el.title}</h5>
                          {el.description === "" ? null : <h6>{el.description}</h6>}
                      </div>

                      <div className={"buttons-Container"}>
                          <button onClick={() => setIsDisplay(true)} className={"btnAdd-Operation"}>Add Operation <i className="fa-solid fa-circle-plus"></i>
                          </button>
                          <button className={"btn-Finish"}>Finish <i className="fa-solid fa-box-archive"></i></button>
                          <button onClick={() => deleteItem(el.id)}  className={"btn-Delete"}><i className="fa-solid fa-trash"></i></button>
                      </div>
                  </section>
                   <section className={isDisplay ? "addOperation show" : "addOperation"}>
                         <div className={"addContainer"}>
                             <input onChange={ e => setOperation(e.target.value)} value={operation} placeholder={"Operation descriptions"}/>
                             <button type={operation < 5 ? "disabled" : null} onClick={() => addOperation(el.id)} className={"add"}>Add<i className="fa-solid fa-circle-plus"></i></button>
                         </div>
                   </section>
                    <ul>
                        {operations.map((el,index) => (
                            <li className={"list-item"} key={index}>

                                <div className={"descriptionBox"}>
                                    <div>{el}</div>
                                    <span>1h 20m</span>
                                </div>

                                <div className={ "buttons-operation "}>
                                    <div className={show ? "btn-Operation hide" : "btn-Operation" }>
                                        <button onClick={ () => setShow(true)} className={"addTime"}>
                                            Add time
                                            <i className="fa-solid fa-clock"></i>
                                        </button>
                                        <button className={"btn-Delete"}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                    <div className={show ?  "save-Container show" :  "save-Container"}>
                                        <input type={"number"} placeholder={"Spend time in minutes"}/>
                                        <button className={"saveBtn"}>
                                            <i className="fa-solid fa-floppy-disk"></i>
                                        </button>
                                        <button onClick={() => setShow(false)} className={"cancel-btn"}><i className="fa-regular fa-x"></i></button>
                                    </div>
                                </div>


                            </li>
                        ) )}
                    </ul>

                </div>

            ))}
        </>
    )

}

export default Task;