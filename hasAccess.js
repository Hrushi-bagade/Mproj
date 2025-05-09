// src/accessControl.js
// const accessControl = {
//     "roles": {
//       "admin": {
//         "permissions": {
//           "dashboard": {
//             "add": true,
//             "edit": true,
//             "delete": true
//           },
//           "whiteboard": {
//             "add": true,
//             "edit": true,
//             "delete": true,
//             "select":false
//           },
//           "userManagement": {
//             "add": true,
//             "edit": true,
//             "delete": false
//           }
//         }
//       },
//       "user": {
//         "permissions": {
//           "dashboard": {
//             "add": false,
//             "edit": false,
//             "delete": false
//           },
//           "whiteboard": {
//             "add": true,
//             "edit": true,
//             "delete": true,
//             "select":true
//           },
//           "userManagement": {
//             "add": true,
//             "edit": false,
//             "delete": false
//           }
//         }
//       },
//       "guest": {
//         "permissions": {}
//       }
//     }

import { useContext, useEffect, useState } from "react";
import { loggedInUserId } from "../Utils/env";
import ReactDOM from "react-dom";
import GlobalContext from "../dashboard/GlobalContext/GlobalContext";

//   }


// const accessControl = [
//   { 
//     userId: loggedInUserId, // You can assign user IDs here if needed
//     role: "user",
//     permissions: [ 
//       {
//         moduleName: "dashboard",
//         add: true,
//         edit: true,
//         delete: true
//       },
//       {
//         moduleName: "whiteboard",
//         add: false,
//         edit: true,
//         delete: true
//       },
//       {
//         moduleName: "userManagement",
//         add: true,
//         edit: true,
//         delete: false
//       }
//     ]
//   },
//   { 
//     userId: loggedInUserId, // You can assign user IDs here if needed
//     role: "admin",
//     permissions: [ 
//       {
//         moduleName: "dashboard",
//         add: true,
//         edit: true,
//         delete: true
//       },
//       {
//         moduleName: "whiteboard",
//         add: true,
//         edit: true,
//         delete: true
//       },
//       {
//         moduleName: "userManagement",
//         add: true,
//         edit: true,
//         delete: false
//       }
//     ]
//   }
// ];


