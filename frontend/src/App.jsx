import Counter from "./features/counter/Counter.jsx";
import "./App.css";

function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 bg-slate-50 px-6 py-10 text-slate-900">
      <section className="space-y-4 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/70">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Redux Toolkit + Axios starter
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          This project now includes Redux Toolkit and a reusable Axios client.
          Use the counter below as a scaffold for your own feature slices.
        </p>
      </section>

      <Counter />
    </main>
  );
}

export default App;
