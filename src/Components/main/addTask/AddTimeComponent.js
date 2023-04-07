import React, {useState} from "react";


const AddTimeComponent = ({element,el,deleteOperations,API_URL,API_KEY}) => {
    const [timer,setTimer] = useState(0)
    const [show, setShow] = useState(false)

    const updateTime = (element) => {
        const operationDescription = {
            timeSpent: timer,
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
        setShow(false)
        setTimer(0)
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
        <li key={element.id} className={"list-item"}>

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
                    <input onChange={e => setTimer(e.target.value)} value={timer} type={"number"} placeholder={"Spend time in minutes"}/>
                    <button onClick={() => updateTime(element)} className={"saveBtn"}>
                        <i className="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button onClick={() => setShow(false)} className={"cancel-btn"}><i className="fa-regular fa-x"></i></button>
                </div>
            </div>

        </li>
    )

}

export default AddTimeComponent;
