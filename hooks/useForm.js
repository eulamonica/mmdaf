import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import PopUp from "@/components/PopUp";



function useForm(apiUrl, action, initialValues, submitCallback, succesCallback, errorCallback, finishCallback) {

  const onSubmitCallback = useRef();
  const onSuccessCallback = useRef();
  const onErrorCallback = useRef();
  const onFinishedCallback = useRef();


  const filledInitialValues = Object.fromEntries(
    Object.keys(initialValues).map((key) => [key, initialValues[key] !== undefined ? initialValues[key] : ""])
  );

  const [formValues, setFormValues] = useState(filledInitialValues);
  const [errorValues, setErrorValues] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof submitCallback === "function")
      onSubmitCallback.current = submitCallback
    if (typeof succesCallback === "function")
      onSuccessCallback.current = succesCallback
    if (typeof errorCallback === "function")
      onErrorCallback.current = errorCallback
    if (typeof errorCallback === "function")
      onFinishedCallback.current = finishCallback;

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
    setIsLoading(true);
    e.preventDefault();
    if (onSubmitCallback.current) {
      onSubmitCallback.current(formValues)
    };
    await fetch(apiUrl, {
      headers: { "Content-Type": "application/json" },
      method: action,
      body: JSON.stringify(formValues),
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.success) {
          if (onSuccessCallback.current) {
            onSuccessCallback.current(data);
          }
        } else {
          setErrorValues(data.errors);
          if (onErrorCallback.current) {
            onErrorCallback.current(data.errors);
          }
        }
        if (data.toast) {
          data.toast.forEach(async (message) => {
            toast(<PopUp message={message.message} type={message.type} />, {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT,
              progress: undefined,
              hideProgressBar: true,
              closeButton: false,
            });
          })
        }
      })
      .catch(async (error) => {
        console.log(error);
      });
    setIsLoading(false);
    if (onFinishedCallback.current) {
      onFinishedCallback.current(formValues)
    }

  };

  return [formValues, errorValues, isLoading, handleChange, handleSubmit];
}

export default useForm;
