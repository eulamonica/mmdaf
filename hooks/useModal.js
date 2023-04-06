import React, { useState, useCallback } from "react";

export default function useModal(closeCallback, openCallback, acceptCallback, cancelCallback, isOpen) {
  const [toggle, setToggle] = useState(isOpen);

  function handleToggle() {
    setToggle(value => !value)
    toggle ? closeCallback() : openCallback()
  }

  const onAcceptCallback = useCallback(() => {
    acceptCallback();
  }, [acceptCallback])

  const onCancelCallback = useCallback(() => {
    cancelCallback();
  }, [cancelCallback])

  return [onCancelCallback, onAcceptCallback, handleToggle, toggle]
}
