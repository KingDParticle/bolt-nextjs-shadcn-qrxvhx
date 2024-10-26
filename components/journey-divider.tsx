export function JourneyDivider() {
  return (
    <div className="mt-16">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-purple-300/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-indigo-950 px-4 text-sm text-purple-300">BEGIN YOUR JOURNEY</span>
        </div>
      </div>
    </div>
  );
}