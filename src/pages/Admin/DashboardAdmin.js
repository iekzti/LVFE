import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { baseApi } from "utils/api";
import DropdownButton from "../../components/DropdownButton";
import addUser from "../../resources/icons/addUser.svg";
import avatar from "../../resources/icons/avatar.svg";
import dashboard from "../../resources/icons/dashboard.svg";
import history from "../../resources/icons/history.svg";
import home from "../../resources/icons/home.svg";
import logout_icon from "../../resources/icons/logout_icon.svg";
import profile from "../../resources/icons/profile.svg";
import setting from "../../resources/icons/setting.svg";
import "../Dashboard/DashboardUser.css";

export default function DashboardAdmin() {
  Modal.setAppElement("div");
  const nav = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [modalAddUserIsOpen, setAddUserIsOpen] = useState(false);
  const [modalInfoIsOpen, setInfoIsOpen] = useState(false);
  const [modalAvatarIsOpen, setAvatarIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [users, setUsers] = useState([]);

  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");

  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    birth: "",
    email: "",
    address: "",
  });

  const [state, setState] = React.useState({
    preview: "",
    src: "",
  });

  function openModalAddUser() {
    setAddUserIsOpen(true);
  }

  function closeModalAddUser() {
    setAddUserIsOpen(false);
  }

  function openModalInfo(index) {
    setInfoIsOpen(true);
    getInfo(index);
  }

  function closeModalInfo() {
    setInfoIsOpen(false);
  }

  function onClose() {
    setState({ ...state, preview: null });
  }

  function onCrop(preview) {
    setState({ ...state, preview: preview });
  }

  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  function openModalAvatar() {
    setAvatarIsOpen(true);
  }

  function closeModalAvatar() {
    setAvatarIsOpen(false);
  }

  function handleClickDeleteUser(id) {
    setDeleteIsOpen(true);
    setId(id);
  }

  function closeModalDelete() {
    setDeleteIsOpen(false);
  }

  function getInfo(index) {
    setUserInfo(listUser[index]);
  }

  async function getUsers() {
    const endPoint = `${baseApi}/users`;

    try {
      const result = await axios
        .get(endPoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
      if (result.status === 200) {
        return setUsers(result.data);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DashboardAdmin.js ~ line 106 ~ getUsers ~ error",
        error
      );
    }
  }

  function resetForm() {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setAddress("");
    setBirth("");
  }

  async function handleClickAddUser() {
    resetForm();
    openModalAddUser();
  }

  async function handleAddUser() {
    if (password !== confirmPassword) return alert("Mật khẩu không khớp");

    const endPoint = `${baseApi}/users`;
    const data = {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      birth,
    };

    try {
      const result = await axios
        .post(endPoint, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
      if (result.status === 201) {
        getUsers();
        closeModalAddUser();
        resetForm(0);
        return;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DashboardAdmin.js ~ line 106 ~ getUsers ~ error",
        error
      );
    }
  }

  async function getUserById(id) {
    const endPoint = `${baseApi}/users/${id}`;

    try {
      const result = await axios
        .get(endPoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
      if (result.status === 200) {
        const user = result.data;
        setEmail(user.email);
        setPassword(user.password);
        setConfirmPassword(user.password);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setAddress(user.address);
        setBirth(user.birth);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DashboardAdmin.js ~ line 106 ~ getUsers ~ error",
        error
      );
    }
  }

  async function handleClickSeeInfo(id) {
    await getUserById(id);
    setId(id);
    setInfoIsOpen(true);
  }

  async function handleUpdateUser() {
    const endPoint = `${baseApi}/users/${id}`;
    const data = {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      birth,
    };

    try {
      const result = await axios
        .put(endPoint, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
      if (result.status === 201) {
        getUserById(id);
        return;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DashboardAdmin.js ~ line 106 ~ getUsers ~ error",
        error
      );
    }
  }

  async function handleDeleteUser() {
    const endPoint = `${baseApi}/users/${id}`;

    try {
      const result = await axios
        .delete(endPoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) nav("/login");
        });
      if (result.status === 200) {
        getUsers();
        setDeleteIsOpen(false);
        return;
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DashboardAdmin.js ~ line 106 ~ getUsers ~ error",
        error
      );
    }
  }

  useEffect(() => {
    getUsers();
    setListUser([
      {
        id: "user01",
        name: "Nguyễn Văn A",
        phoneNumber: "0123456789",
        birth: "2000-01-03",
        email: "vana@gmail.com",
        address: " TPHCM",
      },
      {
        id: "user02",
        name: "Nguyễn Văn B",
        phoneNumber: "0111222333",
        birth: "1999-02-04",
        email: "vanb@gmail.com",
        address: " AG",
      },
      {
        id: "user03",
        name: "Nguyễn Văn C",
        phoneNumber: "0123432112",
        birth: "1998-04-03",
        email: "vanc@gmail.com",
        address: " TD",
      },
      {
        id: "user04",
        name: "Nguyễn Văn D",
        phoneNumber: "0101010101",
        birth: "1998-01-02",
        email: "vand@gmail.com",
        address: " KG",
      },
    ]);
  }, []);

  return (
    <div className="row">
      <Modal
        isOpen={modalAddUserIsOpen}
        onRequestClose={closeModalAddUser}
        style={customStyles}
        appElement={document.getElementById("app")}
      >
        <div className="row">
          <div
            className="col-10"
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              textAlign: "center",
              marginLeft: "70px",
            }}
          >
            Thêm User
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
                closeModalAddUser();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div>
          {/* -------------------------------------------------------------------------- */
          /*                                     Họ                                     */
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
              Họ
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Họ"
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                     Ten                                    */
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
              Tên
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Tên"
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                    Email                                   */
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
              Email
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Email"
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                  Password                                  */
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
              Mật Khẩu
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Mật khẩu"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                              Confirm password                              */
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
              Xác nhận Mật Khẩu
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Xác nhận Mật khẩu"
                type={"password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                   Address                                  */
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
              Địa chỉ
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                    Phone                                   */
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
              Điện thoại
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Điện thoại"
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                    Birth                                   */
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
              Ngày sinh
            </div>
            <div
              style={{
                background: "white",
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                marginTop: "10px",
                backgroundColor: "#F2F2F2",
              }}
            >
              <input
                placeholder="Ngày sinh"
                type="date"
                onChange={(e) => setBirth(e.target.value)}
                style={{
                  background: "transparent",
                  borderTop: "1px",
                  borderLeft: "1px",
                  borderRight: "1px",
                  borderBottom: "1px",
                  outline: "none",
                  width: "100%",
                  padding: "5px",
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                 Luu button                                 */
          /* -------------------------------------------------------------------------- */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
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
              }}
              onClick={handleAddUser}
            >
              Lưu
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalInfoIsOpen}
        onRequestClose={closeModalInfo}
        style={customStyles}
        appElement={document.getElementById("app")}
      >
        <div className="row">
          <div
            className="col-10"
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              textAlign: "center",
              marginLeft: "70px",
            }}
          >
            Thông tin User
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
                closeModalInfo();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div>
          <div className="row">
            <div
              className="col"
              style={{
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
                marginTop: "70px",
              }}
              onClick={() => {
                openModalAvatar();
              }}
            >
              <img
                src={state.preview}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatar;
                }}
                style={{
                  width: "200px",
                  height: "200px",
                }}
              ></img>
            </div>
            <div className="col">
              {/* -------------------------------------------------------------------------- */
              /*                                  FirstName                                 */
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
                  Họ
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"userName_" + userInfo.id}
                    placeholder="Họ"
                    style={{
                      background: "transparent",
                      borderTop: "1px",
                      borderLeft: "1px",
                      borderRight: "1px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                                  LastName                                  */
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
                  Tên
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"userName_" + userInfo.id}
                    placeholder="Tên"
                    style={{
                      background: "transparent",
                      borderTop: "1px",
                      borderLeft: "1px",
                      borderRight: "1px",
                      borderBottom: "1px",
                      outline: "none",
                      width: "100%",
                      padding: "5px",
                    }}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                                    Phone                                   */
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
                  Số điện thoại
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    id={"userPhoneNumber_" + userInfo.id}
                    placeholder="Số điện thoại"
                    type={"tel"}
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
                    value={phone}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, phoneNumber: e.target.value });
                      setPhone(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              {/* -------------------------------------------------------------------------- */
              /*                                    Birth                                   */
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
                  Ngày sinh
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    width: "90%",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <input
                    type="date"
                    id={"userBirth_" + userInfo.id}
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
                    value={dayjs(birth).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      setBirth(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                    Email                                   */
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
              Email
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
                id={"userEmail_" + userInfo.id}
                placeholder="Email"
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
          </div>
          {/* -------------------------------------------------------------------------- */
          /*                                   address                                  */
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
              Địa chỉ
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
                id={"userAddress_" + userInfo.id}
                placeholder="Địa chỉ"
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
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></input>
            </div>
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
              background: "#68A2F8",
              width: "200px",
              height: "50px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "50px",
            }}
            variant=""
            onClick={handleUpdateUser}
          >
            <span style={{ width: 10 }}></span>
            <div
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Chỉnh sửa
            </div>
          </Button>
          <Button
            style={{
              background: "#FF4651",
              width: "200px",
              height: "50px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant=""
            onClick={() => {
              handleClickDeleteUser(id);
            }}
          >
            <span style={{ width: 10 }}></span>
            <div
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Xóa
            </div>
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={modalAvatarIsOpen}
        onRequestClose={closeModalAvatar}
        style={customStyles}
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
              closeModalAvatar();
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            width={390}
            height={390}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            src={state.src}
            style={{
              display: "flex",
              marginLeft: "50px",
            }}
          />

          <div style={{ width: 10 }}></div>

          <img
            src={state.preview}
            alt="Preview"
            style={{
              display: "flex",
              width: "40%",
              height: "40%",
              marginLeft: "50px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
            }}
            onClick={() => {
              closeModalAvatar();
            }}
          >
            Lưu
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalDeleteIsOpen}
        onRequestClose={closeModalDelete}
        style={deleteStyles}
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
                closeModalDelete();
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
            Bạn chắc chắn muốn xóa?
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
                background: "#68A2F8",
                width: "120px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "50px",
              }}
              variant=""
              onClick={()=>{
                handleDeleteUser();
                closeModalDelete();
                closeModalInfo();
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
                Xác nhận
              </div>
            </Button>
            <Button
              style={{
                background: "#FF4651",
                width: "120px",
                height: "30px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant=""
              onClick={() => {
                closeModalDelete();
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
                Hủy
              </div>
            </Button>
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
                nav("/historyAdmin");
              }}
            >
              <img
                src={history}
                height="24px"
                width="24px"
                style={{ marginRight: 10 }}
              />
              History
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
              onClick={handleClickAddUser}
            >
              <img
                src={addUser}
                style={{
                  height: "60px",
                  marginLeft: "10px",
                  marginRight: "5px",
                }}
              ></img>
              <div style={{ fontWeight: "bold" }}>Thêm user mới</div>
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
                  if (index === 1) {
                    localStorage.removeItem("access_token");
                    nav("/login");
                  }
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
              height: "500px",
            }}
          >
            <table
              style={{
                borderSpacing: "0 10px",
                borderCollapse: "separate",
                width: "100%",
              }}
            >
              <thead>
                <tr>
                  <td className="headTD">STT</td>
                  <td className="headTD">email</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "30px",
                    }}
                  >
                    <input
                      type="text"
                      id="header-search"
                      placeholder="Search name"
                      name="s"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {users
                  .sort((a, b) => a.id - b.id)
                  .filter((user) => user?.email?.includes(searchText))
                  .map((user, index) => (
                    <tr>
                      <td className="bodyTD">{index + 1}</td>
                      <td className="bodyTD" width={"500px"}>
                        {user.email}
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "150px",
                              fontSize: "18px",
                              fontWeight: "bold",
                              backgroundColor: "#68A2F8",
                              color: "#FFFFFF",
                              cursor: "pointer",
                              textAlign: "center",
                              justifyContent: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              marginRight: "100px",
                            }}
                            onClick={() => {
                              handleClickSeeInfo(user.id);
                            }}
                          >
                            Xem thông tin
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              backgroundColor: "#EF3030",
                              color: "#FFFFFF",
                              width: "150px",
                              cursor: "pointer",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              borderRadius: "5px",
                              paddingLeft: "20px",
                              paddingRight: "20px",
                              marginRight: "50px",
                            }}
                            onClick={() => {
                              handleClickDeleteUser(user.id);
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70vw",
    height: "550px",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  },
};

const deleteStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "25vw",
    height: "200px",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  },
};
