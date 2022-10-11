import axios from "axios";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { baseApi } from "utils/api";
import { Button } from "react-bootstrap";
import LogoUploadFile from "resources/icons/uploadfile.svg";
import { useRef } from "react";

function BusinessProcessForm({ isShow, onClose }) {
  const initForm = {
    name: "",
    topic: "Quy trình bán hàng",
    taskFile: "",
    BPMNFile: "",
  };
  const [businessProcessForm, setBusinessProcessForm] = useState(initForm);
  const nav = useNavigate();
  const inputFileBPMNRef = useRef();
  const inputFileTaskRef = useRef();

  const resetBusinessProcessForm = () => {
    setBusinessProcessForm(initForm);
  };

  const handleChangeBusinessProcessName = (e) => {
    setBusinessProcessForm((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleChangeBusinessProcessTopic = (e) => {
    setBusinessProcessForm((prev) => ({
      ...prev,
      topic: e.target.value,
    }));
  };

  const handleUploadBPMN = (e) => {
    setBusinessProcessForm((prev) => ({
      ...prev,
      BPMNFile: e.target.files[0],
    }));
  };

  const handleUploadFileTask = (e) => {
    setBusinessProcessForm((prev) => ({
      ...prev,
      taskFile: e.target.files[0],
    }));
  };

  const handleSaveBusinessProcess = async () => {
    const endpoint = `${baseApi}/file/upload`;

    /* ----------------------------- Upload TaskFile ---------------------------- */
    const formDataTaskFile = new FormData();
    formDataTaskFile.append("name", businessProcessForm.taskFile.name);
    formDataTaskFile.append("type", "task");
    formDataTaskFile.append("file", businessProcessForm.taskFile);

    const resultUploadTaskFile = await axios
      .post(endpoint, formDataTaskFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    /* ---------------------------- Upload BPMN File ---------------------------- */
    const formDataBPMNFile = new FormData();
    formDataBPMNFile.append("name", businessProcessForm.BPMNFile.name);
    formDataBPMNFile.append("type", "bpmn");
    formDataBPMNFile.append("file", businessProcessForm.BPMNFile);

    const resultUploadBPMNFile = await axios
      .post(endpoint, formDataBPMNFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    /* ------------------------- Create Business Process ------------------------ */
    if (
      resultUploadTaskFile.status === 201 &&
      resultUploadBPMNFile.status === 201
    ) {
      const endpoint = `${baseApi}/business-process`;

      const result = await axios
        .post(
          endpoint,
          {
            name: businessProcessForm.name,
            topic: businessProcessForm.topic,
            fileTaskName: resultUploadTaskFile.data.name,
            fileTaskPath: resultUploadTaskFile.data.url,
            fileBPMNName: resultUploadBPMNFile.data.name,
            fileBPMNPath: resultUploadBPMNFile.data.url,
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
        resetBusinessProcessForm();
        onClose();
      } else {
        console.log(
          "🚀 ~ file: Dashboard.js ~ line 568 ~ handleSaveBusinessProcess ~ result",
          result
        );
      }
    }
  };

  const onClickUploadFileBPMN = () => {
    inputFileBPMNRef.current.click();
  };

  const onClickUploadFileTask = () => {
    inputFileTaskRef.current.click();
  };

  return (
    <Modal
      isOpen={isShow}
      onRequestClose={onClose}
      style={styles.modal}
      contentLabel="Business Process Modal"
      appElement={document.getElementById("app")}
    >
      {/* -------------------------------------------------------------------------- */
      /*                                CLose Button                                */
      /* -------------------------------------------------------------------------- */}
      <div style={styles.buttonClose}>
        <button onClick={onClose}>X</button>
      </div>
      {/* -------------------------------------------------------------------------- */
      /*                                 Input name                                 */
      /* -------------------------------------------------------------------------- */}
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
        <div style={styles.inputContainer}>
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
            onChange={handleChangeBusinessProcessName}
          ></input>
        </div>
      </div>
      {/* -------------------------------------------------------------------------- */
      /*                                Select topic                                */
      /* -------------------------------------------------------------------------- */}
      <div
        style={{
          fontWeight: "bold",
          color: "#20297C",
          marginTop: "10px",
        }}
      >
        Vui lòng lựa chọn topic:
      </div>
      <div style={styles.inputContainer}>
        <select
          name="cars"
          id="cars"
          style={{
            width: "100%",
            height: "100%",
            paddingTop: 10,
            paddingBottom: 10,
            borderColor: '#f5f5f5',
            backgroundColor: '#f5f5f5'
          }}
          defaultValue={businessProcessForm.topic}
          onChange={handleChangeBusinessProcessTopic}
        >
          <option value="Quy trình bán hàng">Quy trình bán hàng</option>
          <option value="Quy trình quản lý">Quy trình quản lý</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        {/* -------------------------------------------------------------------------- */
        /*                           Button upload file task                          */
        /* -------------------------------------------------------------------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "250px",
          }}
        >
          <input
            type={"file"}
            id={"jsonFileInput"}
            ref={inputFileTaskRef}
            style={{ display: "none" }}
            onChange={handleUploadFileTask}
          />
          <Button style={{ background: "#20297C", width: "240px" }} variant="">
            {businessProcessForm?.taskFile ? (
              <div
                style={{
                  color: "white",
                }}
              >
                {businessProcessForm.taskFile.name}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  textDecoration: "row",
                }}
              >
                {" "}
                <div
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <img
                    src={LogoUploadFile}
                    background="#FFFFFF"
                    height="30px"
                    width="30px"
                  />
                </div>
                <div
                  style={{ color: "#FFFFFF" }}
                  onClick={() => {
                    onClickUploadFileTask();
                  }}
                >
                  Tải quy trình (Task)
                </div>
              </div>
            )}
          </Button>
        </div>
        {/* -------------------------------------------------------------------------- */
        /*                           Button upload file BPMN                          */
        /* -------------------------------------------------------------------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "250px",
          }}
        >
          <input
            type={"file"}
            id={"jsonFileInput"}
            ref={inputFileBPMNRef}
            style={{ display: "none" }}
            onChange={handleUploadBPMN}
          />
          <Button style={{ background: "#20297C", width: "100%" }} variant="">
            {businessProcessForm?.BPMNFile ? (
              <div
                style={{
                  color: "white",
                }}
              >
                {businessProcessForm.BPMNFile.name}
              </div>
            ) : (
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
                    src={LogoUploadFile}
                    background="#FFFFFF"
                    height="30px"
                    width="30px"
                  />
                </div>
                <div
                  style={{ color: "#FFFFFF", fontSize: "16px" }}
                  onClick={() => {
                    onClickUploadFileBPMN();
                  }}
                >
                  Tải lược đồ (BPMN)
                </div>
              </div>
            )}
          </Button>
        </div>
        {/* ------------------------------------ - ----------------------------------- */}
      </div>
      {/* -------------------------------------------------------------------------- */
      /*                                 Save button                                */
      /* -------------------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 20,
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
          }}
          onClick={handleSaveBusinessProcess}
        >
          Lưu
        </div>
      </div>
    </Modal>
  );
}

export default BusinessProcessForm;

const styles = {
  modal: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "40vw",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
      borderRadius: 10,
    },
  },
  buttonClose: {
    display: "flex",
    justifyContent: "flex-end",
  },
  inputContainer: {
    background: "white",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    marginTop: "10px",
    backgroundColor: '#f5f5f5'
  },
};
