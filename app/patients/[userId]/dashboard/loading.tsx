const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="h-10 w-44 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="space-y-5 pb-24 md:pb-8">
          <div className="h-44 animate-pulse rounded-2xl bg-slate-200" />

          <section className="space-y-3">
            <div className="h-6 w-28 animate-pulse rounded bg-slate-200" />
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`filter-skeleton-${index}`}
                  className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-slate-200"
                />
              ))}
            </div>

            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`card-skeleton-${index}`}
                className="h-44 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardLoading;
