function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image || product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="line-clamp-2 text-xl font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-2 max-h-20 overflow-hidden text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
          <span className="rounded-2xl bg-slate-100 px-3 py-2">Category: {product.category}</span>
          <span className="rounded-2xl bg-slate-100 px-3 py-2">Price: ${product.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">Rating: {product.rating?.rate ?? 'N/A'}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Stock: {product.rating?.count ?? '—'}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
