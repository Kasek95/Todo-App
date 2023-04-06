import React, {useState,useEffect} from "react";

import SingielTask from "./SingielTask";


const Task = ({tasks, API_URL,API_KEY, setNewTask}) => {

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

    if(!tasks) return null

    return (
        <>
            {tasks.map((el) =>
                <SingielTask
                    API_URL={API_URL}
                    API_KEY={API_KEY}
                    deleteItem={deleteItem}
                    el={el}
                />
            )}
        </>
    )

}

export default Task;
