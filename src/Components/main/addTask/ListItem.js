import React, {useState,useEffect} from "react";


const ListItem = ({element,updateTime,deleteOperations,showSet}) => {
    const [time, setTime] = useState(0)



    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours > 0) {
            return `${hours}H ${minutes}M`
        }

        return `${minutes}M`
    }
    return (
        <li className={"list-item"}>

            <div className={"descriptionBox"}>
                <div>{element.description}</div>
                {element.timeSpent === 0 ? null : <span className={"showTime"}>{toHoursAndMinutes(element.timeSpent)}</span>}
            </div>

            <div className={ "buttons-operation "}>
                <div className={show ? "btn-Operation hide" : "btn-Operation" }>
                    <button onClick={ () => setShow(true)} className={"addTime"}>
                        Add time
                        <i className="fa-solid fa-clock"></i>
                    </button>
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
        )

}

export default ListItem;