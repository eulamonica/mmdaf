import React, { useState, useEffect } from "react";

// Renamed the function to useForm (custom hooks should use the "use" prefix)
function useForm(apiUrl, action, initialValues) {

  const filledInitialValues = Object.fromEntries(
    Object.keys(initialValues).map((key) => [key, initialValues[key] !== undefined ? initialValues[key] : ""])
  );


  const [formValues, setFormValues] = useState(filledInitialValues);
  const [errorValues, setErrorValues] = useState({});

  useEffect(() => {
    const initialErrorValues = {};
    for (const key in initialValues) {
      initialErrorValues[key] = [];
    }
    setErrorValues(initialErrorValues);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
      method: action,
      body: JSON.stringify(formValues),
    })
      .then(async (res) => {
        console.log(res);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  return [formValues, errorValues, handleChange, handleSubmit];
}

export default useForm;
