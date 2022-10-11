import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import home from "../../resources/icons/home.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import setting from "../../resources/icons/setting.svg";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import axios from "axios";
import "./Redesign.css";
import Modeler from "bpmn-js/lib/Modeler";
import { baseApi } from "utils/api";

export default function Redesign() {
  Modal.setAppElement("div");
  const nav = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                Modal confirm                               */
  /* -------------------------------------------------------------------------- */
  const [modalRedesignIsOpen, setRedesignIsOpen] = React.useState(false);
  const [afterBP, setAfterBP] = useState()

  const handleDownloadFile = async (path, fileName) => {
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
        }
      )
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 201) {
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }
  };

  const handleConfirm = async () => {
    await afterModeler.saveXML({ format: true }).then(async (xml, err) => {
      const endpoint = `${baseApi}/business-process/confirm`;
      
      const result = await axios
        .post(endpoint,{
          businessProcessId,
          xml: xml.xml
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
  
      if (result.status === 201) {
        setAfterBP(result.data)
        setRedesignIsOpen(true);
      }
    });
  }
  function closeModalRedesign() {
    setRedesignIsOpen(false);
  }

  const RedesignStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40vw",
      height: "200px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Get BP                                   */
  /* -------------------------------------------------------------------------- */
  const { state } = useLocation();
  const { businessProcessId, algorithm2 } = state;

  const getBusinessProcessDiagrams = async (businessProcessId) => {
    const endpoint = `${baseApi}/business-process/${businessProcessId}`;

    const result = await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      const { fileBPMNPath, fileBPMNAfterMovePath, fileBPMNName } = result.data;
      downloadBeforeDiagram(fileBPMNPath, fileBPMNName);
      downloadAfterDiagram(fileBPMNAfterMovePath, fileBPMNName);
    }
  };

  useEffect(() => {
    if (businessProcessId) {
      getBusinessProcessDiagrams(businessProcessId);
    }
  }, []);

  const handleDownloadBPAfterProcess = async () => {
    if (afterBP) {
      handleDownloadFile(afterBP.fileBPMNPath, afterBP.fileBPMNName)
      handleDownloadFile(afterBP.fileTaskPath, afterBP.fileTaskName)
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                             For before diagram                             */
  /* -------------------------------------------------------------------------- */
  const beforeDesignRef = useRef();
  const beforeDownloadLinkRef = useRef();
  const [beforeDiagram, setBeforeDiagram] = useState();
  const [beforeModeler, setBeforeModeler] = useState();

  const downloadAfterDiagram = async (path, fileName) => {
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
      setAfterDiagram(file);
    }
  };

  const renderBeforeDiagram = () => {
    const reader = new FileReader();
    reader.readAsText(beforeDiagram);
    reader.onloadend = async (e) => {
      let xml = e.target.result;
      try {
        await beforeModeler.importXML(xml);
        const canvas = beforeModeler.get("canvas");
        canvas.zoom("fit-viewport", "auto");
      } catch (err) {
        console.log(err);
      }
    };
  };

  const setBeforeEncoded = (link, name, data) => {
    var encodedData = encodeURIComponent(data.xml);
    if (data) {
      link.setAttribute(
        "href",
        "data:application/bpmn20-xml;charset=UTF-8," + encodedData
      );
      link.setAttribute("download", name);
    }
  };

  const saveBeforeBpmn = () => {
    beforeModeler.saveXML({ format: true }).then((xml, err) => {
      setBeforeEncoded(
        beforeDownloadLinkRef.current,
        "diagram.bpmn",
        err ? null : xml
      );
    });
  };

  useEffect(() => {
    const container = beforeDesignRef.current;
    const modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });
    async function defaultModel() {
      setBeforeModeler(modeler);
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
    beforeDiagram && renderBeforeDiagram();
  }, [beforeDiagram]);

  /* -------------------------------------------------------------------------- */
  /*                              For after diagram                             */
  /* -------------------------------------------------------------------------- */
  const afterDesignRef = useRef();
  const afterDownloadLinkRef = useRef();
  const [afterDiagram, setAfterDiagram] = useState();
  const [afterModeler, setAfterModeler] = useState();

  const downloadBeforeDiagram = async (path, fileName) => {
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
      setBeforeDiagram(file);
    }
  };

  const renderAfterDiagram = () => {
    const reader = new FileReader();
    reader.readAsText(afterDiagram);
    reader.onloadend = async (e) => {
      let xml = e.target.result;
      try {
        await afterModeler.importXML(xml);
        const canvas = afterModeler.get("canvas");
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
    afterModeler.saveXML({ format: true }).then((xml, err) => {
      setEncoded(
        afterDownloadLinkRef.current,
        "diagram.bpmn",
        err ? null : xml
      );
    });
  };

  useEffect(() => {
    const container = afterDesignRef.current;
    const modeler = new Modeler({
      container,
      keyboard: {
        bindTo: document,
      },
    });
    async function defaultModel() {
      setAfterModeler(modeler);
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
    afterDiagram && renderAfterDiagram();
  }, [afterDiagram]);

  return (
    <div className="row">
      <Modal
        isOpen={modalRedesignIsOpen}
        onRequestClose={closeModalRedesign}
        style={RedesignStyles}
        appElement={document.getElementById("app")}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalRedesign();
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Tái thiết kế quy trình thành công. Bạn có muốn tải lược đồ quy trình
            không?
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              style={{
                background: "#168414",
                width: "180px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "50px",
              }}
              variant=""
              onClick={() => {
                handleDownloadBPAfterProcess();
              }}
            >
              <span style={{ width: 10 }}></span>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                Tải xuống
              </div>
            </Button>
            <Button
              style={{
                background: "#FF4651",
                width: "200px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant=""
              onClick={() => {
                nav("/dashboardUser");
              }}
            >
              <span style={{ width: 10 }}></span>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                Về Dashboard
              </div>
            </Button>
          </div>
        </div>
      </Modal>
      {/* -------------------------------------------------------------------------- */
      /*                                   Drawer                                   */
      /* -------------------------------------------------------------------------- */}
      <div
        className="col-2"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="border-end bg-white"
          id="sidebar-wrapper"
          style={{ height: "100%" }}
        >
          <h1 className="text-center">Logo</h1>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/home");
              }}
            >
              <img
                src={home}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Home
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={dashboard}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Dashboard
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <img
                src={redesign}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Redesign
            </a>
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={setting}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              Setting
            </a>
          </div>
        </div>
      </div>
      <div className="col-10 bg-light">
        <div className="row p-4 ms-4 p-4 m-0 p-0 ">
          <div className="d-flex justify-content-end mb-4">
            <DropdownButton
              className="text-center "
              style={{ "justify-content": "center", "align-items": "center" }}
              items={["Profile", "Logout"]}
              itemStart={profile}
              icons_list={[profile, logout_icon]}
              onClick={(item, index) => {
                if (index === 0) {
                  nav("/profile");
                }
                if (index === 1) {
                  localStorage.removeItem("access_token");
                  nav("/login");
                }
              }}
            />
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                Before design                               */
          /* -------------------------------------------------------------------------- */}
          <div
            className="mt-3 text-center"
            style={{
              paddingLeft: "5px",

              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Quy trình trước khi tái thiết kế
            </div>
            <div
              ref={beforeDesignRef}
              style={{
                width: "100%",
                marginTop: "10px",
                height: "500px",
                boxShadow:
                  "0 6px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: 10,
              }}
            />
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                 Description                                */
          /* -------------------------------------------------------------------------- */}
          <div
            style={{
              width: "100%",
              height: 300,
              marginTop: 20,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: 10,
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 28, color: "#20297C" }}>
              Description:
            </div>
            <div>
              <dl>
                <dt>Giải thuật 1</dt>
                <dd>
                  - Tác vụ tích hợp mô hình phân lớp: {algorithm2?.indexNameAlg1}
                </dd>
                <dd>- Tác vụ bị bị loại bỏ khỏi quy trình (Viền đỏ): {algorithm2?.listNameToRemove}</dd>
                <dt>Giải thuật 2</dt>
                <dd>- Tác vụ tích hợp mô hình phân lớp: {algorithm2?.indexNameAlg2}</dd>
                <dd>- Vị trí tác vụ có thể dời liền sau (Viền xanh lam): {algorithm2?.parentName}</dd>
                <dd>
                  - Tác vụ bị thay đổi vị trí (Viền xanh lá): {algorithm2?.childName}
                </dd>
              </dl>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                              After description                             */
          /* -------------------------------------------------------------------------- */}
          <div
            className="mt-3 text-center"
            style={{
              paddingLeft: "5px",
              paddingBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Quy trình sau khi tái thiết kế
            </div>
            <div
              ref={afterDesignRef}
              style={{
                width: "100%",
                marginTop: "10px",
                height: "500px",
                boxShadow:
                  "0 6px 20px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: 10,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                background: "#8AECE5",
                width: 200,
                height: 70,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                handleConfirm();
              }}
              variant=""
            >
              <img src={redesign} height="30px" width="30px" />
              <span style={{ width: 10 }}></span>
              <div
                style={{ fontSize: 28, fontWeight: "bold", color: "#20297C" }}
              >
                Confirm
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
