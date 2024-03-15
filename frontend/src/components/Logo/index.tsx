export function Logo() {
  return (
    <div className="flex items-center w-full gap-5">
      <img
        src="/polygon.png"
        alt="food explorer logo"
        className="h-[36px] xl:h-[48px]"
      />
      <h1 className="text-light-100 font-bold text-4xl xl:text-5xl">
        food explorer
      </h1>
    </div>
  );
}
