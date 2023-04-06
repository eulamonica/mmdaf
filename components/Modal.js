import React from 'react';

export default function Modal({ title, subtitle, cancelText, okText, children, accept, toggle, cancel, opened, isLoading }) {

  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  function handleOk(e) {
    e.preventDefault();
    accept();
  }

  function handleToggle(e) {
    e.preventDefault();
    toggle();
  }

  if (opened == false) {
    return <></>
  }


  return (
    <>
      <div className='w-full h-screen flex justify-center content-center items-center left-0 top-0 z-50 absolute overflow-x-hidden'>
        <div className="card w-96  bg-base-100 shadow-xl z-50 mb-16">
          <div className="card-body">
            {isLoading ? <progress className="progress progress-accent w-full absolute left-0 bottom-0"></progress> : ''}
            <div className="card-actions justify-end">
              <button className="btn btn-square btn-sm" onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <h2 className="card-title">{title}</h2>
            <p>{subtitle}</p>
            {children}
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleCancel}>{cancelText || 'CANCEL'}</button>
              <button className="btn btn-primary" onClick={handleOk} disabled={isLoading}>{okText || 'OK'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-black w-full h-screen overflow-hidden fixed top-0 left-0 z-40 opacity-50' />
    </>
  )
}