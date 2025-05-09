// import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useRef, useState } from "react";
// import { Table } from "react-bootstrap";

// const TableRow = ({ data }) => {
//     return (
//         <tr>
//             {Object.entries(data).map(([key, value], index) => (
//                 <td
//                     key={index}
//                     className={`text-nowrap text-xs p-2`}
//                     style={{ textAlign: typeof value === "string" ? "left" : "right" }}
//                 >
//                     {value}
//                 </td>
//             ))}
//         </tr>
//     );
// };

// const TableComponent = ({ TableData }) => {
//     const [tableInfo, setTableInfo] = useState(TableData);
//     const scrollDivRef = useRef(null);
//     const [filterTableData, setFilterTableData] = useState(null);
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//     // useEffect(() => {
//     //     //console.log("performanceee Data ",performanceData[1])
//     //     if (tableInfo) {
//     //       const result = tableInfo?.filter(data => {
//     //         return data.FIELDNAME?.toLowerCase().includes(search?.toLowerCase());
//     //       });
//     //       setFilterTableData(result);
         
//     //     } else {
//     //         setFilterTableData(null);
//     //     }
//     //   }, [tableInfo, search]);
//     const sortTable = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }

//         const sortedRows = [...tableInfo].sort((a, b) => {
//             if (a[key] < b[key]) {
//                 return direction === 'ascending' ? -1 : 1;
//             }
//             if (a[key] > b[key]) {
//                 return direction === 'ascending' ? 1 : -1;
//             }
//             return 0;
//         });

//         setTableInfo(sortedRows);
//         setSortConfig({ key, direction });
//     };

//     const columnHeaders = TableData?.length > 0 ? Object.keys(TableData[0]) : [];

//     return (
//         <div>
//               <div
//                 ref={scrollDivRef}
//                 className="table-responsive "
//                 style={{ width: '100%', height: "63vh" }}
//               >
//            <table
//                   className="table table-striped"
                  
//                 >
//                 <thead>
//                     <tr>
//                         {
//                         columnHeaders?.map((header, index) => (
//                             <th key={index} onClick={() => sortTable(header)}>
//                                 {header}
//                                 {sortConfig.key === header ? (
//                                     sortConfig.direction === 'ascending' ? 
//                                         <FontAwesomeIcon icon={faSortUp} style={{ cursor: "pointer", fontSize: "12px", paddingLeft: "5px" }} /> 
//                                         : 
//                                         <FontAwesomeIcon icon={faSortDown} style={{ cursor: "pointer", fontSize: "12px", paddingLeft: "5px" }} />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faSort} style={{ cursor: "pointer", fontSize: "12px", paddingLeft: "5px" }} />
//                                 )}
//                             </th>
//                         ))
//                         }
//                     </tr>
//                 </thead>
//                 <tbody style={{ width: "100%", overflowY: "auto", overflowX: 'auto' }}>
//                     {filterTableData?.map((data, index) => (
//                         <TableRow key={index} data={data} />
//                     ))}
//                 </tbody>
//             </table>
//             </div>
//         </div>
//     );
// };

// export default TableComponent;
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";

const TableRow = ({ data }) => {
    return (
        <tr>
            {Object.entries(data).map(([key, value], index) => (
                <td
                    key={index}
                    className={`text-nowrap text-xs p-2`}
                    style={{ textAlign: typeof value === "string" ? "left" : "right" }}
                >
                    {value}
                </td>
            ))}
        </tr>
    );
};

const TableComponent = ({ companyData }) => {
    const [tableInfo, setTableInfo] = useState(companyData);
    const scrollDivRef = useRef(null);
    const [filterTableData, setFilterTableData] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortTable = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedRows = [...tableInfo].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setTableInfo(sortedRows);
        setSortConfig({ key, direction });
    };

    const columnHeaders = companyData?.length > 0 ? Object.keys(companyData[0]) : [];

    return (
        <div>
            <div
                ref={scrollDivRef}
                className="table-responsive"
                style={{ width: '100%', height: "63vh" }}
            >
                <Table className="table table-striped">
                    <thead>
                        <tr>
                            {columnHeaders?.map((header, index) => (
                                <th key={index} onClick={() => sortTable(header)} style={{ cursor: "pointer" }}>
                                    {header}
                                    {sortConfig.key === header ? (
                                        sortConfig.direction === 'ascending' ? 
                                            <FontAwesomeIcon icon={faSortUp} style={{ fontSize: "12px", paddingLeft: "5px" }} /> 
                                            : 
                                            <FontAwesomeIcon icon={faSortDown} style={{ fontSize: "12px", paddingLeft: "5px" }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ fontSize: "12px", paddingLeft: "5px" }} />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ width: "100%", overflowY: "auto", overflowX: 'auto' }}>
                        {tableInfo.map((data, index) => (
                            <TableRow key={index} data={data} />
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TableComponent;
