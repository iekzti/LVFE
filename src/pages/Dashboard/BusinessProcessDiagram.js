import axios from "axios";
import Modeler from "bpmn-js/lib/Modeler";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseApi } from "utils/api";

function BusinessProcessDiagram() {
  const containerRef = useRef();
  const downloadLinkRef = useRef(null);
  const [modeler, setModeler] = useState();
  const [file, setFile] = useState();
  const nav = useNavigate();
  const { state } = useLocation();
  const { file: process } = state;

  useEffect(() => {
    if (process) {
      downloadDiagram(process.fileBPMNPath, process.fileBPMNName);
    }
  }, []);

  const downloadDiagram = async (path, fileName) => {
    const endpoint = `${baseApi}/file/get-file`;

    const result = await axios
      .post(
        endpoint,
        {
          path,
          fileName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          responseType: "blob",
        }
      )
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 201) {
      const file = new File([result.data], fileName);
      handleShowBPMNDiagram(file);
    }
  };

  const handleShowBPMNDiagram = (file) => {
    setFile(file);
  };

  const renderDiagram = () => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = async (e) => {
      let xml = e.target.result;
      try {
        await modeler.importXML(xml);
        const canvas = modeler.get("canvas");
        canvas.zoom("fit-viewport", "auto");
      } catch (err) {
        console.log(err);
      }
    };
  };

  const setEncoded = (link, name, data) => {
    var encodedData = encodeURIComponent(data.xml);
    if (data) {
      link.setAttribute(
        "href",
        "data:application/bpmn20-xml;charset=UTF-8," + encodedData
      );
      link.setAttribute("download", name);
    }
  };

  const saveBpmn = () => {
    modeler.saveXML({ format: true }).then((xml, err) => {
      setEncoded(downloadLinkRef.current, "diagram.bpmn", err ? null : xml);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });
    async function defaultModel() {
      setModeler(modeler);
      try {
        // await modeler.importXML(baseXml);
        const canvas = modeler.get("canvas");
        canvas.zoom("fit-viewport", "auto");
      } catch (err) {
        console.log(err);
      }
    }

    defaultModel();
  }, []);

  useEffect(() => {
    file && renderDiagram();
  }, [file]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginRight: "30px",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "3px 3px 3px 3px #c7c7c7",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    </div>
  );
}

export default BusinessProcessDiagram;
