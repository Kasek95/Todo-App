import React, {useState,useEffect} from "react";


const SingielTask = ({API_KEY,API_URL,el,deleteItem}) => {

    const [show, setShow] = useState(false)
    const [isDisplay, setIsDisplay] = useState(false)
    const [isDisplay2,setIsDisplay2] = useState(false)
    const [operation, setOperation] =useState()
    const [time, setTime] = useState(0)

    const updateTime = (element) => {
         const operationDescription = {
            timeSpent: time,
            description: element.description
        }
        fetch(`${API_URL}/operations/${element.id}`, {
             headers: {
                 "Authorization": API_KEY,
                 "Content-Type": "application/json",
             },
            method: "PUT",
             body: JSON.stringify(operationDescription)
        }).then(response => {
            if (response.ok) {

            }

            throw Error(`${response.status} - ${response.statusText}`);
        }).catch(error => {
            console.error(error);
        })
        setIsDisplay2(true)
        setShow(false)
        setTime(0)
     }

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
    }


    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours > 0) {
            return `${hours}H ${minutes}M`
        }

        return `${minutes}M`
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
                {el.operations.map((element,index) =>
                    <li key={index} className={"list-item"}>

                        <div className={"descriptionBox"}>
                            <div>{element.description}</div>
                            {element.timeSpent === 0 ? null : <span className={"showTime"}>{toHoursAndMinutes(element.timeSpent)}</span>}
                        </div>

                        <div className={ "buttons-operation "}>
                            <div className={show ? "btn-Operation hide" : "btn-Operation" }>
                                {el.status === "close" ? null : <button onClick={ () => setShow(true)} className={"addTime"}>
                                    Add time
                                    <i className="fa-solid fa-clock"></i>
                                </button>}
                                <button onClick={() => deleteOperations(element.id)} className={"btn-Delete"}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                            <div className={show ?  "save-Container show" :  "save-Container"}>
                                <input onChange={e => setTime(e.target.value)} value={time} type={"number"} placeholder={"Spend time in minutes"}/>
                                <button onClick={() => updateTime(element,time)} className={"saveBtn"}>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                </button>
                                <button onClick={() => setShow(false)} className={"cancel-btn"}><i className="fa-regular fa-x"></i></button>
                            </div>
                        </div>


                    </li>

                    )}


            </ul>

        </div>
    )

}

export default SingielTask;