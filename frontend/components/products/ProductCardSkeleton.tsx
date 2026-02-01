export function ProductCardSkeleton() {
  return (
    <div className="bg-pink-50 rounded-2xl p-6 space-y-4 animate-pulse">
      {/* Image */}
      <div className="h-48 bg-gray-200 rounded-xl" />

      {/* Title */}
      <div className="h-5 bg-gray-300 rounded w-3/4" />

      {/* Category */}
      <div className="h-4 bg-gray-200 rounded w-1/2" />

      {/* Price */}
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>

      {/* Stock */}
      <div className="h-4 bg-gray-200 rounded w-16" />

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded-lg w-full" />
    </div>
  );
}
