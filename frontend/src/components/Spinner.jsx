function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950/90 p-6">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-400 border-t-transparent text-blue-400 animate-spin" />
    </div>
  )
}

export default Spinner
