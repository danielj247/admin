import { cn } from "@/lib/utils";

export interface TypographyProps<T> extends React.HTMLProps<T> {
  className?: string;
  children: React.ReactNode;
}

export function TypographyH1({ className, children, ...props }: TypographyProps<HTMLHeadingElement>) {
  return (
    <h1 {...props} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
}

export function TypographyH2({ className, children, ...props }: TypographyProps<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ className, children, ...props }: TypographyProps<HTMLHeadingElement>) {
  return (
    <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function TypographyH4({ className, children, ...props }: TypographyProps<HTMLHeadingElement>) {
  return (
    <h4 {...props} className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  );
}

export function TypographyP({ className, children, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function TypographyLarge({ className, children, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <div {...props} className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  );
}

export function TypographySmall({ className, children, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <small {...props} className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function TypographyMuted({ className, children, ...props }: TypographyProps<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}
