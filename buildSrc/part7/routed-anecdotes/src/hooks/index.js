import {useState} from "react";

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(value => event.target.value)
  }

  const reset = () => {
    setValue(value => '')
  }

  return {
    props: {
      type,
      onChange,
      value,
    },
    reset
  }
}