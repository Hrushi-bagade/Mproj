// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import ChartsContext from "../dashboard/Charts/ChartContext";
// import { saveToLocalStorage } from "../Utils/env";

// const useRedirectToCompanyDash = () => {
//   const navigate = useNavigate();
//   const { setModalCompName, setRedirectModal, setModalMsg, setFSYMID, setlatestFYEnd, redirectModal,setDashCompanyId } = useContext(ChartsContext);

//   const redirectToCompanyDash = (row) => {
//     console.log("Redirect row data:", row);
//     // const companyData = {
//     //     COMPANY_ID: "COM0000254",
//     //     Company: "South Indian Bank Limited",
//     //     FSYM_ID: "CDD6MG-R",
//     //     RESEARCH_FROM: "UDR",
//     //     covered: "0",
//     //     latestFYEnd: ""
//     // };

//     // if (row?.covered === "0" || row?.RESEARCH_FROM==="UDR" || row?.research_from=="UDR" || row?.COVERED=="0") {
//     //     setModalCompName(row.Company);
//     //     setRedirectModal(true);
//     //     setModalMsg(false);
//     // } else if (row.covered === "2") {
//     //     setModalCompName(row.Company);
//     //     setRedirectModal(true);
//     //     setModalMsg(true);
//     // } else {
//     //     const CompDetail={
//     //         "FysmId":row.FSYM_ID,
//     //         "latestFyEnd":row.latestFYEnd
//     //       }
//     //     saveToLocalStorage("CompDetail",CompDetail)
//     //     setModalMsg(false);
//     //     setFSYMID(row.FSYM_ID);
//     //     setlatestFYEnd(row.latestFYEnd);
//     //     navigate("/Home/dashboard/CompanyDashboard", {
//     //         state: {
//     //             companyID: row.COMPANY_ID,
//     //             companyName: row.Company,
//     //             dataSource: row.RESEARCH_FROM,
//     //             covered: row.covered,
//     //         },
//     //     });
//     // }


//     // setOpenDD(false)
//     // setSearch(row?.CmpName);
//     // console.log("Search comp ", company)
//     // setFilteredCompanies([]);
//     // console.log("165 line", company)
//     // if (row?.RESEARCH_FROM=="UDR"|| row?.research_from=="UDR"){
//     // debugger
//     if (row?.covered === "0" || row?.RESEARCH_FROM === "UDR" || row?.research_from == "UDR" || row?.COVERED == "0") {

//       console.log("110 line ", redirectModal)
//       setModalCompName(row?.Company);
//       setRedirectModal(true);
//       setModalMsg(false);
//     }

//     else if (row?.COVERED == "1" || row?.covered === "1") {
//       setFSYMID(row?.FSYM_ID)
//       setlatestFYEnd(row?.latestFYEnd)
//       setModalMsg(false);
//       const CompDetail = {
//         "FysmId": row?.FSYM_ID,
//         "latestFyEnd": row?.latestFYEnd
//       }
//       setDashCompanyId(row?.COMPANY_ID)
//       saveToLocalStorage("CompDetail", CompDetail)
//       // const params = new URLSearchParams({ id: 123, name: "JohnDoe" }).toString();
//       const FSYMID ="GGGGGG"
//       navigate(`/Home/dashboard/CompanyDashboard?id=${row?.FSYM_ID}`, {
//         state: {
//           companyID: row?.COMPANY_ID,
//           companyName: row?.Company,
//           companyStatus: row?.COVERED,
//           dataSource: row?.RESEARCH_FROM,
//           latestFyEnd:row?.latestFYEnd,
//           FsymId:row?.FSYM_ID
//         }
//       }
//       );
//     }
//     else {
//       setModalCompName(row?.Company);
//       setRedirectModal(true);
//       setModalMsg(true);
//       console.log("110 line")
//       //   setShowModal(true)
//     }

//   };

//   return { redirectToCompanyDash };
// };

// export default useRedirectToCompanyDash;



import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChartsContext from "../dashboard/Charts/ChartContext";
import { envKey, saveToLocalStorage } from "../Utils/env";

