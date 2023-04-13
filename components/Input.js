import { IsEmptyObject } from "@/helpers";
import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";


export default function Input({ type, name, placeholder, value, onChange, tooltip, error, isLoading }) {

  const [originalTtype, setOriginalType] = useState(type);


  function setPasswordType(event) {
    event.preventDefault();
    setOriginalType(value => originalTtype === 'text' ? 'password' : 'text');

  }
  function hasError() {
    return error && !IsEmptyObject(error) && error[name].length > 0
  }

  function errorClass() {
    if (hasError())
      return 'input input-bordered input-error w-full max-w-xs'
    return 'input input-bordered w-full max-w-xs'
  }
  return (
    <div className="my-3">
      <div className="form-control w-full max-w-xs tooltip tooltip-bottom " data-tip={tooltip}>
        <label className="label">
          <span className="label-text">{placeholder}</span>
        </label>

        <div className="relative w-full flex justify-end content-center">
          <input
            type={originalTtype}
            name={name}
            placeholder={placeholder}
            value={value[name] || ''}
            onChange={onChange}
            className={errorClass()}
          />
          {isLoading && <progress className="progress progress-primary w-full h-1 absolute"></progress>}
          {
            type === 'password' && (
              <div className="absolute top-4 right-3 cursor-pointer" onClick={setPasswordType}>
                {originalTtype === 'text' ? <IoMdEye size={18} /> : <IoMdEyeOff size={18} />}
              </div>
            )
          }
        </div>
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