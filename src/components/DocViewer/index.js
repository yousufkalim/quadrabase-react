import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { faForward, faBackward, faTrash } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
export default function index(props) {
  const { documents } = props;
  return (
    <div>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={documents}
        config={{
          header: {
            // disableHeader: false,
            // disableFileName: true,
            // retainURLParams: false,
            overrideComponent: myHeader,
          },
        }}
        style={{
          height: props.height ? props.height : 400,
          overflow: "scroll",
          backgroundColor: "#f9f9f9",
        }}
      />
    </div>
  );
}

const myHeader = (state, previousDocument, nextDocument) => {
  if (!state.currentDocument || state.config?.header?.disableFileName) {
    return null;
  }

  return (
    <>
      <div className="flex pb-2 px-3 py-2 items-end justify-end">
        <div className="flex flex-nowrap justify-end w-full md:w-3/12">
          <div className="  ">
            <FontAwesomeIcon icon={faBackward} onClick={previousDocument} disabled={state.currentFileNo === 0} />
          </div>
          <div className="   ">
            <FontAwesomeIcon
              icon={faForward}
              onClick={nextDocument}
              disabled={state.currentFileNo >= state.documents.length - 1}
            />
          </div>
        </div>
      </div>
    </>
  );
};
