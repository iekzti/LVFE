import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../components/DropdownButton";
import dashboard from "../../resources/icons/dashboard.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import redesign from "../../resources/icons/redesign.svg";
import setting from "../../resources/icons/setting.svg";
import time from "../../resources/icons/time.svg";
import "../Dashboard/DashboardUser.css";
import { Button } from "react-bootstrap";
import Select from "react-select";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem, OutlinedInput } from "@mui/material";
import { baseApi } from "utils/api";
import axios from "axios";

export default function ProcessInfo() {
  Modal.setAppElement("div");
  const nav = useNavigate();
  const { state } = useLocation();
  const { businessProcessId } = state;
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const endpoint = `${baseApi}/business-process/${businessProcessId}/tasks`;

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
      setTasks(result.data);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [isEditTime, setIsEditTime] = useState(false);

  const handleSave = async () => {
    const endpoint = `${baseApi}/business-process/tasks`;

    const result = await axios
      .put(
        endpoint,
        { tasks },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      getTasks();
      alert("Th??nh c??ng");
      setIsEditTime(prev => !prev)
    }
  };

  // const [processInfo, setProcessInfo] = useState({
  //   id: process.id,
  //   name: process.name,
  //   type: process.type,
  //   topic: process.topic,
  //   listTask: process.listTask,
  //   listUnit: process.listUnit,
  // });

  // const [isEditTime, setIsEditTime] = useState(false);

  // const [listUnit, setListUnit] = React.useState([]);
  // const [unitName, setUnitName] = React.useState();
  // const [unitType, setUnitType] = React.useState("sequential");
  // const [unitTask, setUnitTask] = React.useState();
  // const [percentYes, setPercentYes] = React.useState("");
  // const [percentNo, setPercentNo] = React.useState("");

  // const [isEdit, setIsEdit] = React.useState();

  // const [unitNameEdit, setUnitNameEdit] = React.useState();
  // const [unitTypeEdit, setUnitTypeEdit] = React.useState("sequential");
  // const [unitTaskEdit, setUnitTaskEdit] = React.useState();
  // const [percentYesEdit, setPercentYesEdit] = React.useState("");
  // const [percentNoEdit, setPercentNoEdit] = React.useState("");
  // const listUnitTask = process.listUnit.reduce(
  //   (prev, cur) => prev.concat([...cur.unitTask]),
  //   []
  // );
  // const [selectedTask, setSelectedTask] = useState([...listUnitTask]);

  // useEffect(() => {
  //   const test = [...processInfo.listTask, ...processInfo.listUnit].filter(
  //     (task) => {
  //       if (task.nameTask) {
  //         const isSelected = selectedTask.find(
  //           (t) => t.value === task.nameTask
  //         );
  //         return !isSelected;
  //       }
  //       if (task.unitName) {
  //         const isSelected = selectedTask.find(
  //           (t) => t.value === task.unitName
  //         );
  //         return !isSelected;
  //       }
  //       return false;
  //     }
  //   );
  //   console.log("???? ~ file: ProcessInfo.js ~ line 58 ~ useEffect ~ test", test);
  // }, [unitTaskEdit]);

  const [modalCalIsOpen, setCalIsOpen] = React.useState(false);

  async function openModalCal() {
    setCalIsOpen(true);
  }

  function closeModalCal() {
    setCalIsOpen(false);
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

  const [modalResultIsOpen, setResultIsOpen] = React.useState(false);

  function openModalResult() {
    setResultIsOpen(true);
  }

  function closeModalResult() {
    setResultIsOpen(false);
  }

  const inputCostStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "50vw",
      height: "200px",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  return (
    <div className="row">
      <Modal
        isOpen={modalCalIsOpen}
        onRequestClose={closeModalCal}
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
                closeModalCal();
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                display: "flex",
                justifyContent: "flex-start",
                width: "50%",
                paddingTop: "20px",
              }}
            >
              Vui l??ng nh???p chi ph?? ????n v???:
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "45%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
                display: "flex",
              }}
            >
              <input
                placeholder="Chi ph?? ????n v??? (USD/Ph??t)"
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
                onChange={() => {}}
              ></input>
            </div>
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
                background: "#395185",
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
                openModalResult();
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
                T??nh to??n
              </div>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalResultIsOpen}
        onRequestClose={closeModalResult}
        style={inputCostStyles}
        appElement={document.getElementById("app")}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="col-10"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "80px",
            }}
          >
            K???t qu??? t??nh to??n hi???u n??ng
          </div>
          <div
            className="col"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                closeModalResult();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              paddingTop: "20px",
            }}
          >
            Th???i gian chu k??? c???a c??? quy tr??nh: 110.425 Ph??t
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              paddingTop: "20px",
            }}
          >
          Chi ph?? ti??u hao c???a c??? quy tr??nh: 8.834 $/Giao d???ch
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
          className="border-end bg-white"
          id="sidebar-wrapper"
          style={{ height: "100%" }}
        >
          <h1 className="text-center">Logo</h1>
          <div className="list-group list-group-flush">
            <a
              className="list-group-item list-group-item-action list-group-item-light p-3"
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
              className="list-group-item list-group-item-action list-group-item-light p-3"
              // href="#!"
              style={{
                display: "flex",
                alignItems: "center",
              }}
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
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "630px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
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
                ?????c l?????ng th???i gian x??? l?? t??c v???
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                }}
              >
                <Button
                  style={{
                    background: isEditTime ? "#395185" : "#BC141E",
                    width: "100px",
                    height: "38px",
                    border: "none",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    !isEditTime ? setIsEditTime(!isEditTime) : handleSave();
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                  >
                    {isEditTime ? "L??u" : "S???a"}
                  </div>
                </Button>
              </div>
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">T??n t??c v???</td>
                  <td className="headTD">
                    Th???i gian<br></br>(Ph??t/giao d???ch)
                  </td>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  return (
                    <tr>
                      <td className="bodyTD">{index + 1}</td>
                      <td className="bodyTD">{task.name}</td>
                      <td className="bodyTD">
                        <input
                          type={"text"}
                          placeholder="Time"
                          defaultValue={task.time}
                          style={{
                            backgroundColor: "#F2F2F2",
                            borderTop: "0px",
                            borderLeft: "0px",
                            borderRight: "0px",
                            borderBottom: "1px",
                            borderRadius: "10px",
                            outline: "none",
                            width: "100px",
                            padding: "5px",
                            textAlign: "center",
                          }}
                          disabled={!isEditTime}
                          onChange={(event) => {
                            setTasks((prev) => {
                              const index = tasks.findIndex(
                                (t) => t.id === task.id
                              );
                              const newTasks = [...prev];
                              newTasks[index] = {
                                ...newTasks[index],
                                time: parseFloat(event.target.value),
                              };
                              return newTasks;
                            });
                          }}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "950px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  justifyContent: "center",
                }}
              >
                X??c ?????nh quan h??? t??c v???
              </div>
            </div>
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD" style={{ width: "200px" }}>
                    T??n nh??m
                  </td>
                  <td className="headTD" style={{ width: "150px" }}>
                    Lo???i quan h???
                  </td>
                  <td className="headTD" style={{ width: "300px" }}>
                    T??c v???
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  style={{
                    paddingBottom: "100px",
                  }}
                >
                  <td>
                    <div
                      style={{
                        width: "200px",
                      }}
                    >
                      <input
                        placeholder="T??n nh??m"
                        value={unitName}
                        onChange={(e) => {
                          setUnitName(e.target.value);
                        }}
                        style={{
                          width: "200px",
                          height: "38px",
                          borderColor: "#DDD8D8",
                          borderRadius: "5px",
                          borderStyle: "solid",
                        }}
                      ></input>
                    </div>
                  </td>
                  <td
                    style={{
                      height: "39px",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "2px",
                    }}
                  >
                    <select
                      value={unitType}
                      onChange={(e) => {
                        setUnitType(e.target.value);
                      }}
                      style={{
                        width: "100px",
                        borderColor: "#DDD8D8",
                        borderRadius: "5px",
                        borderStyle: "solid",
                        justifyContent: "center",
                      }}
                    >
                      <option
                        value="sequential"
                        selected={unitType === "sequential"}
                      >
                        Tu???n t???
                      </option>
                      <option value="andGate" selected={unitType === "andGate"}>
                        C???ng AND
                      </option>
                      <option value="xorGate" selected={unitType === "xorGate"}>
                        C???ng XOR
                      </option>
                      <option value="rework" selected={unitType === "rework"}>
                        L???p
                      </option>
                    </select>
                    {unitType === "xorGate" && (
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <input
                          placeholder="%yes"
                          value={percentYes}
                          style={{
                            width: "50px",
                            borderColor: "#DDD8D8",
                            borderRadius: "5px",
                          }}
                          onChange={(e) => {
                            setPercentYes(e.target.value);
                          }}
                        ></input>
                        <input
                          placeholder="%no"
                          value={percentNo}
                          style={{
                            width: "50px",
                            borderColor: "#DDD8D8",
                            borderRadius: "5px",
                          }}
                          onChange={(e) => {
                            setPercentNo(e.target.value);
                          }}
                        ></input>
                      </div>
                    )}
                    {unitType === "rework" && (
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <input
                          placeholder="%"
                          value={percentYes}
                          style={{
                            width: "50px",
                            borderColor: "#DDD8D8",
                            borderRadius: "5px",
                          }}
                          onChange={(e) => {
                            setPercentYes(e.target.value);
                          }}
                        ></input>
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      width: "400px",
                    }}
                  >
                    <div>
                      <Select
                        isMulti
                        options={[
                          ...processInfo.listTask,
                          ...processInfo.listUnit,
                        ]
                          .filter((task) => {
                            if (task.nameTask) {
                              const isSelected = selectedTask.find(
                                (t) => t.value === task.nameTask
                              );
                              return !isSelected;
                            }
                            if (task.unitName) {
                              const isSelected = selectedTask.find(
                                (t) => t.value === task.unitName
                              );
                              return !isSelected;
                            }
                            return false;
                          })
                          .map((task) => {
                            return {
                              value: task?.nameTask
                                ? task.nameTask
                                : task.unitName,
                              label: task?.nameTask
                                ? task.nameTask
                                : task.unitName,
                            };
                          })}
                        onChange={(value) => {
                          setUnitTask(value);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <Button
                      disabled={isEdit}
                      style={{
                        background: "#168414",
                        width: "150px",
                        height: "40px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "50px",
                      }}
                      variant=""
                      onClick={() => {
                        if (unitName && unitType && unitTask) {
                          setProcessInfo({
                            ...processInfo,
                            listUnit: [
                              ...processInfo.listUnit,
                              {
                                unitName: unitName,
                                unitType: unitType,
                                unitTask: unitTask,
                                unitPercentYes: percentYes,
                                unitPercentNo: percentNo,
                              },
                            ],
                          });
                          setSelectedTask((prev) => {
                            const newList = [...prev];
                            for (const task of unitTask) {
                              if (!prev.find((t) => t.value === task.value)) {
                                newList.push(task);
                              }
                            }
                            return newList;
                          });
                          setUnitName(undefined);
                          setUnitType("sequential");
                          setUnitTask(undefined);
                          setPercentYes(undefined);
                          setPercentNo(undefined);
                        } else {
                          window.alert("Please fill all field!");
                        }
                      }}
                    >
                      <span style={{ width: 10 }}></span>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#ffffff",
                        }}
                      >
                        Th??m quan h???
                      </div>
                    </Button>
                  </td>
                </tr>
                {processInfo.listUnit.map((unit, index) => {
                  if (isEdit === unit.unitName)
                    return (
                      <tr>
                        <td>
                          <div
                            style={{
                              width: "200px",
                            }}
                          >
                            <input
                              value={unitNameEdit}
                              placeholder="T??n nh??m"
                              onChange={(e) => {
                                setUnitNameEdit(e.target.value);
                              }}
                              style={{
                                width: "200px",
                                height: "38px",
                                borderColor: "#DDD8D8",
                                borderRadius: "5px",
                                borderStyle: "solid",
                              }}
                            ></input>
                          </div>
                        </td>
                        <td
                          style={{
                            height: "38px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <select
                            value={unitTypeEdit}
                            onChange={(e) => {
                              setUnitTypeEdit(e.target.value);
                            }}
                            style={{
                              width: "100px",
                              borderColor: "#DDD8D8",
                              borderRadius: "5px",
                              borderStyle: "solid",
                              justifyContent: "center",
                            }}
                          >
                            <option
                              value="sequential"
                              selected={unitTypeEdit === "sequential"}
                            >
                              Tu???n t???
                            </option>
                            <option
                              value="andGate"
                              selected={unitTypeEdit === "andGate"}
                            >
                              C???ng AND
                            </option>
                            <option
                              value="xorGate"
                              selected={unitTypeEdit === "xorGate"}
                            >
                              C???ng XOR
                            </option>
                            <option
                              value="rework"
                              selected={unitTypeEdit === "rework"}
                            >
                              L???p
                            </option>
                          </select>
                          {unitTypeEdit === "xorGate" && (
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <input
                                value={percentYesEdit}
                                placeholder="%yes"
                                style={{
                                  width: "50px",
                                  borderColor: "#DDD8D8",
                                  borderRadius: "5px",
                                }}
                                onChange={(e) => {
                                  setPercentYesEdit(e.target.value);
                                }}
                              ></input>
                              <input
                                value={percentNoEdit}
                                placeholder="%no"
                                style={{
                                  width: "50px",
                                  borderColor: "#DDD8D8",
                                  borderRadius: "5px",
                                }}
                                onChange={(e) => {
                                  setPercentNoEdit(e.target.value);
                                }}
                              ></input>
                            </div>
                          )}
                          {unitTypeEdit === "rework" && (
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <input
                                value={percentYesEdit}
                                placeholder="%"
                                style={{
                                  width: "50px",
                                  borderColor: "#DDD8D8",
                                  borderRadius: "5px",
                                }}
                                onChange={(e) => {
                                  setPercentYesEdit(e.target.value);
                                }}
                              ></input>
                            </div>
                          )}
                        </td>
                        <td
                          style={{
                            width: "400px",
                          }}
                        >
                          <div>
                            <Select
                              isMulti
                              value={unitTaskEdit}
                              options={[
                                ...processInfo.listTask,
                                ...processInfo.listUnit,
                              ]
                                .filter((task) => {
                                  if (task.nameTask) {
                                    const isSelected = selectedTask.find(
                                      (t) => t.value === task.nameTask
                                    );
                                    return !isSelected;
                                  }
                                  if (task.unitName) {
                                    const isSelected = selectedTask.find(
                                      (t) => t.value === task.unitName
                                    );
                                    const isItSelf =
                                      task.unitName === unitNameEdit;
                                    return !isSelected && !isItSelf;
                                  }
                                  return false;
                                })
                                .map((task) => {
                                  return {
                                    value: task?.nameTask
                                      ? task.nameTask
                                      : task.unitName,
                                    label: task?.nameTask
                                      ? task.nameTask
                                      : task.unitName,
                                  };
                                })}
                              onChange={(value) => {
                                setUnitTaskEdit(value);
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <Button
                              style={{
                                background: "#395185",
                                width: "80px",
                                height: "38px",
                                border: "none",
                                marginRight: "10px",
                              }}
                              onClick={() => {
                                const unitIndex =
                                  processInfo.listUnit.findIndex(
                                    (u) => u.unitName === isEdit
                                  );
                                processInfo.listUnit[unitIndex].unitName =
                                  unitNameEdit;
                                processInfo.listUnit[unitIndex].unitType =
                                  unitTypeEdit;
                                processInfo.listUnit[unitIndex].unitTask =
                                  unitTaskEdit;
                                processInfo.listUnit[unitIndex].unitPercentYes =
                                  percentYesEdit;
                                processInfo.listUnit[unitIndex].unitPercentNo =
                                  percentNoEdit;
                                setSelectedTask((prev) => {
                                  const newList = [...prev];
                                  for (const task of unitTaskEdit) {
                                    if (
                                      !prev.find((t) => t.value === task.value)
                                    ) {
                                      newList.push(task);
                                    }
                                  }
                                  return newList;
                                });
                                setIsEdit(undefined);
                                setUnitNameEdit(undefined);
                                setUnitTypeEdit("sequential");
                                setUnitTaskEdit(undefined);
                                setPercentYesEdit(undefined);
                                setPercentNoEdit(undefined);
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#ffffff",
                                }}
                              >
                                L??u
                              </div>
                            </Button>
                            <Button
                              style={{
                                background: "#BC141E",
                                width: "80px",
                                height: "38px",
                                border: "none",
                              }}
                              onClick={() => {
                                if (window.confirm(`Delete ${isEdit}`)) {
                                  const newListUnit =
                                    processInfo.listUnit.filter(
                                      (u) => u.unitName !== isEdit
                                    );
                                  setProcessInfo((prev) => ({
                                    ...prev,
                                    listUnit: newListUnit,
                                  }));
                                  setIsEdit(undefined);
                                }
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#ffffff",
                                }}
                              >
                                X??a
                              </div>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  return (
                    <tr
                      style={{
                        borderCollapse: "separate",
                        borderSpacing: "50px",
                      }}
                    >
                      <td className="bodyTD" style={{ width: "200px" }}>
                        {unit.unitName}
                      </td>
                      <td className="bodyTD" style={{ width: "100px" }}>
                        {unit.unitType === "sequential" ? (
                          <span>Tu???n t???</span>
                        ) : unit.unitType === "andGate" ? (
                          <span>C???ng AND</span>
                        ) : unit.unitType === "xorGate" ? (
                          <span>
                            C???ng XOR <br></br>
                            {`%yes: ${unit.unitPercentYes}, %no:${unit.unitPercentNo}`}
                          </span>
                        ) : unit.unitType === "rework" ? (
                          <span>L???p</span>
                        ) : (
                          <span></span>
                        )}
                      </td>
                      <td className="bodyTD">
                        {unit.unitTask.map((task) => (
                          <span style={{ marginRight: "10px" }}>
                            {task.value}
                            <br></br>
                          </span>
                        ))}
                      </td>
                      <td>
                        <div style={{}}>
                          <Button
                            style={{
                              background: "#BC141E",
                              width: "100px",
                              height: "38px",
                              border: "none",
                              marginTop: "10px",
                            }}
                            onClick={() => {
                              setIsEdit(unit.unitName);
                              setUnitNameEdit(unit.unitName);
                              setUnitTypeEdit(unit.unitType);
                              setUnitTaskEdit(unit.unitTask);
                              setPercentYesEdit(unit.unitPercentYes);
                              setPercentNoEdit(unit.unitPercentNo);
                              setSelectedTask((prev) => {
                                const newList = prev.filter(
                                  (t) =>
                                    !unit.unitTask.find(
                                      (ut) => ut.value === t.value
                                    )
                                );
                                return newList;
                              });
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "#ffffff",
                              }}
                            >
                              S???a
                            </div>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
          {/* <div
            className="mt-3 text-center"
            style={{
              width: "75vw",
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "80%",
                marginTop: "5px",
              }}
            >
              <Select
                isMulti
                // options={[...processInfo.listUnit].map((task) => {
                //   return {
                //     value: task.unitName,
                //     label: task.unitName,
                //   };
                // })}
              />
            </div>
            <Button
              style={{
                background: "#395185",
                width: "100px",
                height: "38px",
                border: "none",
                marginTop: "5px",
                marginLeft: "20px",
              }}
              onClick={() => {}}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                L??u
              </div>
            </Button>
          </div> */}
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
                openModalCal();
              }}
              variant=""
            >
              <img src={redesign} height="30px" width="30px" />
              <span style={{ width: 10 }}></span>
              <div
                style={{ fontSize: 20, fontWeight: "bold", color: "#20297C" }}
              >
                T??nh to??n <br></br> hi???u n??ng
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
