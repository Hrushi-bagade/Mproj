// import React, { Component, useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import userAvatar from "../assets/img/img1.jpg";
// import {
//     dashboardMenu,
//     applicationsMenu,
//     pagesMenu,
//     uiElementsMenu
// } from "../data/Menu";
// import GlobalContext from "../dashboard/GlobalContext/GlobalContext";

// export default class Sidebar extends Component {
//     toggleFooterMenu = (e) => {
//         e.preventDefault();
//         let parent = e.target.closest(".sidebar");
//         parent.classList.toggle("footer-menu-show");
//     }

//     render() {
//         return (
//             <div className="sidebar" >
//                 <div className="sidebar-header" style={{ borderBottomColor: "#F1C232",borderBottomWidth:2, borderBottomStyle:"solid",background:"white " }}>
//                     <Link to="/Home/dashboard/Dashboardhome" className="sidebar-logo">MV3</Link>
//                 </div>
//                 <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref} style={{ borderRightColor: "#F1C232",borderRightWidth:2, borderRightStyle:"solid" }}>
//                     <SidebarMenu onUpdateSize={() => this._scrollBarRef.updateScroll()} />
//                 </PerfectScrollbar>
//                 {/* <div className="sidebar-footer">
//                     <div className="sidebar-footer-top">
//                         <div className="sidebar-footer-thumb">
//                             <img src={userAvatar} alt="" />
//                         </div>
//                         <div className="sidebar-footer-body">
//                             <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
//                             <p>Premium Member</p>
//                         </div>
//                         <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
//                     </div>
//                     <div className="sidebar-footer-menu">
//                         <nav className="nav">
//                             <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
//                             <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
//                         </nav>
//                         <hr />
//                         <nav className="nav">
//                             <Link to=""><i className="ri-question-line"></i> Help Center</Link>
//                             <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
//                             <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
//                             <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
//                         </nav>
//                     </div>
//                 </div> */}
//             </div>
//         )
//     }
// }

// class SidebarMenu extends Component {
//     //const {dashboardMenu}=useContext(GlobalContext)
//     populateMenu = (m) => {
//         console.log("61 line",m)
//         const menu = m?.map((m, key) => {
//             let sm;
//             if (m?.submenu) {
//                 sm = m?.submenu?.map((sm, key) => {
//                     return (
//                         <NavLink to={sm?.link} className="nav-sub-link" key={key}>{sm?.label}</NavLink>
//                     )
//                 })
//             }

//             return (
//                 <li key={key} className="nav-item">
//                     {(!sm) ? (
//                         <NavLink to={m?.link} className="nav-link"><i className={m?.icon}></i> <span>{m?.label}</span></NavLink>
//                     ) : (
//                         <div onClick={this.toggleSubMenu} className="nav-link has-sub"><i className={m?.icon}></i> <span>{m?.label}</span></div>
//                     )}
//                     {m?.submenu && <nav className="nav nav-sub">{sm}</nav>}
//                 </li>
//             )
//         });

//         return (
//             <ul className="nav nav-sidebar">
//                 {menu}
//             </ul>
//         );
//     }

//     // Toggle menu group
//     toggleMenu = (e) => {
//         e.preventDefault();

//         let parent = e.target.closest('.nav-group');
//         parent.classList.toggle('show');

//         this.props.onUpdateSize();
//     }

//     // Toggle submenu while closing siblings' submenu
//     toggleSubMenu = (e) => {
//         e.preventDefault();

//         let parent = e.target.closest('.nav-item');
//         let node = parent.parentNode.firstChild;

//         while (node) {
//             if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
//                 node.classList.remove('show');
//             node = node.nextElementSibling || node.nextSibling;
//         }

//         parent.classList.toggle('show');

