import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decreament,
  reset,
  increamentByValue,
} from "../features/counter/counterSlice";

const Counter = () => {
  const [value, setValue] = useState(0);

  const addValue = Number(value) || 0;

  const count = useSelector((state) => state.counter.count);

  const dispatch = useDispatch();

  const resetAll = () => {
    setValue(0);
    dispatch(reset());
  };

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button
          className='btn btn-success'
          onClick={() => dispatch(increment())}
        >
          +
        </button>{" "}
        {"       "}
        <button
          className='btn btn-danger'
          onClick={() => dispatch(decreament())}
        >
          -
        </button>
      </div>
      <div>
        <input
          type='text'
          className='form-control w-25 mx-auto text-center'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />{" "}
        <button
          className='btn btn-success'
          onClick={() => dispatch(increamentByValue(addValue))}
        >
          Increment Value
        </button>{" "}
        <button
          className='btn btn-warning'
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
