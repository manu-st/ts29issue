import { configure } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Child } from "./Child";

configure ({ enforceActions: true });

export interface IAppProps
{
   store?: Child;
}

@observer
export class App extends React.Component<IAppProps, {}>
{
   render ()
   {
      const store = this.props.store;
      if (store)
      {
         console.log (store.options);
      }

      return (
         <div>
               I'm here with
         </div>
      );
   }
}
