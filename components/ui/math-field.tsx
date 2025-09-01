"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import "mathlive";
import "mathlive/fonts.css";
import "mathlive/static.css";
import { MathfieldElement } from "mathlive";

function MathField({
  className,
  ...props
}: React.ComponentProps<"math-field">) {
  const innerId = React.useId();

  const id = props.id || innerId;

  React.useEffect(() => {
    const ml = document.getElementById(id) as MathfieldElement;
    ml.keybindings = [
      ...ml.keybindings,
      {
        key: "[Insert]",
        ifMode: "math",
        command: ["switchMode", "text"],
      },
      {
        key: "[Insert]",
        ifMode: "text",
        command: ["switchMode", "math"],
      },
    ];
  }, [id]);
  return (
    <math-field
      className={cn("min-w-60 border shadow rounded-md", className)}
      tabIndex={0}
      contentEditable
      {...props}
      id={id}
    ></math-field>
  );
}

export { MathField };