const accessControl = [
    {
        "menuId": "1",
        "label": "Tracklists",
        "link": "dashboard/Tracklist",
        "icon": "ri-pie-chart-2-line",
        "order": 1,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "2",
                "label": "My Tracklists",
                "link": "dashboard/Performance",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "1",
                "enabledOnProd": true,
                "elementList": ['add', 'export', 'CTA popover'],
                "submenu": []
            },
            {
                "menuId": "21",
                "label": "Manage Tracklists",
                "link": "dashboard/Tracklist",
                "icon": "ri-pie-chart-2-line",
                "order": 1.5,
                "active": "Y",
                "parentMenuId": "1",
                "enabledOnProd": true,
                "elementList": ['add', 'edit', 'delete', 'deactivate'],
                "submenu": []
            },
            {
                "menuId": "3",
                "label": "Add-Centralised Tracklist",
                "link": "dashboard/CentralisedTrackList",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "N",
                "parentMenuId": "1",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "4",
                "label": "Add-My Tracklist",
                "link": "dashboard/NewCentralisedTrackList",
                "icon": "ri-pie-chart-2-line",
                "order": 3,
                "active": "N",
                "parentMenuId": "1",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "5",
        "label": "Whiteboard",
        "link": "dashboard/whiteboard",
        "icon": "ri-pie-chart-2-line",
        "order": 2,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": ['india', 'global', 'marketInx', 'tracklist', 'userlist', 'MA funds', 'mnaual add', 'excel'],
        "submenu": []
    },
    {
        "menuId": "6",
        "label": "Company Dashboard",
        "link": "dashboard/CompanySearch",
        "icon": "ri-pie-chart-2-line",
        "order": 3,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "7",
        "label": "Technical Analysis",
        "link": "dashboard/TechnicalAnalysis",
        "icon": "ri-pie-chart-2-line",
        "order": 4,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "8",
        "label": "QoE",
        "link": "dashboard/QOE",
        "icon": "ri-pie-chart-2-line",
        "order": 5,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "12",
        "label": "Screener",
        "link": "dashboard/Screener",
        "icon": "ri-pie-chart-2-line",
        "order": 5.5,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": [
            {
                "menuId": "13",
                "label": "My Screener",
                "link": "dashboard/MyScreener",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "12",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "14",
                "label": "Screener builder",
                "link": "dashboard/Screener",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "12",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "15",
        "label": "PDR",
        "link": "dashboard/PDRListing",
        "icon": "ri-pie-chart-2-line",
        "order": 5.7,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "16",
                "label": "My Portfolio",
                "link": "dashboard/PDRListing",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "15",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "17",
                "label": "Ranking PDR",
                "link": "dashboard/PDRRanking",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "15",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "18",
        "label": "Indicators",
        "link": "dashboard/Indicators",
        "icon": "ri-pie-chart-2-line",
        "order": 5.8,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "19",
                "label": "Macro",
                "link": "dashboard/MacroIndicator",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "18",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "20",
                "label": "Market",
                "link": "dashboard/MarketIndicator",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "18",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "9",
        "label": "Shared Links",
        "link": "dashboard/SharedTracklist",
        "icon": "ri-pie-chart-2-line",
        "order": 6,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "10",
        "label": "Administration",
        "link": "dashboard/UserManagement",
        "icon": "ri-hard-drive-2-line",
        "order": 7,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": [
            {
                "menuId": "11",
                "label": "User Management",
                "link": "dashboard/UserManagement",
                "icon": "ri-hard-drive-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "22",
                "label": "Alerts And Notifications",
                "link": "dashboard/NotificationConfig",
                "icon": "ri-hard-drive-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "23",
                "label": "User Access",
                "link": "dashboard/UserAccessRights",
                "icon": "ri-hard-drive-2-line",
                "order": 3,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "24",
                "label": "User Log",
                "link": "dashboard/UserLog",
                "icon": "ri-hard-drive-2-line",
                "order": 4,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    }
]
export const dashboardMenuTest = [
    {
        "menuId": "1",
        "label": "Tracklists",
        "link": "dashboard/Tracklist",
        "icon": "ri-pie-chart-2-line",
        "order": 1,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "2",
                "label": "My Tracklists",
                "link": "dashboard/Performance",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "1",
                "enabledOnProd": true,
                "elementList": [
                    {
                        "elementId": 1,
                        "elementName": "Deactivate",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "1"
                    },
                    {
                        "elementId": 2,
                        "elementName": "Export",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "1"
                    },
                    {
                        "elementId": 3,
                        "elementName": "CTA Popover",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "1"
                    }
                ],
                "submenu": []
            },
            {
                "menuId": "21",
                "label": "Manage Tracklists",
                "link": "dashboard/Tracklist",
                "icon": "ri-pie-chart-2-line",
                "order": 1.5,
                "active": "Y",
                "parentMenuId": "1",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "3",
                "label": "Add-Centralised Tracklist",
                "link": "dashboard/CentralisedTrackList",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "N",
                "parentMenuId": "1",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "4",
                "label": "Add-My Tracklist",
                "link": "dashboard/NewCentralisedTrackList",
                "icon": "ri-pie-chart-2-line",
                "order": 3,
                "active": "N",
                "parentMenuId": "1",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "5",
        "label": "Whiteboard",
        "link": "dashboard/whiteboard",
        "icon": "ri-pie-chart-2-line",
        "order": 2,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": [
            {
                "elementId": 4,
                "elementName": "India",
                "isSelected": true,
                "optionList": null,
                "parentMenuId": "5"
            },
            {
                "elementId": 5,
                "elementName": "Global",
                "isSelected": true,
                "optionList": null,
                "parentMenuId": "5"
            },
            // {
            //     "elementId": 6,
            //     "elementName": "Market Indices",
            //     "isSelected": true,
            //     "optionList": null,
            //     "parentMenuId": "5"
            // },
            {
                "elementId": 6,
                "elementName": "User List",
                "isSelected": true,
                "optionList": null,
                "parentMenuId": "5"
            },
            {
                "elementId": 7,
                "elementName": "Export Excel",
                "isSelected": false,
                "optionList": null,
                "parentMenuId": "5"
            },
            {
                "elementId": 7,
                "elementName": "Export PDF",
                "isSelected": false,
                "optionList": null,
                "parentMenuId": "5"
            }
        ],
        "submenu": []
    },
    {
        "menuId": "6",
        "label": "Company Dashboard",
        "link": "dashboard/CompanySearch",
        "icon": "ri-pie-chart-2-line",
        "order": 3,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "7",
        "label": "Technical Analysis",
        "link": "dashboard/TechnicalAnalysis",
        "icon": "ri-pie-chart-2-line",
        "order": 4,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "8",
        "label": "QoE",
        "link": "dashboard/QOE",
        "icon": "ri-pie-chart-2-line",
        "order": 5,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": [
            {
                "elementId": 4,
                "elementName": "Brief Export",
                "isSelected": true,
                "optionList": null,
                "parentMenuId": "8"
            },
            {
                "elementId": 5,
                "elementName": "Detail Export",
                "isSelected": false,
                "optionList": null,
                "parentMenuId": "8"
            },
        ],
        "submenu": []
    },
    {
        "menuId": "12",
        "label": "Screener",
        "link": "dashboard/Screener",
        "icon": "ri-pie-chart-2-line",
        "order": 5.5,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": [
            {
                "menuId": "13",
                "label": "My Screener",
                "link": "dashboard/MyScreener",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "12",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "14",
                "label": "Screener builder",
                "link": "dashboard/Screener",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "12",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "15",
        "label": "PDR",
        "link": "dashboard/PDRListing",
        "icon": "ri-pie-chart-2-line",
        "order": 5.7,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "16",
                "label": "My Portfolio",
                "link": "dashboard/PDRListing",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "15",
                "enabledOnProd": true,
                "elementList": [
                    {
                        "elementId": 4,
                        "elementName": "Export Excel",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 5,
                        "elementName": "Export PDF",
                        "isSelected": false,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 6,
                        "elementName": "Add",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 7,
                        "elementName": "Edit",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 8,
                        "elementName": "Deactivate",
                        "isSelected": true,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 9,
                        "elementName": "Xpress PDR",
                        "isSelected": false,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                    {
                        "elementId": 10,
                        "elementName": "Advisory PDR",
                        "isSelected": false,
                        "optionList": null,
                        "parentMenuId": "8"
                    },
                ],
                "submenu": []
            },
            {
                "menuId": "17",
                "label": "Ranking PDR",
                "link": "dashboard/PDRRanking",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "15",
                "enabledOnProd": false,
                "elementList": [
                    {
                        "elementId": 4,
                        "elementName": "Export Excel",
                        "isSelected": false,
                        "optionList": null,
                        "parentMenuId": "8"
                    }
                ],
                "submenu": []
            }
        ]
    },
    {
        "menuId": "18",
        "label": "Indicators",
        "link": "dashboard/Indicators",
        "icon": "ri-pie-chart-2-line",
        "order": 5.8,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": true,
        "elementList": null,
        "submenu": [
            {
                "menuId": "19",
                "label": "Macro",
                "link": "dashboard/MacroIndicator",
                "icon": "ri-pie-chart-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "18",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "20",
                "label": "Market",
                "link": "dashboard/MarketIndicator",
                "icon": "ri-pie-chart-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "18",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            }
        ]
    },
    {
        "menuId": "9",
        "label": "Shared Links",
        "link": "dashboard/SharedTracklist",
        "icon": "ri-pie-chart-2-line",
        "order": 6,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": []
    },
    {
        "menuId": "10",
        "label": "Administration",
        "link": "dashboard/UserManagement",
        "icon": "ri-hard-drive-2-line",
        "order": 7,
        "active": "Y",
        "parentMenuId": "",
        "enabledOnProd": false,
        "elementList": null,
        "submenu": [
            {
                "menuId": "11",
                "label": "User Management",
                "link": "dashboard/UserManagement",
                "icon": "ri-hard-drive-2-line",
                "order": 1,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "22",
                "label": "Alerts And Notifications",
                "link": "dashboard/NotificationConfig",
                "icon": "ri-hard-drive-2-line",
                "order": 2,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": true,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "25",
                "label": "Custom Notifications",
                "link": "dashboard/NotificationList",
                "icon": "ri-hard-drive-2-line",
                "order": 2.5,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "23",
                "label": "User Access",
                "link": "dashboard/UserAccessRights",
                "icon": "ri-hard-drive-2-line",
                "order": 3,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            },
            {
                "menuId": "24",
                "label": "User Log",
                "link": "dashboard/UserLog",
                "icon": "ri-hard-drive-2-line",
                "order": 4,
                "active": "Y",
                "parentMenuId": "10",
                "enabledOnProd": false,
                "elementList": null,
                "submenu": []
            }
        ]
    }
]

// Custom hook for access control
// export const useAccessControl = (role, moduleName, operation) => {

//   export const useAccessControl = (label,stringToCheck) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const {dashboardMenu, setdashboardMenu}=useContext(GlobalContext)

// useEffect(() => {
//   // Flatten the accessControl structure to gather all elementList arrays
//   const allElements = [];
//   const traverseMenus = (menus) => {
//     menus.forEach((menu) => {
//       if (menu.elementList) {
//         allElements.push(...menu.elementList);
//       }
//       if (menu.submenu?.length) {
//         traverseMenus(menu.submenu);
//       }
//     });
//   };

// traverseMenus(dashboardMenu);


//   // Check if the stringToCheck exists in the flattened element list
//   setHasPermission(allElements.includes(stringToCheck));
// }, [stringToCheck]);

// return hasPermission;
// };

export const useAccessControl = (label, elementName) => {
    const [hasPermission, setHasPermission] = useState(false);
    // const {hasPermission, setHasPermission} = useContext(GlobalContext);

    const { dashboardMenu } = useContext(GlobalContext);

    useEffect(() => {
        const findMenuByLabel = (menus, targetLabel) => {
            if (menus?.length > 0) {

                for (let menu of menus) {
                    if (menu?.label === targetLabel) {
                        return menu;
                    }
                    if (menu.submenu?.length) {
                        const found = findMenuByLabel(menu.submenu, targetLabel);
                        if (found) {
                            return found;
                        }
                    }
                }
            }
            return null;
        };

        const targetMenu = findMenuByLabel(dashboardMenu, label);
        //   const targetMenu = findMenuByLabel(dashboardMenuTest, label);


        if (targetMenu && targetMenu?.elementList?.length) {
            const targetElement = targetMenu?.elementList.find(
                (element) => element.elementName === elementName
            );
            setHasPermission(targetElement?.isSelected === true);
        } else {
            setHasPermission(false);
        }
    }, [label, elementName, dashboardMenu]);

    return hasPermission;
};




export const checkAccessControl = (dashboardMenu, label, elementName) => {

    const findMenuByLabel = (menus, targetLabel) => {
        if (menus?.length > 0) {
            for (let menu of menus) {
                if (menu?.label === targetLabel) {
                    return menu;
                }
                if (menu.submenu?.length) {
                    const found = findMenuByLabel(menu.submenu, targetLabel);
                    if (found) {
                        return found;
                    }
                }
            }
        }
        return null;
    };

    const targetMenu = findMenuByLabel(dashboardMenu, label);

    if (targetMenu && targetMenu?.elementList?.length) {
        const targetElement = targetMenu?.elementList.find(
            (element) => element.elementName === elementName
        );
        return targetElement?.isSelected === true;
    }
    return false;
};

export const AccessControlProvider = ({ label, elementName, onPermissionCheck }) => {
    const hasPermission = useAccessControl(label, elementName);
    useEffect(() => {
        onPermissionCheck(hasPermission);
    }, [hasPermission, onPermissionCheck]);
    return null; // No UI needed for this component
};

export function checkPermission(label, elementName) {
    const containerId = "permission-check-container";

    return new Promise((resolve) => {
        // Create the container dynamically if it doesn't exist
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement("div");
            container.id = containerId;
            document.body.appendChild(container);
        }

        ReactDOM.render(
            <AccessControlProvider
                label={label}
                elementName={elementName}
                onPermissionCheck={(hasPermission) => {
                    resolve(hasPermission); // Resolve the promise with the result
                    ReactDOM.unmountComponentAtNode(container);
                    container.remove();
                }}
            />,
            container
        );
    });
}
// const findMenuByMenuName = (menus, targetLabel) => {
//     for (let menu of menus) {
//         if (menu.label === targetLabel) {
//             return menu;
//         }
//         if (menu.submenu?.length) {
//             const found = findMenuByLabel(menu.submenu, targetLabel);
//             if (found) {
//                 return found;
//             }
//         }
//     }
//     return null;
// };

// export const checkPermission = (dashboardMenu, label, elementName) => {
//     const targetMenu = findMenuByMenuName(dashboardMenu, label);

//     if (targetMenu && targetMenu.elementList?.length) {
//         const targetElement = targetMenu.elementList.find(
//             (element) => element.elementName === elementName
//         );
//         return targetElement?.isSelected === true;
//     } else {
//         return false;
//     }
// };


// export const hasAccess = (role, moduleName, operation) => {
//   const userId=loggedInUserId
//   // Find the user in the accessControl array using their userId and role
//   const userRole = accessControl.find(user => user.userId === userId && user.role === role);

//   // If the user with the specified role is not found, return false
//   if (!userRole) return false;

//   // Find the permissions for the requested module
//   const modulePermissions = userRole.permissions.find(permission => permission.moduleName === moduleName);

//   // If the module is not found or the operation is not allowed, return false
//   return modulePermissions ? modulePermissions[operation] || false : false;
// };