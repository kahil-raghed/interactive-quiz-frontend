"use client";

import { useId, useMemo } from "react";
import { cn } from "../../lib/utils";
import { convertLatexToMarkup } from "mathlive";

export function MathElement({
  id: propsId,
  math,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { math?: string }) {
  const innerId = useId();

  const id = propsId || innerId;

  const mathMarkup = useMemo(
    () => convertLatexToMarkup(math ?? "", {}),
    [math]
  );

  return (
    <div
      id={id}
      className={cn("text-2xl", className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: mathMarkup }}
    />
  );
}