const useRedirectToCompanyDash = () => {
  const navigate = useNavigate();
  const { setModalCompName, setRedirectModal, setModalMsg, setFSYMID, setlatestFYEnd, redirectModal, setDashCompanyId, setRedirectMsg } = useContext(ChartsContext);

  const redirectToCompanyDash = (row) => {
    debugger
    console.log("Redirect row data:", row);
    if (envKey === "UAT") {

      if (row?.RESEARCH_FROM === "MA" || row?.research_from === "MA" || row?.reseachFrom === "MA" || row?.researchFrom === "MA") {

        if (row.covered === "0" || row?.Covered === "0" || row?.COVERED === "0") {
          setModalCompName(row?.Company || row?.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName);
          setRedirectModal(true);
          setRedirectMsg("This company is not covered in Active Research universe of Multi-Act.")
          setModalMsg(false);
        } else if (row?.covered === "1" || row?.Covered === "1" || row?.COVERED === "1") {
          setFSYMID(row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid)
          setlatestFYEnd(row?.latestFyEnd || row?.qoe_fyEnd || row?.latestFYEnd || row?.fyEnd)
          setModalMsg(false);
          const CompDetail = {
            "FysmId": row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid,
            "latestFyEnd": row?.latestFYEnd || row?.qoe_fyEnd || row?.latestFyEnd || row?.fyEnd
          }
          setDashCompanyId(row?.COMPANY_ID || row?.qoe_companyId || row?.company_Id || row?.companyId || row?.CmpId)
          saveToLocalStorage("CompDetail", CompDetail)
          // const params = new URLSearchParams({ id: 123, name: "JohnDoe" }).toString();
          const FSYMID = "GGGGGG"
          navigate(`/Home/dashboard/CompanyDashboard?id=${row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid}`, {
            state: {
              companyID: row?.COMPANY_ID || row.qoe_companyId || row?.company_Id || row?.companyId || row?.CmpId,
              companyName: row?.Company || row.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName,
              companyStatus: row?.COVERED || row?.covered || row?.Covered,
              covered: row?.covered || row?.COVERED || row?.Covered,
              dataSource: row?.RESEARCH_FROM || row?.research_from || row?.reseachFrom,
              latestFyEnd: row?.latestFYEnd || row?.latestFyEnd || row?.qoe_fyEnd || row?.fyEnd,
              FsymId: row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid,
              fsymId: row.qoe_fsymId || row?.fsym_Id || row?.FSYM_ID || row?.FsymId || row?.fsymId || row?.fsymid
            }
          }
          );
        }
      } else if (row?.RESEARCH_FROM == "UDR" || row?.research_from == "UDR" || row?.reseachFrom == "UDR" || row?.researchFrom === "UDR") {
        navigate(`/Home/dashboard/Automated?id=${row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid} `)
      }


      else {
        console.log("ERROR")
      }
    }
    else {
      if (row?.RESEARCH_FROM === "MA" || row?.research_from === "MA" || row?.reseachFrom === "MA" || row?.researchFrom === "MA") {

        if (row.covered === "0" || row?.Covered === "0" || row?.COVERED === "0") {
          setModalCompName(row?.Company || row?.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName);
          setRedirectModal(true);
          setRedirectMsg("This company is not covered in Active Research universe of Multi-Act.")
        }
      }
      else if (row?.covered === "0" || row?.RESEARCH_FROM === "UDR" || row?.research_from == "UDR" || row?.COVERED == "0" || row?.reseachFrom == "UDR" || row?.researchFrom === "UDR") {

        console.log("110 line ", redirectModal)
        setModalCompName(row?.Company || row?.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName);
        setRedirectModal(true);
        setModalMsg(false);
      }

      else if (row?.COVERED == "1" || row?.covered === "1" || row?.Covered === "1") {
        setFSYMID(row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid)
        setlatestFYEnd(row?.latestFYEnd || row?.qoe_fyEnd || row?.latestFyEnd || row?.fyEnd)
        setModalMsg(false);
        const CompDetail = {
          "FysmId": row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid,
          "latestFyEnd": row?.latestFYEnd || row?.qoe_fyEnd || row?.latestFyEnd || row?.fyEnd
        }
        setDashCompanyId(row?.COMPANY_ID || row?.qoe_companyId || row?.company_Id || row?.companyId || row?.CmpId)
        saveToLocalStorage("CompDetail", CompDetail)
        // const params = new URLSearchParams({ id: 123, name: "JohnDoe" }).toString();
        const FSYMID = "GGGGGG"
        navigate(`/Home/dashboard/CompanyDashboard?id=${row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymId || row?.fsymid}`, {
          state: {
            companyID: row?.COMPANY_ID || row.qoe_companyId || row?.company_Id || row?.companyId || row?.CmpId,
            companyName: row?.Company || row.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName,
            companyStatus: row?.COVERED || row?.covered,
            covered: row?.covered || row?.COVERED,
            dataSource: row?.RESEARCH_FROM || row?.research_from || row?.reseachFrom,
            latestFyEnd: row?.latestFYEnd || row?.latestFyEnd || row?.qoe_fyEnd || row?.fyEnd,
            FsymId: row?.FSYM_ID || row?.qoe_fsymId || row?.fsym_Id || row?.FsymId || row?.fsymid,
            fsymId: row.qoe_fsymId || row?.fsym_Id || row?.FSYM_ID || row?.FsymId || row?.fsymid
          }
        }
        );
      }
      else {
        setModalCompName(row?.Company || row?.qoe_companyName || row?.fgl0001495 || row?.companyName || row?.CmpName);
        setRedirectModal(true);
        setModalMsg(true);
        console.log("110 line")
        //   setShowModal(true)
      }


    }

  };


  return { redirectToCompanyDash };
};

export default useRedirectToCompanyDash;

