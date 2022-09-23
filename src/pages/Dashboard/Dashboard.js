import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import ImportButton from "../../components/ImportButton";
import dashboard from "../../resources/icons/dashboard.svg";
import gg_file from "../../resources/icons/gg_file.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import round from "../../resources/icons/round.svg";
import setting from "../../resources/icons/setting.svg";
import uploadfile from "../../resources/icons/uploadfile.svg";
import asis from "../../resources/icons/asisdiagram.png";

export default function Dashboard() {
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
  const openFileBusinessRule = () => {
    inputFileBusinessRule.current.click();
  };
  const openFileClassificationRule = () => {
    inputFileClassificationRule.current.click();
  };


  const [modalMeasureTimeIsOpen, setMeasureTimeIsOpen] = React.useState(false);

  function openModalMeasureTime() {
    setMeasureTimeIsOpen(true);
  }

  function closeModalMeasureTime() {
    setMeasureTimeIsOpen(false);
  }

  const [modalMeasureCostIsOpen, setMeasureCostIsOpen] = React.useState(false);

  function openModalMeasureCost() {
    setMeasureCostIsOpen(true);
  }

  function closeModalMeasureCost() {
    setMeasureCostIsOpen(false);
  }

  const [modalUnitIsOpen, setUnitIsOpen] = React.useState(false);

  function openModalUnit() {
    setUnitIsOpen(true);
  }

  function closeModalUnit() {
    setUnitIsOpen(false);
  }

  const [listMeasure, setListMeasure] = React.useState([]);

  useEffect(() => {
    setListMeasure([
      {
        id: "p1t1",
        nameTask: "Search flights",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t2",
        nameTask: "Check ticket's status",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t3",
        nameTask: "Selling regular tickets process",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t4",
        nameTask: "Notify customer",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t5",
        nameTask: "Submit customer information",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t6",
        nameTask: "Checke Wallet balance",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t7",
        nameTask: "Top-up eWallet",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t8",
        nameTask: "Warn customer",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t9",
        nameTask: "Create payment instruction",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t10",
        nameTask: "Pay the tickets",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t11",
        nameTask: "Pay the Airlines",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t12",
        nameTask: "Update eWallet Information",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t13",
        nameTask: "Send the tickets & result of payment",
        time: "",
        unitCost: "",
        cost: "",
      },
      {
        id: "p1t14",
        nameTask: "Refund customer",
        time: "",
        unitCost: "",
        cost: "",
      },
    ]);
  }, []);

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
  const [selectedTask, setSelectedTask] = useState([])

  const [isEdit, setIsEdit] = React.useState();

  const [showImage, setShowImage] = React.useState(round);

  const [listProcess, setListProcess] = React.useState([]);

  useEffect(() => {
    setListProcess([
      {
        id: "process1",
        name: "Quy trình bán vé máy bay",
        type: "pc",
        topic: "Quy trình bán hàng",
      },
      {
        id: "process2",
        name: "Quy trình bán vé xe khách",
        type: "pc",
        topic: "Quy trình bán hàng",
      },
      {
        id: "process3",
        name: "Quy trình đổi vé máy bay",
        type: "pc",
        topic: "Quy trình bán hàng",
      },
    ]);
  }, []);

  const [listDiagram, setListDiagram] = React.useState([]);

  useEffect(() => {
    setListDiagram([
      {
        id: "diagram1",
        name: "Lược đồ quy trình bán vé máy bay",
        type: "dg",
        topic: "Quy trình bán hàng",
      },
      {
        id: "diagram2",
        name: "Lược đồ quy trình bán vé xe khách",
        type: "dg",
        topic: "Quy trình bán hàng",
      },
      {
        id: "diagram3",
        name: "Lược đồ quy trình đổi vé máy bay",
        type: "dg",
        topic: "Quy trình bán hàng",
      },
    ]);
  }, []);

  const [listClassification, setListClassification] = React.useState([]);

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
    ]);
  }, []);

  const [listBusiness, setListBusiness] = React.useState([]);

  useEffect(() => {
    setListBusiness([
      {
        id: "business1",
        name: "Luật nghiệp vụ hỗ trợ cho Quy trình bán vé máy bay",
        type: "br",
        topic: "Quy trình bán hàng",
      },
      {
        id: "business2",
        name: "Luật nghiệp vụ hỗ trợ cho Quy trình đổi vé máy bay",
        type: "br",
        topic: "Quy trình bán hàng",
      },
    ]);
  }, []);

  const [modalMeasureIsOpen, setMeasureIsOpen] = React.useState(false);

  function openModalMeasure() {
    setMeasureIsOpen(true);
  }

  function closeModalMeasure() {
    setMeasureIsOpen(false);
  }

  const [modalProcessIsOpen, setProcessIsOpen] = React.useState(false);

  const [newProcessName, setNewProcessName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

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

  const [modalBusinessIsOpen, setBusinessIsOpen] = React.useState(false);

  const [newBusinessName, setNewBusinessName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

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

  const [modalClassificationIsOpen, setClassificationIsOpen] =
    React.useState(false);

  const [newClassificationName, setNewClassificationName] = React.useState({
    newName: "",
    type: "",
    topic: "",
  });

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

  const [checkFile, setCheckFile] = React.useState([]);

  // function statusCounter(inputs) {
  //   let counter = 0;
  //   for (const input of inputs) {
  //     if (input.status === '0') counter += 1;
  //   }
  //   return counter;
  // }

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

  const nav = useNavigate();

  const handleSelectClassification = (classification, index) => {
    setListClassification((prev) => [
      ...prev.slice(0, index),
      {
        ...prev[index],
        check: !prev[index].check,
      },
      ...prev.slice(index + 1),
    ]);
  };


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
                },
              ]);
              setListDiagram([
                ...listDiagram,
                {
                  id: "diagram" + (listDiagram.length + 1),
                  name: "Lược đồ quy trình " + newProcessName.newName,
                  type: "dg",
                  topic: newProcessName.topic,
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
              console.log(listClassification);
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
              onClick={()=>{
                nav("/home");}
              }
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
              class="list-group-item list-group-item-action list-group-item-light p-3"
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
      <div className="col-10">
        <div className="row  ms-4 p-4 m-0 p-0 ">
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
              }}
            />
          </div>
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "200px",
                marginRight: "20px",
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
                marginRight: "20px",
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
                marginRight: "20px",
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
              width: "37vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "300px",
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
                {listProcess.map((file, index) => (
                  <tr
                    style={{
                      marginBottom: "50px",
                    }}
                  >
                    <td className="bodyTD">{index + 1}</td>
                    <td className="bodyTD">{file.name}</td>
                    <td>
                      <input type="radio" name="gender" onClick={()=>{
                        setShowImage(asis)
                      }}></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-3 text-center"
            style={{
              width: "38vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "300px",
              marginLeft: "15px",
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
                {listClassification.map((file, index) => (
                  <tr
                    style={{
                      marginBottom: "50px",
                    }}
                  >
                    <td className="bodyTD">{index + 1}</td>
                    <td className="bodyTD">{file.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={file.check}
                        disabled={
                          listClassification.filter((f) => f.check === true)
                            .length >= 2 && file.check === false
                        }
                        onChange={() => handleSelectClassification(file, index)}
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "30px",
            }}
          >
            <img
              src={showImage}
              style={{
                width: "77vw",
                marginTop:"30px",
                marginBottom:"30px"
              }}
            />
          </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-center">
              <Button style={{ background: "#8AECE5" }} variant="">
                <div className="row text-align-left">
                  <div className="col m-auto">
                    <img src={redesign} height="30px" width="30px" />
                  </div>
                  <div
                    className="col m-auto"
                    onClick={() => {
                      nav("/redesign");
                    }}
                  >
                    Redesign
                  </div>
                </div>
              </Button>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
