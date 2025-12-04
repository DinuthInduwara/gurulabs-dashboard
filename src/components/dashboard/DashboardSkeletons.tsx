import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Past Paper Card Skeleton - spans 2 cols */}
      <div className="lg:col-span-2 rounded-[2rem] p-6 md:p-8 min-h-[280px] bg-muted/50">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-end justify-between">
            <Skeleton className="h-12 w-32 rounded-2xl" />
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Time Spent Card Skeleton */}
      <div className="rounded-[2rem] p-6 min-h-[200px] bg-muted/50">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-28 mb-6" />
        <Skeleton className="h-10 w-16 mb-4" />
        <div className="flex items-end gap-2 h-16">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="flex-1 rounded-t-lg" style={{ height: `${30 + Math.random() * 40}%` }} />
          ))}
        </div>
      </div>

      {/* Accuracy Card Skeleton */}
      <div className="rounded-[2rem] p-6 min-h-[200px] bg-muted/50">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-28 mb-6" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
      </div>

      {/* Upcoming Exams Skeleton - spans 2 cols */}
      <div className="lg:col-span-2 rounded-[2rem] p-6 min-h-[280px] bg-muted/50">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Premium Card Skeleton */}
      <div className="rounded-[2rem] p-6 min-h-[200px] bg-muted/50">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>

      {/* Quick Stats Skeleton */}
      <div className="rounded-[2rem] p-6 min-h-[200px] bg-muted/50">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-28 mb-8" />
        <div className="flex items-end justify-between mb-4">
          <Skeleton className="h-10 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
};
