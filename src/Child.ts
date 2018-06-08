import { Options } from "./Options";
import { Parent } from "./Parent";

export class Child extends Parent
{
   constructor (name: string)
   {
      super ("1", name, new Options ());
   }
}
