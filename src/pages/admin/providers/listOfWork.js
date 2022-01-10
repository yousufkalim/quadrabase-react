import React, { useState } from "react";
import DocViewer from "../../../components/DocViewer";

import { getToken } from "../../../utils/Auth";

export default function AddExpense(props) {
  
  const token = getToken();
  const { provider, translate } = props;
  const displayWork = () => {
    if (provider && provider.length > 0) {
      return (
        provider &&
        provider.map(({ providers }) => {
          return providers.map(({ provider: provide, documents }, index) => {
            return (
              <div className="flex py-2 flex-col">
                <div class="p-2 mx-1 text-2xl font-semibold capitalize">
                  {index + 1}. {provide.name}
                </div>
                <hr />
                <div>
                  <div className="py-2">
                    <DocViewer documents={documents} />
                  </div>
                </div>
              </div>
            );
          });
        })
      );
    } else {
      return "no record found";
    }
  };

  return (
    <div className=" -mx-3 mb-2" style={{height: "500px"}}>
      <div className="w-full px-3 mb-6 md:mb-0">
        <div className="h-146 overflow-y-auto border px-10 py-3">
          {displayWork()}
        </div>
      </div>
    </div>
  );

}