//         this.props.onUpdateSize();
//     }
//     render() {
//         return (
//             <GlobalContext.Consumer>
//                 {({ dashboardMenu }) => (
//                     this.populateMenu(dashboardMenu)
//                 )}
//             </GlobalContext.Consumer>
//         );
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <div className="nav-group show">
//                     <div className="nav-label" onClick={this.toggleMenu}>Dashboard</div>
//                     {this.populateMenu(dashboardMenu)}
//                 </div>
//                 {/*<div className="nav-group show">
//                     <div className="nav-label" onClick={this.toggleMenu}>Applications</div>
//                     {this.populateMenu(applicationsMenu)}
//                 </div>
//                 <div className="nav-group show">
//                     <div className="nav-label" onClick={this.toggleMenu}>Pages</div>
//                     {this.populateMenu(pagesMenu)}
//                 </div>
//                 <div className="nav-group show">
//                     <div className="nav-label" onClick={this.toggleMenu}>UI Elements</div>
//                     {this.populateMenu(uiElementsMenu)}
//                 </div>*/}
//             </React.Fragment>
//         )
//     }
// }

// window.addEventListener("click", function (e) {
//     // Close sidebar footer menu when clicked outside of it
//     let tar = e.target;
//     let sidebar = document.querySelector(".sidebar");
//     if (!tar.closest(".sidebar-footer") && sidebar) {
//         sidebar.classList.remove("footer-menu-show");
//     }

//     // Hide sidebar offset when clicked outside of sidebar
//     if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
//         document.querySelector("body").classList.remove("sidebar-show");
//     }
// });

// window.addEventListener("load", function () {
//     let skinMode = localStorage.getItem("sidebar-skin");
//     let HTMLTag = document.querySelector("html");

//     if (skinMode) {
//         HTMLTag.setAttribute("data-sidebar", skinMode);
//     }
// });











import React, { Component, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import {
    //dashboardMenu,
    applicationsMenu,
    pagesMenu,
    uiElementsMenu
} from "../data/Menu";
import GlobalContext from "../dashboard/GlobalContext/GlobalContext";

export default class Sidebar extends Component {
    toggleFooterMenu = (e) => {
        e.preventDefault();
        let parent = e.target.closest(".sidebar");
        parent.classList.toggle("footer-menu-show");
    }

    render() {
        return (
            <div className="sidebar" >
                <div className="sidebar-header" style={{ borderBottomColor: "#F1C232", borderBottomWidth: 2, borderBottomStyle: "solid", background: "white " }}>
                    <Link to="/Home/dashboard/Dashboardhome" className="sidebar-logo">MARKAS</Link>
                    {/* <div className="sidebar-logo">MARKAS</div> */}
                </div>
                <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref} style={{ borderRightColor: "#F1C232", borderRightWidth: 2, borderRightStyle: "solid" }}>
                    <SidebarMenu onUpdateSize={() => this._scrollBarRef.updateScroll()} />
                </PerfectScrollbar>
                {/* <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="sidebar-footer-body">
                            <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
                            <p>Premium Member</p>
                        </div>
                        <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
                    </div>
                    <div className="sidebar-footer-menu">
                        <nav className="nav">
                            <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
                            <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
                        </nav>
                        <hr />
                        <nav className="nav">
                            <Link to=""><i className="ri-question-line"></i> Help Center</Link>
                            <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
                            <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
                            <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
                        </nav>
                    </div>
                </div> */}
            </div>
        )
    }
}

class SidebarMenu extends Component {
    //const {dashboardMenu} =useContext(GlobalContext)
    static contextType = GlobalContext;

