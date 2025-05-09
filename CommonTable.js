import React, { useContext, useEffect, useState,useRef } from 'react';
import Loader from '../smallComponents/Loader';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import GlobalContext from '../dashboard/GlobalContext/GlobalContext';
import ContentManagement from '../components/ContentManagement';
// import { faCircle } from '@fortawesome/free-regular-svg-icons';
export const iconCon = (row) => {
  if (row?.RESEARCH_FROM === "UDR" || row?.covered == "0") {
    return true;
  }
  else {
    return false;
  }
}
const CommonTable = ({ LoadMore, header = [], renderData = [], Height, HeaderSticky, HeaderBackgroud, Width, tableLoad, srNo }) => {
  const [loading, setLoading] = useState(false);
  const [loadingN, setLoadingN] = useState(false);
  const [activeText, setActiveText] = useState({}); 
    const [position, setPosition] = useState(null);
    const refs = useRef({}); // Store references dynamically 
  const [loadDataRender, setLoadDataRender] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [skipRecords, setSkipRecords] = useState(0); // Tracks current offset for loading data
  const limitRecords = 100; // Number of records to fetch per request
  useEffect(() => {
    // if(renderData[0]?.Index==="Nifty 50" )
    // {

    //   console.log("render Data ",renderData)
    // }
    setHeaderData(header)
    setLoadDataRender(renderData);
  }, [renderData]);


  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const {
    // sortConfig, 
    // setSortConfig,
    setSortedData } = useContext(GlobalContext)

  const handleSort = (col) => {
    if (!col.sortable) return;

    let direction = "asc";
    if (sortConfig.key === col.Header && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key: col.Header, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return renderData;

    const sorted = [...renderData].sort((a, b) => {
      const key = sortConfig.key.replace(/\s+/g, "").toLowerCase();

      // Find the type from the headerData
      const column = headerData.find(
        (col) => col.Header.replace(/\s+/g, "").toLowerCase() === key
      );
      const type = column?.Type || "Text"; // Default to 'Text' if Type is not provided

      // Retrieve the values to compare
      const valA = a[sortConfig.key] || "";
      const valB = b[sortConfig.key] || "";

      // Function to parse DD/MM/YYYY dates
      const parseDate = (value) => {
        const parts = value.split("/");
        if (parts.length === 3) {
          const [day, month, year] = parts.map(Number);
          return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
        }
        return null; // Return null if the format is invalid
      };

      const isNumber = (value) => !isNaN(value) && typeof value !== "boolean";

      // Sort based on column type
      if (type === "Number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      } else if (type === "Date") {
        const dateA = parseDate(valA);
        const dateB = parseDate(valB);
        if (!dateA || !dateB) return 0; // If invalid date, treat as equal
        return sortConfig.direction === "asc"
          ? dateA - dateB
          : dateB - dateA;
      } else {
        // Default to string comparison for text or unrecognized types
        return sortConfig.direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });

    // if (renderData[0]?.hasOwnProperty("Index")) {
    //   setSortedData(sorted);
    // }
    setSortedData(sorted);
    return sorted;
  }, [renderData, sortConfig, headerData]);



  const handleLoadMoreClick = () => {
    if (LoadMore) {
      LoadMore(); // Trigger the parent's loadMore function
    }
  };

  const handleMouseEnter = (id) => {
    if (refs.current[id]) {
      const rect = refs.current[id].getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
      setActiveText({ [id]: true }); // Only activate this text
    }
  };

  const handleMouseLeave = (e, id) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(".content-box")) {
      setActiveText({}); // Close only this popup
    }
  };
  return (
    <>
      {loading && (
        <div
          className="d-flex align-items-center justify-content-center mt-52 ml-60"
          style={{ marginTop: "15%" }}
        >
          <Loader />
        </div>
      )}

      <div>
        {!loading && (
          <div
            style={{
              maxHeight: Height ? `${Height}px` : "55vh",
              maxWidth: Width ? `${Width}%` : "100%",
              overflowY: "auto",
            }}
          >
            <table className="table table-striped" style={{position:"relative"}}>
              <thead
              >
                <tr>
                  {srNo ? <th style={{ textAlign: 'center' }}>Sr.No</th> : null}

                  {headerData?.map((col, index) => (
                    <>

                      <th key={index}
                        style={{
                          // textAlign: index === 0 ? 'left' : 'right',
                          fontSize: col.fontSizeValue
                            ? `${col.fontSizeValue}px`
                            : "14px",
                          fontWeight: "bold",
                          backgroundColor: "white",
                          cursor: (col?.sortable) ? "pointer" : "default", // cursor: (col.onClickData || col?.sortable) ? "pointer" : "default", 
                          position: 'sticky',
                          top: 0, // Sticks the header to the top
                          zIndex: 1, // Ensures the header stays on top of body rows
                          // textAlign: col.alignment || "left",
                          // textAlign: col.alignment || (index === 0 ? 'left' : 'right'),
                          textAlign: (col.Type === "Text") ? 'left' : (col.Type === "Date") ? 'center' : "right",
                        }}

                        onClick={() => handleSort(col)}
                        ref={(el) => (refs.current["Daily Summary Report"] = el)}
                        {...(col.showContent && {
                          onMouseEnter: () => handleMouseEnter("Daily Summary Report"),
                          onMouseLeave: (e) => handleMouseLeave(e, "Daily Summary Report"),
                        })}
                      >
                        {col.displayName || col.Header}
                       
                        {col.sortable && (
                          <span>
                            {sortConfig.key === col.Header
                              ? sortConfig.direction === "asc"
                                ? <FontAwesomeIcon
                                  icon={faArrowUp}
                                  className="ms-2" />
                                : <FontAwesomeIcon
                                  icon={faArrowDown}
                                  className="ms-2" />
                              : null}
                          </span>
                        )}
  {activeText["Daily Summary Report"] && (
                                      <ContentManagement
                                        position={position}
                                        positionType="down"
                                        onClose={() => setActiveText({})}
                                        width="400px"
                                        webElementLinkage="Daily Summary Report"
                                      />
                                    )}
                      </th>
                   
                     
                    </>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableLoad ? ( // Show loader if tableLoad is true
                  <tr>
                    <td colSpan={header?.length} style={{ textAlign: "center" }}>
                      <CircularProgress size={24} />
                    </td>
                  </tr>
                ) : renderData && renderData.length > 0 ? ( // Render table rows if data is available
                  sortedData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {srNo ? <td style={{ textAlign: 'center' }}>
                        {rowIndex + 1}
                      </td> : null}
                      {headerData?.map((col, colIndex) => (
                        <>

                          <td
                            key={colIndex}
                            style={{
                              fontSize: col.fontSizeValue ? `${col.fontSizeValue}px` : "14px",
                              cursor: col.onClickData ? "pointer" : "default",
                              // textAlign: col.alignment || "left",
                              // textAlign: col.alignment || (colIndex === 0 ? 'left' : 'right'),
                              textAlign: (col.Type === "Text") ? 'left' : (col.Type === "Date") ? 'center' : "right",
                              maxWidth: "150px",
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                              overflow: "hidden",
                            }}
                            onClick={() => {
                              if (col.onClickData) {
                                col.onClickData(row);
                              }
                            }}
                          >
                            <p
                              style={{
                                fontSize: col.fontSizeValue ? `${col.fontSizeValue}px` : "14px",
                                margin: 0,
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              {/* {col.cellRender
                              ? col.cellRender(row)
                              : col.roundOff
                                ? (
                                  Number(row[col.Header.replace(/\s+/g, "")]) || 0
                                ).toFixed(col.roundOff)
                                : col.dateFormat
                                  ? moment(
                                    row[col.Header.replace(/\s+/g, "")]
                                  ).format(col.dateFormat) || "-"
                                  : row[col.Header.replace(/\s+/g, "")] || "-"} */}

                              {
                                // col.cellRender
                                //   ? col.cellRender(row)
                                //   : (() => {
                                //     const key = Object.keys(row).find(
                                //       k => k.replace(/\s+/g, "").toLowerCase() === col.Header.replace(/\s+/g, "").toLowerCase()
                                //     );

                                //     const value = key ? row[key] : "-";

                                //     if (col.roundOff) {
                                //       return (Number(value) || 0).toFixed(col.roundOff);
                                //     }

                                //     if (col.dateFormat) {
                                //       return moment(value).format(col.dateFormat) || "-";
                                //     }

                                //     return value || "-";
                                //   })()

                              }
                              {col.cellRender
                                ? col.cellRender(row)
                                : (() => {
                                  const key = Object.keys(row).find(
                                    k =>
                                      k.replace(/\s+/g, "").toLowerCase() ===
                                      col.Header.replace(/\s+/g, "").toLowerCase()
                                  );
                                  const value = key ? row[key] : "-";

                                  // Check if the value is numeric
                                  if (!isNaN(Number(value)) && value !== null && value !== undefined && col.Type!=="Date") {
                                    if (col.roundOff !== undefined) {
                                      // If roundOff is 1, force display with 2 decimal places
                                      const fractionDigits = col.roundOff === 1 ? 2 : col.roundOff;
                                      return Number(value).toLocaleString(undefined, {
                                        minimumFractionDigits: fractionDigits,
                                        maximumFractionDigits: fractionDigits,
                                      });
                                    }
                                    return Number(value).toLocaleString();
                                  }

                                  if (col.dateFormat) {
                                    return moment(value).format(col.dateFormat) || "-";
                                  }
                                  return value || "-";
                                })()}


                              {col.icon &&
                                col.iconCondition &&
                                typeof col.iconCondition === "function" &&
                                col.iconCondition(row) && (
                                  <FontAwesomeIcon
                                    icon={col.icon}
                                    className="ml-2 fa-lg ms-2 mb-1"
                                    style={{ height: "0.5em", color: "blue" }}
                                  />
                                )}
                            </p>
                          </td>
                        </>

                      ))}
                    </tr>
                  ))
                ) : ( // Render "No data to display" if no data exists
                  <tr>
                    <td colSpan={headerData.length} style={{ textAlign: "center" }}>
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>




            </table>

          
            {LoadMore && (
              <button
                type="button"
                style={{ marginTop: "38px" }}
                onClick={handleLoadMoreClick}
                className="btn btn-primary"
                disabled={loadingN}
              >
                {loadingN ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommonTable;
