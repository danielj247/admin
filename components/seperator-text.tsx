interface SeperatorTextProps {
  children: React.ReactNode;
}

export function SeperatorText({ children }: SeperatorTextProps) {
  return (
    <div className="relative mt-3">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  );
}
