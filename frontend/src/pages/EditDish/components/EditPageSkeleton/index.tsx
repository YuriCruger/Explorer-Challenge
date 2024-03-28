export function EditFormSkeleton() {
  return (
    <div className="flex flex-col gap-10 h-full">
      <div className="relative bg-light-500 animate-pulse py-5 rounded-lg ring-2 ring-dark-100 " />
      <div className="relative bg-light-500 animate-pulse py-5 rounded-lg ring-2 ring-dark-100 " />
      <div className="relative bg-light-500 animate-pulse py-5 rounded-lg ring-2 ring-dark-100 lg:hidden" />
      <div className="relative bg-light-500 animate-pulse py-5 rounded-lg ring-2 ring-dark-100 lg:hidden" />
      <div className="relative bg-light-500 animate-pulse py-5 rounded-lg ring-2 ring-dark-100 lg:hidden" />
      <div className="relative bg-light-500 animate-pulse h-40 rounded-lg ring-2 ring-dark-100 " />
    </div>
  );
}
