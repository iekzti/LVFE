import axios from "axios";
import fileDownload from "js-file-download";
import React, { useEffect, useRef, useState } from "react";
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
import setting from "../../resources/icons/setting.svg";
import "./DashboardUser.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/diagram-js.css";
import BusinessProcessForm from "components/BusinessProcessForm";
import BusinessRuleForm from "components/BusinessRuleForm";
import ClassificationRuleForm from "components/ClassificationRuleForm";
import { baseApi } from "utils/api";

export default function DashboardUser() {
  Modal.setAppElement("div");

  const [searchTextProcess, setSearchTextProcess] = React.useState("");
  const [typeSearchProcess, setTypeSearchProcess] = React.useState("name");
  const [searchTextDiagram, setSearchTextDiagram] = React.useState("");
  const [typeSearchDiagram, setTypeSearchDiagram] = React.useState("name");
  const [searchTextClassification, setSearchTextClassification] =
    React.useState("");
  const [typeSearchClassification, setTypeSearchClassification] =
    React.useState("name");
  const [searchTextBusiness, setSearchTextBusiness] = React.useState("");
  const [typeSearchBusiness, setTypeSearchBusiness] = React.useState("name");
  const nav = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                Handle login                                */
  /* -------------------------------------------------------------------------- */
  const checkLogin = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) nav("/login");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                  New code                                  */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                              Business process                              */
  /* -------------------------------------------------------------------------- */
  const [listBPs, setListBPs] = useState([]);
  const [isShowBPModal, setIsShowBPModal] = useState(false);

  const getListBPs = async () => {
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
      setListBPs(result.data);
    }
  };

  useEffect(() => {
    getListBPs();
  }, []);

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

  const handleDeleteBP = async (id) => {
    if (!window.confirm(`Delete Business Process ${id}`)) return;

    const endpoint = `${baseApi}/business-process/${id}`;

    const result = await axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      getListBPs();
      getListCRs();
      getListBRs();
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                Business Rule                               */
  /* -------------------------------------------------------------------------- */
  const [listBRs, setListBRs] = useState([]);
  const [isShowBRModal, setIsShowBRModal] = useState(false);

  const getListBRs = async () => {
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
      setListBRs(result.data);
    }
  };

  const handleDeleteBR = async (id) => {
    if (!window.confirm(`Delete Business Rule ${id}`)) return;

    const endpoint = `${baseApi}/business-rule/${id}`;

    const result = await axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      getListBRs();
    }
  };

  useEffect(() => {
    getListBRs();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                             Classification rule                            */
  /* -------------------------------------------------------------------------- */
  const [listCRs, setListCRs] = useState([]);
  const [isShowCRModal, setIsShowCRModal] = useState(false);

  const getListCRs = async () => {
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
      setListCRs(result.data);
    }
  };

  const handleDeleteCR = async (id) => {
    const endpoint = `${baseApi}/classification-rule/${id}`;

    const result = await axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 401) nav("/login");
      });

    if (result.status === 200) {
      getListCRs(result.data);
    }
  };

  useEffect(() => {
    getListCRs();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                End new Code                                */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="row">
      <BusinessProcessForm
        isShow={isShowBPModal}
        onClose={() => {
          setIsShowBPModal(false);
          getListBPs();
        }}
      />

      <ClassificationRuleForm
        isShow={isShowCRModal}
        onClose={() => {
          setIsShowCRModal(false);
          getListBRs();
        }}
      />

      <BusinessRuleForm
        isShow={isShowBRModal}
        onClose={() => {
          setIsShowBRModal(false);
          getListCRs();
        }}
        BPs={listBPs}
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

      {/* -------------------------------------------------------------------------- */
      /*                                   Content                                  */
      /* -------------------------------------------------------------------------- */}
      <div
        className="col-10"
        style={{
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <div className="row  p-4 m-0 p-0">
          {/* -------------------------------------------------------------------------- */
          /*                                 User button                                */
          /* -------------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
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
                  if (index === 1) {
                    localStorage.removeItem("access_token");
                    nav("/login");
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
              margin: 0,
              padding: 0,
              marginTop: "40px",
            }}
          >
            {/* -------------------------------------------------------------------------- */
            /*                            Add Business Process                            */
            /* -------------------------------------------------------------------------- */}
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
            {/* -------------------------------------------------------------------------- */
            /*                           Add Classification Rule                          */
            /* -------------------------------------------------------------------------- */}
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
            {/* -------------------------------------------------------------------------- */
            /*                              Add Business Rule                             */
            /* -------------------------------------------------------------------------- */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                padding: 0,
                margin: 0,
              }}
            >
              <input style={{ display: "none" }} type="file" />
              <ImportButton
                text="Add Business Rule"
                image={gg_file}
                onClick={() => {
                  setIsShowBRModal(true);
                }}
              />
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                           Business process table                           */
          /* -------------------------------------------------------------------------- */}
          <div
            className="text-center"
            style={{
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
              marginTop: 40,
              overflowY: "scroll",
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
                {listBPs
                  .sort((a, b) => a.idc - b.id)
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
                              nav("/processInfo", { state: { businessProcessId: file.id } });
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
                            onClick={() =>
                              handleDownloadFile(
                                file.fileTaskPath,
                                file.fileTaskName
                              )
                            }
                          >
                            Tải xuống
                          </div>
                          <div
                            onClick={() => handleDeleteBP(file.id)}
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

          {/* -------------------------------------------------------------------------- */
          /*                             Table BPMN diagram                             */
          /* -------------------------------------------------------------------------- */}
          <div
            className="text-center"
            style={{
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
              marginTop: 40,
              overflowY: "scroll",
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
                {listBPs
                  .sort((a, b) => a.id - b.id)
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
                        Lược đồ {file.name}
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
                              nav("/business-process-diagram", {
                                state: { file },
                              });
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
                            onClick={() =>
                              handleDownloadFile(
                                file.fileBPMNPath,
                                file.fileBPMNName
                              )
                            }
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
          {/* -------------------------------------------------------------------------- */
          /*                             Table Business Rule                            */
          /* -------------------------------------------------------------------------- */}
          <div
            className="text-center"
            style={{
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
              marginTop: 40,
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
                {listBRs
                  .sort((a, b) => a.id - b.id)
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
                            onClick={() =>
                              handleDownloadFile(file.filePath, file.fileName)
                            }
                          >
                            Tải xuống
                          </div>
                          <div
                            onClick={() => handleDeleteBR(file.id)}
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
          {/* -------------------------------------------------------------------------- */
          /*                          Table Classification Rule                         */
          /* -------------------------------------------------------------------------- */}
          <div
            className="text-center"
            style={{
              backgroundColor: "white",
              boxShadow: "5px 5px 5px 5px #c7c7c7",
              borderRadius: "10px",
              height: "400px",
              marginTop: 40,
              overflowY: "scroll",
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
                {listCRs
                  .sort((a, b) => a.id - b.id)
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
                            onClick={() =>
                              handleDownloadFile(file.filePath, file.fileName)
                            }
                          >
                            Tải xuống
                          </div>
                          <div
                            onClick={() => handleDeleteCR(file.id)}
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
