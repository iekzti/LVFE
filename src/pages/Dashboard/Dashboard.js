import Modeler from "bpmn-js/lib/Modeler";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import ImportButton from "../../components/ImportButton";
import dashboard from "../../resources/icons/dashboard.svg";
import gg_file from "../../resources/icons/gg_file.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import setting from "../../resources/icons/setting.svg";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";
import axios from "axios";
import BusinessProcessForm from "components/BusinessProcessForm";
import BusinessRuleForm from "components/BusinessRuleForm";
import ClassificationRuleForm from "components/ClassificationRuleForm";
import { baseApi } from "utils/api";

export default function Dashboard() {
  const inputFileProcess = useRef(null);
  const inputFileBusinessRule = useRef(null);
  const inputFileClassificationRule = useRef(null);
  const nav = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                          Get list business process                         */
  /* -------------------------------------------------------------------------- */
  const [listBusinessProcesses, setListBusinessProcesses] = useState([]);
  const [isShowBPModal, setIsShowBPModal] = useState(false);
  const [selectedBP, setSelectedBP] = useState();

  const getAllBPs = async () => {
    const endpoint = `${baseApi}/business-process`;

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
      setListBusinessProcesses(result.data);
    }
  };

  useEffect(() => {
    getAllBPs();
  }, []);

  const handleRedesign = async () => {
    if (!selectedBP) return alert("Select Business Process");
    if (selectedCRsId.length !== 2) return alert("Select Classification Cule");
    if (!listBusinessRules.find((br) => br.businessProcessId === selectedBP.id))
      return alert("Add Business Rule for this Business Process");

    const endpoint = `${baseApi}/business-process/run-algorithm2`;

    const result = await axios
      .post(
        endpoint,
        {
          businessProcessId: selectedBP.id,
          classificationRule1Id: selectedCRsId[0],
          classificationRule2Id: selectedCRsId[1],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 201) {
      // alert(`Result: ${JSON.stringify(result.data)}`);
      console.log("🚀 ~ file: Dashboard.js ~ line 88 ~ handleRedesign ~ selectedBP.id", selectedBP.id)
      nav("/redesign", {
        state: { businessProcessId: selectedBP.id, algorithm2: result.data },
      });
    }

  };

  /* -------------------------------------------------------------------------- */
  /*                             Classification Rule form                       */
  /* -------------------------------------------------------------------------- */
  const [isShowCRModal, setIsShowCRModal] = useState(false);
  const [listCRs, setCRs] = useState([]);
  const [selectedCRsId, setSelectedCRsId] = useState([]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: Dashboard.js ~ line 66 ~ Dashboard ~ selectedCRsId",
      selectedCRsId
    );
  }, [selectedCRsId]);

  const handleSelectClassification = (crId) => {
    if (selectedCRsId.includes(crId)) {
      setSelectedCRsId((prev) => prev.filter((c) => c !== crId));
    } else {
      setSelectedCRsId((prev) => [...prev, crId]);
    }
  };

  const getAllCRs = async () => {
    const endpoint = `${baseApi}/classification-rule`;

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
      setCRs(result.data);
    }
  };

  useEffect(() => {
    getAllCRs();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                Business Rule                               */
  /* -------------------------------------------------------------------------- */
  const [isShowBRModal, setIsShowBRModal] = useState(false);
  const [listBusinessRules, setListBusinessRules] = useState([]);

  const getBRs = async () => {
    const endpoint = `${baseApi}/business-rule`;

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
      setListBusinessRules(result.data);
    }
  };

  useEffect(() => {
    getBRs()
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                    Handle show business process diagram                   */
  /* -------------------------------------------------------------------------- */
  const containerRef = useRef(null);
  const downloadLinkRef = useRef(null);
  const [modeler, setModeler] = useState();
  const [file, setFile] = useState();

  const handleClickBusinessProcess = async (bp) => {
    const endpoint = `${baseApi}/file/get-file`;

    const result = await axios
      .post(
        endpoint,
        {
          path: bp.fileBPMNPath,
          fileName: bp.fileBPMNName,
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
      const file = new File([result.data], bp.fileBPMNName);
      handleShowBPMNDiagram(file);
      setSelectedBP(bp);
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
    async function defailtModel() {
      setModeler(modeler);
      try {
        // await modeler.importXML(baseXml);
        const canvas = modeler.get("canvas");
        canvas.zoom("fit-viewport", "auto");
      } catch (err) {
        console.log(err);
      }
    }

    defailtModel();
  }, []);

  useEffect(() => {
    file && renderDiagram();
  }, [file]);
  /* ---------------------- End handle show bpmn diagram ---------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  For login                                 */
  /* -------------------------------------------------------------------------- */
  const checkLogin = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) nav("/login");
  };

  useEffect(() => {
    checkLogin();
  }, []);
  /* ------------------------------------ - ----------------------------------- */

  return (
    <div className="row">
      <BusinessProcessForm
        isShow={isShowBPModal}
        onClose={() => {
          setIsShowBPModal(false);
          getAllBPs();
        }}
      />

      <ClassificationRuleForm
        isShow={isShowCRModal}
        onClose={() => {
          setIsShowCRModal(false);
          getAllCRs();
        }}
      />

      <BusinessRuleForm
        isShow={isShowBRModal}
        onClose={() => {
          setIsShowBRModal(false);
          getBRs();
        }}
        BPs={listBusinessProcesses}
      />
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
          class="border-end bg-white"
          id="sidebar-wrapper"
          style={{ height: "100%" }}
        >
          <h1 className="text-center">Logo</h1>
          <div class="list-group list-group-flush">
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                nav("/dashboardUser");
              }}
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
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#8AECE5",
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
              // href="#!"
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
      {/* -------------------------------------------------------------------------- */
      /*                                   Content                                  */
      /* -------------------------------------------------------------------------- */}
      <div className="col-10" style={{ backgroundColor: "white" }}>
        <div className="row  ms-4 p-4 m-0 p-0 ">
          {/* -------------------------------- User Name ------------------------------- */}
          <div className="d-flex justify-content-end mb-4" shouldFitContainer>
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

          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 0,
              padding: 0,
            }}
          >
            {/* ----------------------- Add Business Process Button ---------------------- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                padding: 0,
                margin: 0,
              }}
            >
              <input
                type={"file"}
                id={"jsonFileInput"}
                ref={inputFileProcess}
                style={{ display: "none" }}
              />
              <ImportButton
                style={{ backgroundColor: "white" }}
                text="Add Business Process"
                image={gg_file}
                onClick={() => {
                  setIsShowBPModal(true);
                }}
              />
            </div>
            {/* --------------------- Add Classification Rule Button --------------------- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                padding: 0,
                margin: 0,
              }}
            >
              <input
                ref={inputFileClassificationRule}
                style={{
                  display: "none",
                }}
                type="file"
                multiple
              />
              <ImportButton
                text="Add Classification Rule"
                image={gg_file}
                onClick={() => {
                  setIsShowCRModal(true);
                }}
              />
            </div>
            {/* ---------------------------- Add Business Rule --------------------------- */}
            <div
              style={{
                width: "30%",
                padding: 0,
                backgroundColor: "yellow",
              }}
            >
              <input
                ref={inputFileBusinessRule}
                style={{ display: "none" }}
                type="file"
              />
              <ImportButton
                text="Add Business Rule"
                image={gg_file}
                onClick={() => {
                  if (listBusinessProcesses.length <= 0)
                    return alert("Please add BusinessProcess first");
                  setIsShowBRModal(true);
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              padding: 0,
              justifyContent: "space-between",
            }}
          >
            {/* -------------------------------------------------------------------------- */
            /*                           Table Business Process                           */
            /* -------------------------------------------------------------------------- */}
            <div
              className="text-center"
              style={{
                width: "48%",
                backgroundColor: "white",
                boxShadow: "5px 5px 5px 5px #c7c7c7",
                borderRadius: "10px",
                height: "300px",
                marginLeft: 0,
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#20297C",
                }}
              >
                Chọn quy trình
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <td className="headTD">STT</td>
                    <td className="headTD">Tên</td>
                  </tr>
                </thead>
                <tbody>
                  {listBusinessProcesses.map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index+1}</td>
                      <td className="bodyTD">{file.name}</td>
                      <td>
                        <input
                          type="radio"
                          name="gender"
                          onClick={() => handleClickBusinessProcess(file)}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* -------------------------------------------------------------------------- */
            /*                          Table Classification Rule                         */
            /* -------------------------------------------------------------------------- */}
            <div
              className="text-center"
              style={{
                width: "48%",
                backgroundColor: "white",
                boxShadow: "5px 5px 5px 5px #c7c7c7",
                borderRadius: "10px",
                height: "300px",
                padding: 0,
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#20297C",
                }}
              >
                Chọn luật phân lớp
              </div>
              <table
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <td className="headTD">STT</td>
                    <td className="headTD">Tên</td>
                  </tr>
                </thead>
                <tbody>
                  {listCRs.map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index+1}</td>
                      <td className="bodyTD">{file.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          defaultChecked={selectedCRsId.includes(file.id)}
                          onChange={() => handleSelectClassification(file.id)}
                          disabled={
                            selectedCRsId.length >= 2 &&
                            !selectedCRsId.includes(file.id)
                          }
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* -------------------------------------------------------------------------- */
          /*                              Show BPMN diagram                             */
          /* -------------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "30px",
              width: "100%",
              height: 500,
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              marginTop: 30,
              borderRadius: 10,
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
          {/* -------------------------------------------------------------------------- */
          /*                               Button Redesign                              */
          /* -------------------------------------------------------------------------- */}
          <div className="row" style={{ marginTop: 40 }}>
            <div className="col-2"></div>
            <div className="col-8 text-center">
              <Button style={{ background: "#8AECE5" }} variant="">
                <div className="row text-align-left">
                  <div className="col m-auto">
                    <img src={redesign} height="30px" width="30px" />
                  </div>
                  <div className="col m-auto" onClick={handleRedesign}>
                    Redesign
                  </div>
                </div>
              </Button>
            </div>
            <div className="col-2"></div>
          </div>
          {/* ------------------------------------ - ----------------------------------- */}
        </div>
      </div>
    </div>
  );
}
