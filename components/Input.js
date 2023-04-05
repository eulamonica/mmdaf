import { IsEmptyObject } from "@/helpers";
import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";



export default function Input({ text, name, placeholder, value, onChange, tooltip, error }) {

  function hasError() {
    return !IsEmptyObject(error) && error[name].length > 0
  }


  function errorClass() {
    if (hasError())
      return 'input input-bordered input-error w-full max-w-xs'
    return 'input input-bordered w-full max-w-xs'
  }
  return (
    <div className="my-3">
      <div className="form-control w-full max-w-xs tooltip tooltip-bottom" data-tip={tooltip}>
        <label className="label">
          <span className="label-text">{placeholder}</span>
        </label>
        <input
          type={text}
          name={name}
          placeholder={placeholder}
          value={value[name] || ''}
          onChange={onChange}
          className={errorClass()}
        />
        {
          hasError() &&
          <label className="mb-5">
            {error[name]?.map((value, idx) => {
              return (
                <div key={idx}>
                  <span className="text-xs text-error text-left">- {value}</span>
                </div>
              )
            })}
          </label>
        }
      </div >
    </div >
  )
}