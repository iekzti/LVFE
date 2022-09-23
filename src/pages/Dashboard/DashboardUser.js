import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Modal from "react-modal";
import { useLocation, useNavigate, Link } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import ImportButton from "../../components/ImportButton";
import dashboard from "../../resources/icons/dashboard.svg";
import gg_file from "../../resources/icons/gg_file.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import setting from "../../resources/icons/setting.svg";
import uploadfile from "../../resources/icons/uploadfile.svg";
import "./DashboardUser.css";
import tobe from "../../resources/icons/tobediagram.png";
import asis from "../../resources/icons/asisdiagram.png";
import axios from "axios";
import fileDownload from "js-file-download";

// import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem, OutlinedInput } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

export default function DashboardUser() {
  Modal.setAppElement("div");

  const inputFileProcess = useRef(null);
  const inputFileProcessDiagram = useRef(null);
  const inputFileBusinessRule = useRef(null);
  const inputFileClassificationRule = useRef(null);
  const [parentUnit, setParentUnit] = useState(0);

  const upload = (e) => {
    // Convert the FileList into an array and iterate
    Array.from(e.target.files).forEach((file) => {
      // Define a new file reader
      let reader = new FileReader();

      // Function to execute after loading the file
      reader.onload = () => console.log(reader.result);

      // Read the file as a text
      reader.readAsText(file);
    });
  };

  const openFileProcess = () => {
    inputFileProcess.current.click();
  };
  const openFileProcessDiagram = () => {
    inputFileProcessDiagram.current.click();
  };
  const openFileClassificationRule = () => {
    inputFileClassificationRule.current.click();
  };
  const openFileBusinessRule = () => {
    inputFileBusinessRule.current.click();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "80vw",
      height: "550px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const [showImage, setShowImage] = React.useState(tobe);

  const inputStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40vw",
      height: "450px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const inputDiagramStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "80vw",
      height: "620px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const inputProcessStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40vw",
      height: "400px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const handleDownloadTXT = (url) => {
    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [modalMeasureTimeIsOpen, setMeasureTimeIsOpen] = React.useState(false);

  function openModalMeasureTime() {
    setMeasureTimeIsOpen(true);
  }

  function closeModalMeasureTime() {
    setMeasureTimeIsOpen(false);
  }

  const [modalUnitIsOpen, setUnitIsOpen] = React.useState(false);

  function openModalUnit() {
    setUnitIsOpen(true);
  }

  function closeModalUnit() {
    setUnitIsOpen(false);
  }

  const [listMeasure, setListMeasure] = React.useState([{
    id: "p1t1",
    nameTask: "Search flights",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t2",
    nameTask: "Check ticket's status",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t3",
    nameTask: "Notify customer",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t4",
    nameTask: "Submit customer information",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t5",
    nameTask: "Checke eWallet balance",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t6",
    nameTask: "Create payment instruction",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t7",
    nameTask: "Pay the tickets",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t8",
    nameTask: "Pay the Airlines",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t9",
    nameTask: "Send the tickets & result of payment",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t10",
    nameTask: "Refund customer",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t11",
    nameTask: "Top-up eWallet",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t12",
    nameTask: "Warn customer",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },]);

  const [listMeasureRedesign, setListMeasureRedesign] = React.useState([{
    id: "p1t1",
    nameTask: "Search flights",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t2",
    nameTask: "Check ticket's status",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t3",
    nameTask: "Notify customer",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t4",
    nameTask: "Submit customer information",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t5",
    nameTask: "Checke eWallet balance",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t6",
    nameTask: "Create payment instruction",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t7",
    nameTask: "Pay the tickets",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t8",
    nameTask: "Pay the Airlines",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t9",
    nameTask: "Send the tickets & result of payment",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t11",
    nameTask: "Top-up eWallet",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },
  {
    id: "p1t12",
    nameTask: "Warn customer",
    time: "",
    unitCost: "",
    cost: "",
    isSelected: false,
  },]);


  // useEffect(() => {
  //   setListMeasure([
  //     {
  //       id: "p1t1",
  //       nameTask: "Search flights",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t2",
  //       nameTask: "Check ticket's status",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t3",
  //       nameTask: "Notify customer",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t4",
  //       nameTask: "Submit customer information",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t5",
  //       nameTask: "Checke eWallet balance",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t6",
  //       nameTask: "Create payment instruction",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t7",
  //       nameTask: "Pay the tickets",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t8",
  //       nameTask: "Pay the Airlines",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t9",
  //       nameTask: "Send the tickets & result of payment",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t10",
  //       nameTask: "Refund customer",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t11",
  //       nameTask: "Top-up eWallet",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //     {
  //       id: "p1t12",
  //       nameTask: "Warn customer",
  //       time: "",
  //       unitCost: "",
  //       cost: "",
  //       isSelected: false,
  //     },
  //   ]);
  // }, []);

  const [listUnit, setListUnit] = React.useState([]);
  const [unitName, setUnitName] = React.useState();
  const [unitType, setUnitType] = React.useState("sequential");
  const [unitTask, setUnitTask] = React.useState();
  const [percentYes, setPercentYes] = React.useState("");
  const [percentNo, setPercentNo] = React.useState("");
  const [unitNameEdit, setUnitNameEdit] = React.useState();
  const [unitTypeEdit, setUnitTypeEdit] = React.useState("sequential");
  const [unitTaskEdit, setUnitTaskEdit] = React.useState();
  const [percentYesEdit, setPercentYesEdit] = React.useState("");
  const [percentNoEdit, setPercentNoEdit] = React.useState("");
  const [selectedTask, setSelectedTask] = useState([]);

  const [isEdit, setIsEdit] = React.useState();

  const [modalProcessIsOpen, setProcessIsOpen] = React.useState(false);

  function openModalProcess() {
    setProcessIsOpen(true);
    setNewProcessName({
      newName: "",
      topic: "Quy trình bán hàng",
      type: "",
    });
  }

  function closeModalProcess() {
    setProcessIsOpen(false);
  }

  const [newProcessName, setNewProcessName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

  const [newBusinessName, setNewBusinessName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

  const [newClassificationName, setNewClassificationName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

  const [modalClassificationIsOpen, setClassificationIsOpen] =
    React.useState(false);

  function openModalClassification() {
    setClassificationIsOpen(true);
    setNewClassificationName({
      newName: "",
      topic: "Quy trình bán hàng",
      type: "",
    });
  }

  function closeModalClassification() {
    setClassificationIsOpen(false);
  }

  const [modalBusinessIsOpen, setBusinessIsOpen] = React.useState(false);

  function openModalBusiness() {
    setBusinessIsOpen(true);
    setNewBusinessName({
      newName: `Luật nghiệp vụ hỗ trợ cho ${
        listProcess.filter((f) => f.type === "pc")[0].name
      }`,
      topic: "Quy trình bán hàng",
      type: "",
    });
  }

  function closeModalBusiness() {
    setBusinessIsOpen(false);
  }

  const [listProcess, setListProcess] = React.useState([]);
  const [searchTextProcess, setSearchTextProcess] = React.useState("");
  const [typeSearchProcess, setTypeSearchProcess] = React.useState("name");

  useEffect(() => {
    setListProcess([
      {
        id: "process2",
        name: "Quy trình bán vé xe khách",
        type: "pc",
        topic: "Quy trình bán hàng",
        listTask: "",
        listUnit: "",
      },
      {
        id: "process3",
        name: "Quy trình đổi vé máy bay",
        type: "pc",
        topic: "Quy trình bán hàng",
        listTask: "",
        listUnit: "",
      },
      {
        id: "process3",
        name: "Quy trình bán vé máy bay",
        type: "pc",
        topic: "Quy trình bán hàng",
        listTask: listMeasure,
        listUnit: [],
      },
      {
        id: "process4",
        name: "Quy trình bán vé máy bay sau khi tái thiết kế",
        type: "pc",
        topic: "Quy trình bán hàng",
        listTask: listMeasureRedesign,
        listUnit: [],
      },
    ]);
  }, []);

  const [listDiagram, setListDiagram] = React.useState([]);
  const [searchTextDiagram, setSearchTextDiagram] = React.useState("");
  const [typeSearchDiagram, setTypeSearchDiagram] = React.useState("name");

  useEffect(() => {
    setListDiagram([
      {
        id: "diagram2",
        name: "Lược đồ quy trình bán vé xe khách",
        type: "dg",
        topic: "Quy trình bán hàng",
        processId: "process2",
      },
      {
        id: "diagram3",
        name: "Lược đồ quy trình đổi vé máy bay",
        type: "dg",
        topic: "Quy trình bán hàng",
        processId: "process3",
      },
      {
        id: "diagram3",
        name: "Lược đồ quy trình bán vé máy bay",
        type: "dg",
        topic: "Quy trình bán hàng",
        processId: "process1",
      },
      {
        id: "diagram4",
        name: "Lược đồ quy trình bán vé máy bay sau khi tái thiết kế",
        type: "dg",
        topic: "Quy trình bán hàng",
        processId: "process3",
      },
    ]);
  }, []);

  const [listClassification, setListClassification] = React.useState([]);
  const [searchTextClassification, setSearchTextClassification] =
    React.useState("");
  const [typeSearchClassification, setTypeSearchClassification] =
    React.useState("name");

  useEffect(() => {
    setListClassification([
      {
        id: "classification1",
        name: "Luật phân lớp B",
        type: "cr",
        topic: "Quy trình bán hàng",
        check: false,
      },
      {
        id: "classification2",
        name: "Luật phân lớp A",
        type: "cr",
        topic: "Quy trình bán hàng",
        check: false,
      },
      {
        id: "classification3",
        name: "Luật phân lớp C",
        type: "cr",
        topic: "Quy trình quản lý",
        check: false,
      },
      {
        id: "classification4",
        name: "Tendency",
        type: "cr",
        topic: "Quy trình quản lý",
        check: false,
      },
      {
        id: "classification5",
        name: "customerAcceptence",
        type: "cr",
        topic: "Quy trình quản lý",
        check: false,
      },
    ]);
  }, []);

  const [listBusiness, setListBusiness] = React.useState([]);
  const [searchTextBusiness, setSearchTextBusiness] = React.useState("");
  const [typeSearchBusiness, setTypeSearchBusiness] = React.useState("name");

  useEffect(() => {
    setListBusiness([
      {
        id: "business2",
        name: "Luật nghiệp vụ hỗ trợ cho Quy trình đổi vé máy bay",
        type: "br",
        topic: "Quy trình bán hàng",
      },
      {
        id: "business2",
        name: "businessRule",
        type: "br",
        topic: "Quy trình bán hàng",
      },
    ]);
  }, []);

  const [modalDiagramIsOpen, setDiagramIsOpen] = React.useState(false);

  function openModalDiagram(index) {
    setDiagramIsOpen(true);
    getInfoDiagram(index);
  }

  function closeModalDiagram() {
    setDiagramIsOpen(false);
  }

  const [diagramInfo, setInfoDiagram] = React.useState({
    id: "",
    name: "",
    type: "",
    topic: "",
  });

  function getInfoDiagram(index) {
    setInfoDiagram(listDiagram[index]);
  }

  const nav = useNavigate();

  return (
    <div className="row">
      <Modal
        isOpen={modalProcessIsOpen}
        onRequestClose={closeModalProcess}
        style={inputProcessStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => {
              closeModalProcess();
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#20297C",
            }}
          >
            Vui lòng nhập tên cho quy trình:
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
              width: "95%",
              borderRadius: "5px",
              marginTop: "10px",
              backgroundColor: "#F2F2F2",
            }}
          >
            <input
              placeholder="Tên quy trình"
              style={{
                background: "transparent",
                borderTop: "0px",
                borderLeft: "0px",
                borderRight: "0px",
                borderBottom: "1px",
                outline: "none",
                width: "100%",
                padding: "5px",
              }}
              onChange={(param) => {
                setNewProcessName({
                  ...newProcessName,
                  newName: param.target.value,
                });
              }}
            ></input>
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: "#20297C",
            marginTop: "10px",
          }}
        >
          Vui lòng lựa chọn topic:
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "95%",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          <select
            name="cars"
            id="cars"
            style={{
              width: "100%",
              height: "100%",
              paddingTop: 10,
              paddingBottom: 10,
            }}
            defaultValue={newProcessName.topic}
            onChange={(param) => {
              setNewProcessName({
                ...newProcessName,
                topic: param.target.value,
              });
            }}
          >
            <option value="Quy trình bán hàng">Quy trình bán hàng</option>
            <option value="Quy trình quản lý">Quy trình quản lý</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "250px",
              marginTop: "20px",
            }}
          >
            <input
              type={"file"}
              id={"jsonFileInput"}
              ref={inputFileProcess}
              style={{ display: "none" }}
            />
            <Button
              style={{ background: "#20297C", width: "240px" }}
              variant=""
            >
              <div
                style={{
                  display: "flex",
                  textDecoration: "row",
                }}
              >
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <img
                    src={uploadfile}
                    background="#FFFFFF"
                    height="30px"
                    width="30px"
                  />
                </div>
                <div
                  style={{ color: "#FFFFFF" }}
                  onClick={() => {
                    openFileProcess();
                  }}
                >
                  Tải quy trình (Task)
                </div>
              </div>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "250px",
              marginTop: "20px",
            }}
          >
            <input
              type={"file"}
              id={"jsonFileInput"}
              ref={inputFileProcessDiagram}
              style={{ display: "none" }}
            />
            <Button
              style={{ background: "#20297C", width: "240px" }}
              variant=""
            >
              <div
                style={{
                  display: "flex",
                  textDecoration: "row",
                }}
              >
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <img
                    src={uploadfile}
                    background="#FFFFFF"
                    height="30px"
                    width="30px"
                  />
                </div>
                <div
                  style={{ color: "#FFFFFF", fontSize: "16px" }}
                  onClick={() => {
                    openFileProcessDiagram();
                  }}
                >
                  Tải lược đồ (BPMN)
                </div>
              </div>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#395185",
              color: "#FFFFFF",
              width: "20%",
              cursor: "pointer",
              textAlign: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "20px",
              marginRight: "30px",
            }}
            onClick={() => {
              setListProcess([
                ...listProcess,
                {
                  id: "process" + (listProcess.length + 1),
                  name: newProcessName.newName,
                  type: "pc",
                  topic: newProcessName.topic,
                  listTask: listMeasure,
                  listUnit: listUnit,
                },
              ]);
              setListDiagram([
                ...listDiagram,
                {
                  id: "diagram" + (listDiagram.length + 1),
                  name: "Lược đồ quy trình " + newProcessName.newName,
                  type: "dg",
                  topic: newProcessName.topic,
                  processId: "process" + (listProcess.length + 1),
                },
              ]);
              closeModalProcess();
            }}
          >
            Lưu
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalDiagramIsOpen}
        onRequestClose={closeModalDiagram}
        style={inputDiagramStyles}
        appElement={document.getElementById("app")}
      >
        <div className="row">
          <div
            className="col-10"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
              marginLeft: "70px",
            }}
          >
            {diagramInfo.name}
          </div>
          <div
            className="col-1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalDiagram();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="mt-3 text-center">
          <img
            src={showImage}
            style={{ width: "900px", marginBottom: "30px", marginTop: "20px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              background: "#168414",
              width: "150px",
              height: "50px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant=""
            onClick={() => {
              if(showImage ===tobe){
                handleDownloadTXT(
                  "https://drive.google.com/uc?id=1O_RcbcLOdz957Yld8Q6FEhOETN1HFHxW&export=download"
                )
              }
              else if(showImage ===asis){
                handleDownloadTXT(
                  "https://drive.google.com/uc?id=1x2r_i1L_kHTx8L5wI3l8qFUs2vpRSpIh&export=download"
                )
              }
              // handleDownload(
              //   "https://i.ibb.co/93jwg4v/295649601-1236311500490349-2203613192648917914-n.png",
              //   "tobediagram.png"
              // );
              closeModalUnit();
            }}
          >
            <span style={{ width: 10 }}></span>
            <div
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Tải xuống
            </div>
          </Button>
        </div>
      </Modal>
      
      <Modal
        isOpen={modalClassificationIsOpen}
        onRequestClose={closeModalClassification}
        style={inputStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => {
              closeModalClassification();
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#20297C",
            }}
          >
            Vui lòng nhập tên cho luật phân lớp:
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
              width: "95%",
              borderRadius: "5px",
              marginTop: "10px",
              backgroundColor: "#F2F2F2",
            }}
          >
            <input
              placeholder="Tên luật phân lớp"
              style={{
                background: "transparent",
                borderTop: "0px",
                borderLeft: "0px",
                borderRight: "0px",
                borderBottom: "1px",
                outline: "none",
                width: "100%",
                padding: "5px",
              }}
              onChange={(param) => {
                setNewClassificationName({
                  ...newClassificationName,
                  newName: param.target.value,
                });
              }}
            ></input>
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: "#20297C",
            marginTop: "10px",
          }}
        >
          Vui lòng lựa chọn topic:
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "95%",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          <select
            name="cars"
            id="cars"
            style={{
              width: "100%",
              height: "100%",
              paddingTop: 10,
              paddingBottom: 10,
            }}
            defaultValue={newClassificationName.topic}
            onChange={(param) => {
              setNewClassificationName({
                ...newClassificationName,
                topic: param.target.value,
              });
            }}
          >
            <option value="Quy trình bán hàng">Quy trình bán hàng</option>
            <option value="Quy trình quản lý">Quy trình quản lý</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "200px",
            marginTop: "20px",
          }}
        >
          <input
            type={"file"}
            id={"jsonFileInput"}
            ref={inputFileClassificationRule}
            style={{ display: "none" }}
          />
          <Button style={{ background: "#20297C" }} variant="">
            <div
              style={{
                display: "flex",
                textDecoration: "row",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                }}
              >
                <img
                  src={uploadfile}
                  background="#FFFFFF"
                  height="30px"
                  width="30px"
                />
              </div>
              <div
                style={{ color: "#FFFFFF" }}
                onClick={() => {
                  openFileClassificationRule();
                }}
              >
                Tải luật phân lớp
              </div>
            </div>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#395185",
              color: "#FFFFFF",
              width: "20%",
              cursor: "pointer",
              textAlign: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "20px",
              marginRight: "30px",
            }}
            onClick={() => {
              setListClassification([
                ...listClassification,
                {
                  id: "classification" + (listClassification.length + 1),
                  name: newClassificationName.newName,
                  type: "cr",
                  topic: newClassificationName.topic,
                },
              ]);
              closeModalClassification();
            }}
          >
            Lưu
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalBusinessIsOpen}
        onRequestClose={closeModalBusiness}
        style={inputStyles}
        contentLabel="Example Modal"
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => {
              closeModalBusiness();
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#20297C",
            }}
          >
            Vui lòng lựa chọn tên cho luật nghiệp vụ:
          </div>
          <div
            style={{
              background: "white",
              padding: "10px",
              width: "95%",
              borderRadius: "5px",
              marginTop: "10px",
              backgroundColor: "#F2F2F2",
            }}
          >
            <select
              name="cars"
              id="cars"
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onChange={(param) => {
                setNewBusinessName((prevState) => {
                  return {
                    ...prevState,
                    newName: param.target.value,
                  };
                });
              }}
            >
              {listProcess.map((file, index) => (
                <option value={file.name}>
                  Luật nghiệp vụ hỗ trợ cho {file.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: "#20297C",
            marginTop: "10px",
          }}
        >
          Vui lòng lựa chọn topic:
        </div>
        <div
          style={{
            background: "white",
            padding: "10px",
            width: "95%",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          <select
            name="cars"
            id="cars"
            style={{
              width: "100%",
              height: "100%",
              paddingTop: 10,
              paddingBottom: 10,
            }}
            onChange={(param) => {
              setNewBusinessName((prevState) => {
                return {
                  ...prevState,
                  topic: param.target.value,
                };
              });
            }}
          >
            <option value="Quy trình bán hàng">Quy trình bán hàng</option>
            <option value="Quy trình quản lý">Quy trình quản lý</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "200px",
            marginTop: "20px",
          }}
        >
          <input
            type={"file"}
            id={"jsonFileInput"}
            ref={inputFileBusinessRule}
            style={{ display: "none" }}
          />
          <Button style={{ background: "#20297C" }} variant="">
            <div
              style={{
                display: "flex",
                textDecoration: "row",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                }}
              >
                <img
                  src={uploadfile}
                  background="#FFFFFF"
                  height="30px"
                  width="30px"
                />
              </div>
              <div
                style={{ color: "#FFFFFF" }}
                onClick={() => {
                  openFileBusinessRule();
                }}
              >
                Tải luật nghiệp vụ
              </div>
            </div>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#395185",
              color: "#FFFFFF",
              width: "20%",
              cursor: "pointer",
              textAlign: "center",
              paddingTop: "5px",
              paddingBottom: "5px",
              borderRadius: "5px",
              marginTop: "20px",
              marginRight: "30px",
            }}
            onClick={() => {
              setListBusiness((prevFile) => {
                return [
                  ...prevFile,
                  {
                    id: "business" + (listBusiness.length + 1),
                    name: newBusinessName.newName,
                    type: "br",
                    topic: newBusinessName.topic,
                  },
                ];
              });
              console.log(listBusiness);
              closeModalBusiness();
            }}
          >
            Lưu
          </div>
        </div>
      </Modal>
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
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#8AECE5",
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
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
      <div
        className="col-10"
        style={{
          display: "flex",
        }}
      >
        <div className="row p-4 ms-4 p-4 m-0 p-0 ">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "27px",
              paddingRight: "30px",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                width: "20%",
                display: "flex",
                alignItems: "center",
                paddingTop: "5px",
                paddingBottom: "5px",
                borderRadius: "5px",
                boxShadow: "2px 2px 2px 2px #c7c7c7",
                cursor: "pointer",
              }}
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <img
                src={redesign}
                style={{
                  height: "40px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              ></img>
              <div style={{}}>Redesign</div>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ backgroundColor: "green" }}
            >
              <DropdownButton
                className="text-center "
                style={{
                  "justify-content": "flex-end",
                  "align-items": "center",
                }}
                items={["Profile", "Logout"]}
                itemStart={profile}
                icons_list={[profile, logout_icon]}
                onClick={(item, index) => {
                  if (index === 0) {
                    nav("/profile");
                  }
                }}
              />
            </div>
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: "20px",
              marginTop: "20px",
              width: "75vw",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "200px",
                marginRight: "10px",
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
                  openModalProcess();
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "200px",
                marginRight: "10px",
              }}
            >
              <input
                onChange={upload}
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
                  openModalClassification();
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "200px",
                marginRight: "35px",
              }}
            >
              <input
                onChange={upload}
                ref={inputFileBusinessRule}
                style={{ display: "none" }}
                type="file"
              />
              <ImportButton
                text="Add Business Rule"
                image={gg_file}
                onClick={() => {
                  openModalBusiness();
                }}
              />
            </div>
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Quy trình đã tải
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">Tên quy trình</td>
                  <td className="headTD">Topic</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <select
                        name="cars"
                        id="cars"
                        style={{
                          height: "30px",
                        }}
                        onChange={(param) => {
                          setTypeSearchProcess(param.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Search theo
                        </option>
                        <option value="name">Tên</option>
                        <option value="topic">Topic</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name or topic"
                      name="s"
                      onChange={(e) => {
                        setSearchTextProcess(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {listProcess
                  .filter((file) =>
                    typeSearchProcess === "name"
                      ? file.name.includes(searchTextProcess)
                      : file.topic.includes(searchTextProcess)
                  )
                  .map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index + 1}</td>
                      <td
                        className="bodyTD"
                        style={{
                          width: "500px",
                        }}
                      >
                        {file.name}
                      </td>
                      <td className="bodyTD">{file.topic}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#395185",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              marginRight: "10px",
                            }}
                            onClick={() => {
                              nav("/processInfo", { state: { file } });
                              // console.log(file);
                            }}
                          >
                            Chi tiết
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#168414",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                            onClick={()=>{
                              if (index===2){
                                handleDownloadTXT("")
                              }
                              else if(index===3){
                                handleDownloadTXT("https://drive.google.com/uc?id=13Id_PGEnh4QK6Ye9491sc5lYD0UYrDnY&export=download")
                              }
                            }}
                          >
                            Tải xuống
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#BC141E",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Xóa
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Lược đồ quy trình đã tải
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">Tên lược đồ</td>
                  <td className="headTD">Topic</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <select
                        name="cars"
                        id="cars"
                        style={{
                          height: "30px",
                        }}
                        onChange={(param) => {
                          setTypeSearchDiagram(param.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Search theo
                        </option>
                        <option value="name">Tên</option>
                        <option value="topic">Topic</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name or topic"
                      name="s"
                      onChange={(e) => {
                        setSearchTextDiagram(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {listDiagram
                  .filter((file) =>
                    typeSearchDiagram === "name"
                      ? file.name.includes(searchTextDiagram)
                      : file.topic.includes(searchTextDiagram)
                  )
                  .map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index + 1}</td>
                      <td
                        className="bodyTD"
                        style={{
                          width: "500px",
                        }}
                      >
                        {file.name}
                      </td>
                      <td className="bodyTD">{file.topic}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#395185",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              marginRight: "10px",
                            }}
                            onClick={() => {
                              openModalDiagram(index);
                              if (index === 2) {
                                setShowImage(asis);
                              } else if (index === 3) {
                                setShowImage(tobe);
                              }
                            }}
                          >
                            Chi tiết
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#168414",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                            onClick={() => {
                              if (index === 2) {
                                handleDownload(
                                  "https://i.ibb.co/Phbpx79/294970877-408266754567538-7786276866722165305-n.png",
                                  "asisdiagram.png"
                                );
                              } else if (index === 3) {
                                handleDownload(
                                  "https://i.ibb.co/93jwg4v/295649601-1236311500490349-2203613192648917914-n.png",
                                  "tobediagram.png"
                                );
                              }
                            }}
                          >
                            Tải xuống
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Luật nghiệp vụ đã tải
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">Tên luật nghiệp vụ</td>
                  <td className="headTD">Topic</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <select
                        name="cars"
                        id="cars"
                        style={{
                          height: "30px",
                        }}
                        onChange={(param) => {
                          setTypeSearchBusiness(param.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Search theo
                        </option>
                        <option value="name">Tên</option>
                        <option value="topic">Topic</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name or topic"
                      name="s"
                      onChange={(e) => {
                        setSearchTextBusiness(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {listBusiness
                  .filter((file) =>
                    typeSearchBusiness === "name"
                      ? file.name.includes(searchTextBusiness)
                      : file.topic.includes(searchTextBusiness)
                  )
                  .map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index + 1}</td>
                      <td
                        className="bodyTD"
                        style={{
                          width: "500px",
                        }}
                      >
                        {file.name}
                      </td>
                      <td className="bodyTD">{file.topic}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#168414",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                            onClick = {()=>{
                              if(index === 1){
                                handleDownloadTXT("https://drive.google.com/uc?id=1gOC81mK3tJ0dfZpXGUyq-4OpC-MN62hN&export=download")
                              }
                            }}
                          >
                            Tải xuống
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#BC141E",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Xóa
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Luật phân lớp đã tải
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">Tên luật phân lớp</td>
                  <td className="headTD">Topic</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <select
                        name="cars"
                        id="cars"
                        style={{
                          height: "30px",
                        }}
                        onChange={(param) => {
                          setTypeSearchClassification(param.target.value);
                        }}
                      >
                        <option value="" disabled selected>
                          Search theo
                        </option>
                        <option value="name">Tên</option>
                        <option value="topic">Topic</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name or topic"
                      name="s"
                      onChange={(e) => {
                        setSearchTextClassification(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {listClassification
                  .filter((file) =>
                    typeSearchClassification === "name"
                      ? file.name.includes(searchTextClassification)
                      : file.topic.includes(searchTextClassification)
                  )
                  .map((file, index) => (
                    <tr
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <td className="bodyTD">{index + 1}</td>
                      <td
                        className="bodyTD"
                        style={{
                          width: "500px",
                        }}
                      >
                        {file.name}
                      </td>
                      <td className="bodyTD">{file.topic}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#168414",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                            onClick ={()=>{
                              if(index === 4)
                              {
                                handleDownloadTXT("https://drive.google.com/uc?id=1TS1ZB2IPF_zHq6g6o2jboZW98qfMCGf4&export=download")
                              }
                              else if (index === 3){
                                handleDownloadTXT("https://drive.google.com/uc?id=1Tw2J3gEtcYYGe9eh34sIJqhflJguB003&export=download")
                              }
                            }}
                          >
                            Tải xuống
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              backgroundColor: "#BC141E",
                              color: "#FFFFFF",
                              width: "80px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Xóa
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
