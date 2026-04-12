const AppointmentDetailLoading = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="h-10 w-44 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-9 w-28 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-7">
        <div className="space-y-4">
          <div className="h-44 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-52 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </main>
    </div>
  );
};

export default AppointmentDetailLoading;
