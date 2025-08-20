import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="dark:bg-gray-900 shadow-md rounded-xl overflow-hidden border  p-4"
          >
            {/* Image Skeleton */}
            <Skeleton className="w-full h-48 rounded-lg" />

            <div className="mt-4 space-y-3">
              {/* Title */}
              <Skeleton className="h-6 w-3/4" />
              {/* Description */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              {/* Price */}
              <Skeleton className="h-5 w-1/4" />

              {/* Location */}
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
