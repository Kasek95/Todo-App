import React, {useState} from "react";
import AddTimeComponent from "./AddTimeComponent";


const SingielTask = ({API_KEY,API_URL,el,deleteItem}) => {


    const [isDisplay, setIsDisplay] = useState(false)
    const [operation, setOperation] =useState()





    const deleteOperations = (operationId) => {
        fetch(`${API_URL}/operations/${operationId}`, {
            headers: {
                "Authorization": API_KEY
            },
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
               console.log(response)
            }

            throw Error(`${response.status} - ${response.statusText}`);
        }).catch(error => {
            console.error(error);
        })
    }


    const updateStatus = (taskId, taskTitle,taskDescription) => {
         const status = {
             title: taskTitle,
             description: taskDescription,
             status: "close"
         }

        fetch(`${API_URL}/tasks/${taskId}`, {

            headers: {
                "Authorization": API_KEY,
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(status)
        })
            .then(r => r.json())
            .then(data => {
                   console.log(data)
            })
            .catch(err => console.log(err));
    }

    const addOperation = (taskId) => {
        const descriptionOperation = {
            description: operation,
            timeSpent: 0
        }
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
         setOperation("")
    }




    return (
        <div key={el.id} className={"task-container"}>
            <section className={"header-Section"}>
                <div className={"task-description-Container"}>
                    <h5>{el.title}</h5>
                    {el.description === "" ? null : <h6>{el.description}</h6>}
                </div>

                <div className={"buttons-Container"}>
                    {el.status === "close" ? null : <button onClick={() => setIsDisplay(true)} className={"btnAdd-Operation"}>Add Operation <i className="fa-solid fa-circle-plus"></i>
                    </button>}
                    {el.status === "close" ? null :  <button onClick={() => updateStatus(el.id, el.title, el.description)} className={"btn-Finish"}>Finish <i className="fa-solid fa-box-archive"></i></button>}
                    <button onClick={() => deleteItem(el.id)}  className={"btn-Delete"}><i className="fa-solid fa-trash"></i></button>
                </div>
            </section>
            <section className={isDisplay ? "addOperation show" : "addOperation"}>
                <div className={"addContainer"}>
                    <input onChange={e => setOperation(e.target.value)} value={operation} placeholder={"Operation descriptions"}/>
                    <button  onClick={()=> addOperation(el.id)}  className={"add"}>Add<i className="fa-solid fa-circle-plus"></i></button>
                </div>
            </section>
            <ul>
                {el.operations === undefined ? null : el.operations.map((element) =>
                        <AddTimeComponent
                            el={el}
                            element={element}
                            API_URL={API_URL}
                            API_KEY={API_KEY}
                            deleteOperations={deleteOperations}
                        />

                    )}


            </ul>

        </div>
    )

}

export default SingielTask;