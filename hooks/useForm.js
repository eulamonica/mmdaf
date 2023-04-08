import React, { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import isEqual from 'lodash/isEqual';
import PopUp from "@/components/PopUp";



function useForm(apiUrl, action, initialValues, submitCallback, succesCallback, errorCallback, finishCallback) {

  const onSubmitCallback = useRef();
  const onSuccessCallback = useRef();
  const onErrorCallback = useRef();
  const onFinishedCallback = useRef();
  const prevInitialValuesRef = useRef();

  function filledInitialValues(objectValue) {
    return Object.fromEntries(
      Object.keys(objectValue).map((key) => [key, objectValue[key] !== undefined ? objectValue[key] : ""])
    );
  }

  function emptyObject(objectValue, value) {
    return Object.fromEntries(
      Object.keys(objectValue).map((key) => [key, value])
    );
  }

  const [formValues, setFormValues] = useState(filledInitialValues(initialValues));
  const [errorValues, setErrorValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    prevInitialValuesRef.current = initialValues;
  })
  const prevInitialValues = prevInitialValuesRef.current;

  useEffect(() => {

    function setInitalValuesOnChange() {
      setFormValues(filledInitialValues(initialValues));
    }

    if (!isEqual(prevInitialValues, initialValues)) {
      setInitalValuesOnChange();
    }

  }, [initialValues, prevInitialValues])

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
          setErrorValues(emptyObject(errorValues, []));
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

    if (onFinishedCallback.current) {
      onFinishedCallback.current(formValues)
    }
    setIsLoading(false);
  };

  return [formValues, errorValues, isLoading, handleChange, handleSubmit];
}

export default useForm;
