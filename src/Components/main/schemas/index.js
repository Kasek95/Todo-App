import * as yup from "yup";


export const advancedSchemas = yup.object().shape({
       title: yup
           .string()
           .min(5, "Tittle must be at least 5 characters long")
           .required("Required"),

});
