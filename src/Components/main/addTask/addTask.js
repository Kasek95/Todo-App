import React, {useEffect, useState} from "react";
import {advancedSchemas} from "../schemas";
import {Form, Formik} from "formik";
import CustomInput from "./CustomInput";
import Task from "./Task";
import "./addTask.scss"
import "./task.scss"

const API_URL = "https://todo-api.coderslab.pl/api";
const API_KEY = "e2044884-0610-4783-ada8-e107b039f785";

const AddTask = () => {
    const [tasks, setTasks] = useState([])




    const newListOfTask = (taskId) => {
        setTasks(prevTasks => {
            return prevTasks.filter(task => {
                return task.id !== taskId
            })
        })
    }


    useEffect(() => {
        fetch(`${API_URL}/tasks`, {
            headers: {
                "Authorization": API_KEY
            }
        }).then(response => {
           return response.json()
        }).then(data => {
            setTasks(data.data)
        })

    }, [tasks]);


    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        fetch(`${API_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY,
            }
        })
            .then(response => response.json())
            .then(data => {
               setTasks(prevTasks => [prevTasks, data.data]);
            })
            .catch(error => {
                console.log(error);
            });
        actions.resetForm()
    }

    if(!tasks) return null
    return (
            <section className={"add_Task"}>

             <section className={"form"}>
                 <h1>New Task</h1>
                 <Formik
                     initialValues={{
                         status: "open",
                         title: "",
                         description: ""
                     }}
                     validationSchema={advancedSchemas}
                     onSubmit={onSubmit}
                 >
                     {({ isSubmitting }) => (
                         <Form>
                             <CustomInput

                                 name={"title"}
                                 type={"text"}
                                 placeholder={"Enter your task tittle!"}
                             />

                             <CustomInput
                                 name={"description"}
                                 type={"text"}
                                 placeholder={"Enter your description"}

                             />
                             <button
                                 className={"button-form"}
                                 disabled={isSubmitting}
                                 type={"submit"}
                             >
                                 Submit
                                 <i className="fa-solid fa-circle-plus"></i>
                             </button>
                         </Form>
                     )}




                 </Formik>
             </section>

                <section className={"task"}>
                    <Task tasks={tasks} setNewTask={newListOfTask}  API_URL={API_URL} API_KEY={API_KEY}/>
                </section>



            </section>

        )

}

export default AddTask;