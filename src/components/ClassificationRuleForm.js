import axios from "axios";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { baseApi } from "utils/api";
import { Button } from "react-bootstrap";
import LogoUploadFile from "resources/icons/uploadfile.svg";
import { useRef } from "react";

function ClassificationRuleForm({ isShow, onClose }) {
  const initForm = {
    name: "",
    topic: "Quy trình bán hàng",
    file: "",
  };
  const [form, setForm] = useState(initForm);
  const nav = useNavigate();
  const inputFile = useRef();

  const resetForm = () => {
    setForm(initForm);
  };

  const handleChangeName = (e) => {
    setForm((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleChangeTopic = (e) => {
    setForm((prev) => ({
      ...prev,
      topic: e.target.value,
    }));
  };

  const handleUploadFile = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSave = async () => {
    if (!form.file || !form.name || !form.file) return

    const endpoint = `${baseApi}/file/upload`;

    /* ----------------------------- Upload TaskFile ---------------------------- */
    const formToSend = new FormData();
    formToSend.append("name", form.file.name);
    formToSend.append("type", "task");
    formToSend.append("file", form.file);

    const resultUploadFile = await axios
      .post(endpoint, formToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    /* ------------------------- Create Classification Rule ------------------------ */
    if (
      resultUploadFile.status === 201 
    ) {
      const endpoint = `${baseApi}/classification-rule`;

      const result = await axios
        .post(
          endpoint,
          {
            name: form.name,
            topic: form.topic,
            fileName: resultUploadFile.data.name,
            filePath: resultUploadFile.data.url,
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
        resetForm();
        onClose();
      } else {
        console.log(
          "🚀 ~ file: Dashboard.js ~ line 568 ~ handleSaveBusinessProcess ~ result",
          result
        );
      }
    }
  };

  const onClickUploadFile = () => {
    inputFile.current.click();
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
          Vui lòng nhập tên luật phân lớp:
        </div>
        <div style={styles.inputContainer}>
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
            onChange={handleChangeName}
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
          defaultValue={form.topic}
          onChange={handleChangeTopic}
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
        /*                           Button upload file                               */
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
            ref={inputFile}
            style={{ display: "none" }}
            onChange={handleUploadFile}
          />
          <Button style={{ background: "#20297C", width: "100%" }} variant="">
            {form?.BPMNFile ? (
              <div
                style={{
                  color: "white",
                }}
              >
                {form.BPMNFile.name}
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
                    onClickUploadFile();
                  }}
                >
                  Tải luật phân lớp
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
          onClick={handleSave}
        >
          Lưu
        </div>
      </div>
    </Modal>
  );
}

export default ClassificationRuleForm;

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
