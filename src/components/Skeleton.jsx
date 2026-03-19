import './Skeleton.css'

export function ProductSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton-pulse" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-pulse" style={{ width: '40%', height: 12 }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '80%', height: 16, margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div className="skeleton-line skeleton-pulse" style={{ width: '35%', height: 18 }} />
          <div className="skeleton-circle skeleton-pulse" />
        </div>
      </div>
    </div>
  )
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
