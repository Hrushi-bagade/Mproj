import { useState } from 'react';

const useExpandedRowsQvm = () => {
  const [expandedRows, setExpandedRows] = useState({});
//   console.log("077777 id")
  const toggleRow = (id) => {
    console.log("077777 id",id)
    setExpandedRows(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return [expandedRows, toggleRow];

  
};

// const useExpandedRowsQvm = (initialRows = []) => {
//       // Helper function to recursively expand all rows
//       const initializeExpandedState = (rows) => {
//         const expandedState = {};
    
//         const recursivelyExpand = (row) => {
//           expandedState[row.id] = true;
//           if (row.children) {
//             row.children.forEach(child => recursivelyExpand(child));
//           }
//         };
    
//         rows.forEach(row => recursivelyExpand(row));
//         return expandedState;
//       };
    
//       // Initialize the expandedRows state with all rows set to true by default
//       const initialExpandedState = initializeExpandedState(initialRows);
//       const [expandedRows, setExpandedRows] = useState(initialExpandedState);
    
//       const toggleRow = (id) => {
//         setExpandedRows(prevState => ({
//           ...prevState,
//           [id]: !prevState[id]
//         }));
//       };
    
//       const expandAllRows = () => {
//         const allExpandedState = Object.keys(expandedRows).reduce((acc, id) => {
//           acc[id] = true;
//           return acc;
//         }, {});
//         setExpandedRows(allExpandedState);
//       };
    
//       const collapseAllRows = () => {
//         const allCollapsedState = Object.keys(expandedRows).reduce((acc, id) => {
//           acc[id] = false;
//           return acc;
//         }, {});
//         setExpandedRows(allCollapsedState);
//       };
    
//       return [expandedRows, toggleRow, expandAllRows, collapseAllRows];
    
    
//     };

export default useExpandedRowsQvm;
