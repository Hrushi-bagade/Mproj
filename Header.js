import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import userAvatar from "../assets/img/img1.jpg";
import notification from "../data/Notification";
import { Button, Modal } from "react-bootstrap";
import { loggedInUserFullName, saveToLocalStorage } from "../Utils/env";
import APIservice from "../Utils/APIservice";
import GlobalContext from "../dashboard/GlobalContext/GlobalContext";
import Select from "react-select";
import ChartsContext from "../dashboard/Charts/ChartContext";
import useRedirectToCompanyDash from "../hooks/RedirectoComDash";
import { useNotifications } from "../dashboard/AlertNotifiction/GetNotification/NotificationContext";
export default function Header({ onSkin }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const loggedInUsrId = localStorage.getItem("usrId");
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const [ModalMsg, setModalMsg] = useState("")
  const { companyData } = useContext(GlobalContext);
   const { isLoggedIn, login, logout,setIsLoggedIn } = useNotifications()
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));
  const toggleSidebar = (e) => {
    e.preventDefault();
    let isOffset = document.body.classList.contains("sidebar-offset");
    if (isOffset) {
      document.body.classList.toggle("sidebar-show");
    } else {
      if (window.matchMedia("(max-width: 991px)").matches) {
        document.body.classList.toggle("sidebar-show");
      } else {
        document.body.classList.toggle("sidebar-hide");
      }
    }
  }
  function NotificationList() {
    const notiList = notification.map((item, key) => {
      return (
        <li className="list-group-item" key={key}>
          <div className={(item.status === "online") ? "avatar online" : "avatar"}>{item.avatar}</div>
          <div className="list-group-body">
            <p>{item.text}</p>
            <span>{item.date}</span>
          </div>
        </li>
      )
    });
    return (
      <ul className="list-group">
        {notiList}
      </ul>
    );
  }
  const handleClose = () => {
    setShowModal(false)
  };
  const skinMode = (e) => {
    e.preventDefault();
    e.target.classList.add("active");
    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE)
        node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }
    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");
    if (skin === "dark") {
      HTMLTag.setAttribute("data-skin", skin);
      localStorage.setItem('skin-mode', skin);
      onSkin(skin);
    } else {
      HTMLTag.removeAttribute("data-skin");
      localStorage.removeItem('skin-mode');
      onSkin('');
    }
  };
  const sidebarSkin = (e) => {
    e.preventDefault();
    e.target.classList.add("active");
    let node = e.target.parentNode.firstChild;
    while (node) {
      if (node !== e.target && node.nodeType === Node.ELEMENT_NODE)
        node.classList.remove("active");
      node = node.nextElementSibling || node.nextSibling;
    }
    let skin = e.target.textContent.toLowerCase();
    let HTMLTag = document.querySelector("html");
    HTMLTag.removeAttribute("data-sidebar");
    if (skin !== "default") {
      HTMLTag.setAttribute("data-sidebar", skin);
      localStorage.setItem("sidebar-skin", skin);
    } else {
      localStorage.removeItem("sidebar-skin", skin);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("usrId");
    localStorage.removeItem("usrFullName");
    logout()
    // setIsLoggedIn(false)
  };

  //const [notCount,setNotCount]=useState("")
  const { MsgCount, setMsgCount, fetchLinkData } = useContext(GlobalContext)
  // const navigate = useNavigate();


  const handleEditProfile = () => {
    navigate(`/Home/dashboard/AddUserPage`, { state: { userId: loggedInUsrId } });
  }
  const handleNotifcationCount = () => {
    navigate("/Home/dashboard/NotificationPage")
    fetchLinkData()
    const loggedInUser = localStorage.getItem("usrId")
    const response = APIservice.GET(`SharedLink/UpdateAllNotificationViewStatusByUserId/${loggedInUser}`)
    if (response.success) {
      console.log(response)
      setMsgCount(0)
    }
  }

  // const handleSearch=(e)=>{
  //   console.log("123 line",e)
  //   setSearch(e)
  //   }
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDD(false); // Close the dropdown if the click is outside of it
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   APIservice.GET("TrackList/GetAllCompanies").then((response) => {
  //     if (response.success) {
  //       const ResponseData = response.data;
  //       const sortedCompanyData = ResponseData.sort((a, b) =>
  //         a.companyName?.localeCompare(b.companyName)
  //       );
  //       console.log("134 line", sortedCompanyData)
  //       setCompanyData(sortedCompanyData);
  //       setFilteredCompanies(sortedCompanyData); // Initialize filtered data with all companies
  //     } else {
  //       console.error("Error retrieving data:", response.message);
  //     }
  //   });
  // }, []);
  // const [companyData, setCompanyData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("3M India Limited");
  const [selectedCompanyID, setSelectedCompanyID] = useState("COM0000200");
  // const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState(companyData);
  const [cache, setCache] = useState({})
  const [openDD, setOpenDD] = useState(false);

  const { setDashCompanyId, setDataSource, widgets } = useContext(GlobalContext)
  const { companyStatus, setlatestFYEnd, setFSYMID, setCompanySataus } = useContext(ChartsContext);

  const handleSearch = (searchTerm) => {
    setOpenDD(true)
    setSearch(searchTerm);
    console.log("151 line", searchTerm)


  };

  const fetchCompData = () => {
    if (cache[search]) {
      setFilteredCompanies(cache[search])
      return;
    }
    APIservice.GET(`TrackList/GetAllCompanies/${search}?searhTerm=${search}`).then((response) => {
      if (response.success) {
        console.log("954  183 line", response.data)
        setFilteredCompanies(response.data)
        setCache(prev => ({ ...prev, [search]: response?.data }))
      } else {
        console.log(" 133 line ERROR")
      }
    }).finally(() => {

    });
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompData();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);


  const navigateNotification = () => {
    navigate(`/Home/dashboard/NotificationList`);
  }
  const { redirectToCompanyDash } = useRedirectToCompanyDash();

  const handleCompanySelect = (company) => {


    setFSYMID(company.FsymId)
    setlatestFYEnd(company.latestFyEnd)
    setOpenDD(false)
    setSearch(company.CmpName);
    setFilteredCompanies([]);
    console.log("165 line", company)
    // if (company.Covered == "1"||company.covered==="0"|| company?.RESEARCH_FROM=="UDR"|| company?.research_from=="UDR") {
    //   const CompDetail={
    //     "FysmId":company.FsymId,
    //     "latestFyEnd":company.latestFyEnd
    //   }
    //   saveToLocalStorage("CompDetail",CompDetail)
    //   navigate("/Home/dashboard/CompanyDashboard", {
    //     state: {
    //       companyID: company.CmpId,
    //       companyName: company.CmpName,
    //       companyStatus: company.Covered,
    //       dataSource: 'MA'
    //     }
    //   }
    //   );
    // }
    // else if (company.Covered == "2") {
    //   setModalMsg("Company Data is Outdated")
    //   setShowModal(true)
    // }
    // else {
    //   setModalMsg("Company is not covered in Markas")
    //   setShowModal(true)
    // }

    if (company?.RESEARCH_FROM == "MA" || company?.research_from == "MA" || company?.reseachFrom == "MA") {
      debugger
      if (company.covered === "0" || company?.Covered === "0") {
        setShowModal(true)
        setModalMsg("Company is not covered in Markas")
      }
      else if
        (company?.covered === "1" || company?.Covered === "1") {

        const CompDetail = {
          "FysmId": company.FsymId,
          "latestFyEnd": company.latestFyEnd
        }
        saveToLocalStorage("CompDetail", CompDetail)
        navigate(`/Home/dashboard/CompanyDashboard?id=${company?.FsymId}`, {
          state: {
            companyID: company.CmpId,
            companyName: company.CmpName,
            companyStatus: company.Covered,
            dataSource: company?.RESEARCH_FROM || company?.research_from,
            latestFyEnd: company?.latestFyEnd,
            FsymId: company?.FsymId
          }
        }
        );
      }
    } else if (company?.RESEARCH_FROM == "UDR" || company?.research_from == "UDR" || company?.reseachFrom == "UDR") {
      debugger
      navigate(`/Home/dashboard/Automated?id=${company?.FsymId}`)
    }


    else {
      console.log("ERROR")
    }



    // if(company.covered==="0"|| company?.RESEARCH_FROM=="UDR"|| company?.research_from=="UDR"){
    //       // setCompanyName(row.Company)
    //       setShowModal(true)
    //       setModalMsg("Company is not covered in Markas")
    //     }else if(company.covered==="2"){
    //       // setCompanyName(row.Company)
    //       setShowModal(true)
    //       setModalMsg("Company is not covered in Markas")
    //     }else{
    //       const CompDetail={
    //         "FysmId":company.FsymId,
    //         "latestFyEnd":company.latestFyEnd
    //       }
    //       saveToLocalStorage("CompDetail",CompDetail)
    //       navigate(`/Home/dashboard/CompanyDashboard?id=${company?.FsymId}`, {
    //         state: {
    //           companyID: company.CmpId,
    //           companyName: company.CmpName,
    //           companyStatus: company.Covered,
    //           dataSource: 'MA',
    //           latestFyEnd:company?.latestFyEnd,
    //           FsymId:company?.FsymId
    //         }
    //       }
    //       );
    //     }
    // You can also set the selected company to another state or take any action
  };


  return (
    <div className="header-main px-3 px-lg-4">
      <Link onClick={toggleSidebar} className="menu-link me-3 me-lg-4"><i className="ri-menu-2-fill"></i></Link>
      {<div className="me-auto">
        {/*<input type="text" className="form-control" placeholder="Search" />
        <i className="ri-search-line"></i>*/}


        <Link to="/Home/dashboard/Dashboardhome"><div>
          <img src={require('../imagesMultiAct/Multi-Act.png')} style={{ width: "70px" }}></img>
        </div>
        </Link>
        {/* 
        <div>
          <img src={require('../imagesMultiAct/Multi-Act.png')} style={{ width: "70px" }}></img>
        </div> */}

      </div>}

      <Dropdown className="dropdown-skin" align="end" ref={dropdownRef}>
        <div className="form-search me-auto">

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="form-control"
            placeholder="Search Company"
            style={{ marginLeft: "0px" }}
          />


          <i className="ri-search-line"></i>
        </div>
        {openDD && (
          <ul className="list-group" style={{ marginTop: '2px', maxHeight: '200px', overflowY: 'auto' }}>
            {filteredCompanies?.map((company) => {
              // console.log("219 line",company)

              return (<>
                <li
                  key={company.CmpId} // Use a unique key for each company
                  className="list-group-item"
                  onClick={() => redirectToCompanyDash(company)}
                  style={{ cursor: 'pointer' }}
                >
                  {company.CmpName}
                </li>
              </>)

            })}
          </ul>
        )}

        {/*<Dropdown.Toggle as={CustomToggle}>
          <i className="ri-settings-3-line"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <label>Skin Mode</label>
          <nav className="nav nav-skin">
            <Link onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link" : "nav-link active"}>Light</Link>
            <Link onClick={skinMode} className={localStorage.getItem("skin-mode") ? "nav-link active" : "nav-link"}>Dark</Link>
          </nav>
          <hr />
          <label>Sidebar Skin</label>
          <nav id="sidebarSkin" className="nav nav-skin">
            <Link onClick={sidebarSkin} className={!(localStorage.getItem("sidebar-skin")) ? "nav-link active" : "nav-link"}>Default</Link>
            <Link onClick={sidebarSkin} className={(localStorage.getItem("sidebar-skin") === "prime") ? "nav-link active" : "nav-link"}>Prime</Link>
            <Link onClick={sidebarSkin} className={(localStorage.getItem("sidebar-skin") === "dark") ? "nav-link active" : "nav-link"}>Dark</Link>
          </nav>
        </Dropdown.Menu>*/}
      </Dropdown>
      {/* <Link to="/" onClick={handleLogout}><Button >Log Out</Button></Link> */}
      <Dropdown className="dropdown-notification ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          {/* <Link to="/Home/dashboard/NotificationPage"><small>3</small><i className="ri-notification-3-line"></i></Link> */}
          <small>{MsgCount}</small><i onClick={handleNotifcationCount} className="ri-notification-3-line"></i>
        </Dropdown.Toggle>
        {/* <Dropdown.Menu className="mt-10-f me--10-f">
          <div className="dropdown-menu-header">
            <h6 className="dropdown-menu-title">Notifications</h6>
          </div>
          {NotificationList()}
          <div className="dropdown-menu-footer"><Link to="#">Show all Notifications</Link></div>
        </Dropdown.Menu> */}
      </Dropdown>
      <Dropdown style={{ margin: 0 }} className="dropdown-profile ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <div className="avatar online">
            <img src={userAvatar} alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ margin: 0 }} className="mt-10-f">
          <div className="dropdown-menu-body">
            <div className="avatar avatar-xl online mb-3"><img src={userAvatar} alt="" /></div>
            <h5 className="mb-1 text-dark fw-semibold">{localStorage.getItem("usrFullName")}</h5>
            {/* <p className="fs-sm text-secondary">Premium Member</p> */}
            <nav className="nav">
              <Link to="/Home/dashboard/AddUserPage" state={{ userId: loggedInUsrId }}><i className="ri-edit-2-line"></i> Edit Profile</Link>
              <Link to="/Home/dashboard/AddUserPage" onClick={handleEditProfile}><i className="ri-profile-line"></i> View Profile</Link>
            </nav>
            <hr />
            <nav className="nav">
              <Link to="/Home/dashboard/NotificationList"><i className="ri-notification-2-line"></i>User Notification</Link>
              <Link to="/Home/dashboard/contentManagement"><i className="ri-list-check"></i> User Guide</Link>
              <Link to="/Home/dashboard/FAQ"><i className="ri-question-line"></i> Help Center</Link>
              {/* <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
              <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link> */}
              <Link to="/" onClick={handleLogout}><i className="ri-logout-box-r-line"></i> Log Out</Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <Modal
        centered
        show={showModal}
        dialogClassName="modal-dialogcentered"
        onHide={handleClose}
        className="mx-11"
        style={{ zIndex: 110000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{search}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <h5>Company is not covered in Markas</h5> */}
          <h5>{ModalMsg}</h5>

        </Modal.Body>
      </Modal>
    </div>
  )
}