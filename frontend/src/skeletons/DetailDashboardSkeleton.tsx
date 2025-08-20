import { Skeleton } from "@/components/ui/skeleton"

export default function DetailDashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Detail Dashboard
        </h1>

        <div className="dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          {/* Image */}
          <Skeleton className="w-full h-[500px]" />

          <div className="p-6 space-y-4">
            {/* Title */}
            <Skeleton className="h-8 w-2/3" />
            {/* Description */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            {/* Grid Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  )
}