    populateMenu = (m) => {
        console.log("61 line", m)
        const menu = m?.map((mItem, key) => {
            let sm;
            let sma;

            if (mItem?.submenu.length > 0) {

                sm = mItem.submenu.map((smItem, smKey) => {
                    if (smItem.submenu.length > 0) {
                        sma = smItem.submenu.map((smaItem, smaKey) => {
                            console.log("smaItem ", smaItem)
                            return (
                                <NavLink to={smaItem.link}  onClick={() => this.context.setSelectedMenuItem(smaItem)} className="nav-sub-link" key={smaKey}>
                                    {smaItem.label}
                                </NavLink>
                            );
                        });
                    }

                    return (
                        <li key={smKey} className="nav-item">
                            {(!sm) ? (
                                <NavLink to={smItem.link} onClick={() => this.context.setSelectedMenuItem(smItem)} className="nav-sub-link">
                                    {smItem.label}
                                </NavLink>
                            ) : (
                                <div onClick={this.toggleSubMenu} className="nav-link has-sub">
                                    <i className={smItem.icon}></i> <span>{smItem.label}</span>
                                </div>
                            )}
                            {smItem.submenu && <nav className="nav nav-sub">{sma}</nav>}
                        </li>
                        // <li key={smKey} className="nav-sub-item">
                        //     <NavLink to={smItem.link} className="nav-sub-link">
                        //         {smItem.label}
                        //     </NavLink>

                        //     {smItem.submenu && <nav className="nav nav-sub">{sma}</nav>}
                        // </li>
                    );
                });
            }

            return (
                <li key={key} className="nav-item">
                    {(!sm) ? (
                        <NavLink to={mItem.link} onClick={() => this.context.setSelectedMenuItem(mItem)} className="nav-link">
                            <i className={mItem.icon}></i> <span>{mItem.label}</span>
                        </NavLink>
                    ) : (
                        <div onClick={this.toggleSubMenu} className="nav-link has-sub">
                            <i className={mItem.icon}></i> <span>{mItem.label}</span>
                        </div>
                    )}
                    {mItem.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            );
        });

        return (
            <ul className="nav nav-sidebar">
                {menu}
            </ul>
        );
    }

    // populateMenu = (m) => {
    //     const menu = m.map((m, key) => {
    //         let sm;
    //         let sma;
    //         if (m.submenu) {
    //             sm = m.submenu.map((sm, key) => {
    //                 if(sm.submenu){
    //                     sma = sm.submenu.map((sm, key) => {
    //                         return (
    //                             <NavLink to={sm.link} className="nav-sub-link" key={key}>{sm.label}</NavLink>
    //                         )
    //                     })
    //                 }
    //                 return (
    //                     <NavLink to={sm.link} className="nav-sub-link" key={key}>{sm.label}</NavLink>
    //                 )
    //             })
    //         }

    //         return (
    //             <li key={key} className="nav-item">
    //                 {(!sm) ? (
    //                     <NavLink to={m.link} className="nav-link"><i className={m.icon}></i> <span>{m.label}</span></NavLink>
    //                 ) : (
    //                     <div onClick={this.toggleSubMenu} className="nav-link has-sub"><i className={m.icon}></i> <span>{m.label}</span></div>
    //                 )}
    //                 {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
    //                 {m.submenu && <nav className="nav nav-sub">{sma}</nav>}
    //             </li>
    //         )
    //     });

    //     return (
    //         <ul className="nav nav-sidebar">
    //             {menu}
    //         </ul>
    //     );
    // }

    // Toggle menu group
    toggleMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-group');
        parent.classList.toggle('show');

        this.props.onUpdateSize();
    }

    // Toggle submenu while closing siblings' submenu
    toggleSubMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-item');
        let node = parent.parentNode.firstChild;

        while (node) {
            if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
                node.classList.remove('show');
            node = node.nextElementSibling || node.nextSibling;
        }

        parent.classList.toggle('show');

        this.props.onUpdateSize();
    }

    render() {

        const { dashboardMenu } = this.context;

        return (
            <React.Fragment>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>Dashboard</div>
                    {this.populateMenu(dashboardMenu)}
                </div>
                {/*<div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>Applications</div>
                    {this.populateMenu(applicationsMenu)}
                </div>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>Pages</div>
                    {this.populateMenu(pagesMenu)}
                </div>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>UI Elements</div>
                    {this.populateMenu(uiElementsMenu)}
                </div>*/}
            </React.Fragment>
        )
    }
}

window.addEventListener("click", function (e) {
    // Close sidebar footer menu when clicked outside of it
    let tar = e.target;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document.querySelector("body").classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag.setAttribute("data-sidebar", skinMode);
    }
});








// import React, { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import userAvatar from "../assets/img/img1.jpg";
// import {
//     // dashboardMenu,
//     applicationsMenu,
//     pagesMenu,
//     uiElementsMenu
// } from "../data/Menu";
// import GlobalContext from "../dashboard/GlobalContext/GlobalContext";

// export default class Sidebar extends React.Component {
//     toggleFooterMenu = (e) => {
//         e.preventDefault();
//         let parent = e.target.closest(".sidebar");
//         parent.classList.toggle("footer-menu-show");
//     }

