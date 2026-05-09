import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice.js";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(5);

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Redux Toolkit counter</p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Count: {count}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(decrement())}
            className="rounded-full bg-slate-100 px-4 py-2 text-slate-900 transition hover:bg-slate-200"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => dispatch(increment())}
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block text-sm font-medium text-slate-600">
          Increment by amount
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
        <button
          type="button"
          onClick={() => dispatch(incrementByAmount(amount))}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
        >
          Add amount
        </button>
      </div>

      <p className="text-sm leading-6 text-slate-500">
        The store is configured in{" "}
        <code className="rounded bg-slate-100 px-2 py-0.5">
          src/app/store.js
        </code>{" "}
        and the slice lives in{" "}
        <code className="rounded bg-slate-100 px-2 py-0.5">
          src/features/counter/counterSlice.js
        </code>
        .
      </p>
    </section>
  );
}

export default Counter;
