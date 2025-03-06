import React, { createContext, useCallback, useState } from "react";

export const FormContext = createContext({});

export const FormProvider = ({
  onSubmit,
  initValues,
  children,
  validate = true,
}) => {
  const [values, setValues] = useState(initValues || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values); // values를 dispatch하는 함수

    // input 비우기
    const formElements = e.target.elements;
    const newValues = { ...values };

    for (let element of formElements) {
      if (element.tagName === "INPUT" && element.type !== "submit") {
        newValues[element.name] = "";
      }
    }
    setValues(newValues);
  };

  // Context의 value에 값 추가
  const updateValues = useCallback(
    (name, updatedValue) => {
      setValues((prevValues) => {
        const newValues = {
          ...prevValues,
          [name]: updatedValue,
        };
        return newValues;
      });
    },
    [validate]
  );

  // value 비우기
  const reset = useCallback(() => {
    setValues(initValues);
  }, []);

  return (
    <FormContext.Provider value={{ values, updateValues, reset }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default FormProvider;
