import { Options } from "./Options";

export class Parent
{
   id: string;
   name: string;
   options: Options;

   constructor (id: string, name: string, options: Options)
   {
      this.id = id;
      this.name = name;
      this.options = options;
   }
}
