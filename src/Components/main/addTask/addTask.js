import React, {useState,useEffect} from "react";
import {advancedSchemas} from "../schemas";
import {Form, Formik} from "formik";
import CustomInput from "./CustomInput";
import "./addTask.scss"


const AddTask = () => {
      const [task, setTask] = useState([])


      const onSubmit = async (values,actions) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setTask(prevTask => [...prevTask, values
           ])
          actions.resetForm()
      }


        return (
            <section className={"add_Task"}>

             <section className={"form"}>
                 <h1>New Task</h1>
                 <Formik
                     initialValues={{
                         tittle: "",
                         description: ""
                     }}
                     validationSchema={advancedSchemas}
                     onSubmit={onSubmit}
                 >
                     {({ isSubmitting }) => (
                         <Form>
                             <CustomInput

                                 name={"tittle"}
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

            </section>

        )

}

export default AddTask;