//     render() {
//         return (
//             <div className="sidebar">
//                 <div className="sidebar-header" style={{ borderBottomColor: "#F1C232", borderBottomWidth: 2, borderBottomStyle: "solid", background: "white" }}>
//                     <Link to="/Home/dashboard/Dashboardhome" className="sidebar-logo">MV3</Link>
//                 </div>
//                 <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref} style={{ borderRightColor: "#F1C232", borderRightWidth: 2, borderRightStyle: "solid" }}>
//                     <SidebarMenu onUpdateSize={() => this._scrollBarRef.updateScroll()} />
//                 </PerfectScrollbar>
//                 {/* <div className="sidebar-footer">
//                     <div className="sidebar-footer-top">
//                         <div className="sidebar-footer-thumb">
//                             <img src={userAvatar} alt="" />
//                         </div>
//                         <div className="sidebar-footer-body">
//                             <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
//                             <p>Premium Member</p>
//                         </div>
//                         <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
//                     </div>
//                     <div className="sidebar-footer-menu">
//                         <nav className="nav">
//                             <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
//                             <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
//                         </nav>
//                         <hr />
//                         <nav className="nav">
//                             <Link to=""><i className="ri-question-line"></i> Help Center</Link>
//                             <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
//                             <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
//                             <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
//                         </nav>
//                     </div>
//                 </div> */}
//             </div>
//         )
//     }
// }

// const SidebarMenu = ({ onUpdateSize }) => {
//     console.log("onUpdateSize ",onUpdateSize)
//     const { dashboardMenu } = useContext(GlobalContext);
//   console.log("dashboardMenu ",dashboardMenu)
//     const populateMenu = (menu) => {
//         return menu?.map((menuItem, key) => {
//             let submenuItems;
//             if (menuItem.submenu && menuItem.submenu.length > 0) {
//                 submenuItems = menuItem.submenu.map((subItem, subKey) => {
//                     let subSubmenuItems;
//                     if (subItem.submenu && subItem.submenu.length > 0) {
//                         subSubmenuItems = subItem.submenu.map((subSubItem, subSubKey) => (
//                             <NavLink to={subSubItem.link} className="nav-sub-link" key={subSubKey}>
//                                 {subSubItem.label}
//                             </NavLink>
//                         ));
//                     }

//                     return (
//                         <li key={subKey} className="nav-item">
//                             {!subSubmenuItems ? (
//                                 <NavLink to={subItem.link} className="nav-sub-link">
//                                     {subItem.label}
//                                 </NavLink>
//                             ) : (
//                                 <div onClick={toggleSubMenu} className="nav-link has-sub">
//                                     <i className={subItem.icon}></i> <span>{subItem.label}</span>
//                                 </div>
//                             )}
//                             {subItem.submenu && <nav className="nav nav-sub">{subSubmenuItems}</nav>}
//                         </li>
//                     );
//                 });
//             }

//             return (
//                 <li key={key} className="nav-item">
//                     {!submenuItems ? (
//                         <NavLink to={menuItem.link} className="nav-link">
//                             <i className={menuItem.icon}></i> <span>{menuItem.label}</span>
//                         </NavLink>
//                     ) : (
//                         <div onClick={toggleSubMenu} className="nav-link has-sub">
//                             <i className={menuItem.icon}></i> <span>{menuItem.label}</span>
//                         </div>
//                     )}
//                     {menuItem.submenu && <nav className="nav nav-sub">{submenuItems}</nav>}
//                 </li>
//             );
//         });
//     };

//     // Toggle submenu while closing siblings' submenu
//     const toggleSubMenu = (e) => {
//         e.preventDefault();

//         let parent = e.target.closest('.nav-item');
//         let node = parent.parentNode.firstChild;

//         while (node) {
//             if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
//                 node.classList.remove('show');
//             node = node.nextElementSibling || node.nextSibling;
//         }

//         parent.classList.toggle('show');
//         onUpdateSize();
//     };

//     return (
//         <React.Fragment>
//             <div className="nav-group show">
//                 <div className="nav-label" onClick={toggleMenu}>Dashboard</div>
//                 {populateMenu(dashboardMenu)}
//             </div>
//         </React.Fragment>
//     );
// };

// const toggleMenu = (e) => {
//     e.preventDefault();
//     let parent = e.target.closest('.nav-group');
//     parent.classList.toggle('show');
// };
