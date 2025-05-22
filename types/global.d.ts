import { JSX } from "react";
import type * as mathliveTypes from "mathlive";

type MathMLElemnts = keyof MathMLElementTagNameMap;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.InputHTMLAttributes<mathliveTypes.MathfieldElement> &
          Partial<mathliveTypes.MathfieldElementAttributes>,
        mathliveTypes.MathfieldElement
      >;
      annotation: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      "annotation-xml": React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      maction: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      math: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      merror: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mfrac: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mi: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mmultiscripts: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mn: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mo: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mover: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mpadded: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mphantom: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mprescripts: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mroot: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mrow: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      ms: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mspace: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      msqrt: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mstyle: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      msub: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      msubsup: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      msup: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mtable: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mtd: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mtext: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      mtr: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      munder: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      munderover: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
      semantics: React.DetailedHTMLProps<
        React.HTMLAttributes<MathMLElement>,
        MathMLElement
      >;
    }
  }
}

declare global {
  var MathfieldElement = mathliveTypes.MathfieldElement;
}
