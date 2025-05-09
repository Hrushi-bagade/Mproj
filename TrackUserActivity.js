import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // For tracking navigation events
import APIservice from '../Utils/APIservice';
import GlobalContext from '../dashboard/GlobalContext/GlobalContext';
import { loggedInUserFullName, loggedInUserId } from '../Utils/env';

const TrackUserActivity = ({ username }) => {
  // const { ipAddress, setIpAddress } = useContext(GlobalContext)
  const [ipAddress, setIpAddress] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [locationData, setLocation] = useState('');
  const location = useLocation(); // To track navigation between pages
  let {name} = useParams();
  const loggedInUserId = localStorage.getItem("usrId");
 const loggedInUserFullName = localStorage.getItem("usrFullName");
  // Fetch IP address and add event listeners
  // useEffect(() => {
  //   // Fetch IP address using ipify API
 
  // }, []);
  useEffect(()=>{
    console.log("18 line *******************************************************************")
    fetch('https://api.ipify.org?format=json')
    .then(response => {
      // Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response body as JSON
      console.log("17 line IP ADDRESS",response)
      return response.json();
      
    })
    .then(data => {
      // Check if data contains the IP property
      if (data && data.ip) {
        console.log("IP Address:", data.ip); // Logs the IP address
        setIpAddress(data.ip); // Assuming setIpAddress is your state setter
      } else {
        throw new Error('IP address not found in the response');
      }
    })
    .catch(error => {
      console.error('Error fetching IP:', error); // Catch and log any errors
    });


  },[])
  useEffect(() => {

    
    // Track clicks on the page
    const handleClick = (e) => {
      const element = e.target;

   
    //   const trackType = element.getAttribute('textContent');
    //   if (trackType) {
    //     logUserInteraction(trackType, getElementData(element));
    //   }
    


    logUserInteraction('click', getElementData(element), window.location.pathname);
      console.log("1 line element",username)
    };

    window.addEventListener('click', handleClick);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('click', handleClick);
  }, [ipAddress]);

  // Track page navigation changes
  useEffect(() => {
    console.log("73 line//////",previousPage , location.pathname)
    if (previousPage && location.pathname !== previousPage) {
      logPageNavigation(previousPage, location.pathname);
    }
    setPreviousPage(location.pathname);
    setLocation(location.pathname)
  }, [location]);


  // Function to log click events
  const logUserInteraction = (event, elementData, currentPath) => {
    const data = {
      event, // 'click'
      element: elementData,
      username:loggedInUserId,
      ipAddress,
      browser: getBrowserInfo(),
      userName:loggedInUserFullName,
      from:window.location.pathname,
      // timestamp: new Date().toISOString(),
      module: currentPath // Use the latest location.pathname passed to the function
    };
    console.log('User Interaction Logged:', elementData.tagName);
    if(elementData.tagName==="DIV"||elementData.dataName===""||elementData.textContent===""||elementData.tagName==="TABLE"||elementData.tagName==="H3"){

    }
    else{
      APIservice.ADD(`UserDetail/InsertUserLogData`, data).then((response) => {
        if (response.success) {
          console.log("USER LOG CAPTURED....");
        } else {
          console.log("Error logging user interaction");
        }
      });
    }

  
  };

  // Function to log navigation events
  const logPageNavigation = (from, to) => {
    const data = {
      event: 'navigation',
      from,
      to,
      username,
      ipAddress,
      browser: getBrowserInfo(),
      userName:loggedInUserFullName,
      module:to
      // timestamp: new Date().toISOString(),
    };
    console.log('Page Navigation Logged:', data);

    // Sending navigation data to the backend API
    APIservice.ADD(`UserDetail/InsertUserLogData`,data).then((response) => {
      if (response.success) {
        console.log("USER LOG CAPTUREED....")
      } else {

        console.log(" 133 line ERROR")
      }
    })
  };

  // Helper function to get details of the clicked element
  const getElementData = (element) => {
    let targetElement = element;
    if (element.tagName === 'svg' || element.tagName === 'path') {
          // Traverse up to find the FontAwesomeIcon container (if needed)
          targetElement = element.closest('.fa-icon') || element;
          console.log("143 line",targetElement)

          return {
                tagName: targetElement.tagName,
                id: targetElement.getAttribute('role') || "",
                name: targetElement.getAttribute('data-icon') || "",
                dataName: targetElement.getAttribute('data-icon') || "",
                textContent: targetElement.textContent.trim()||targetElement.className||"",
                className: targetElement.className, // Capture FontAwesome icon's className (e.g., 'fa-circle-info')
              };
        }else{
          return {
            tagName: element.tagName,
            id: element.getAttribute('id') || null,
            name: element.getAttribute('name') || null,
            dataName: element.getAttribute('data-name') || element.textContent.trim(),
            textContent: element.textContent.trim()||"",
          };
        }
   
  };

  // const getElementData = (element) => {
  //   // Check if the element is a FontAwesome icon or part of it
  //   let targetElement = element;
  //   if (element.tagName === 'svg' || element.tagName === 'path') {
  //     // Traverse up to find the FontAwesomeIcon container (if needed)
  //     targetElement = element.closest('.fa-icon') || element;
  //     console.log("143 line",targetElement)
  //   }

  //   return {
  //     tagName: targetElement.tagName,
  //     id: targetElement.id || null,
  //     name: targetElement.getAttribute('name') || null,
  //     dataName: targetElement.getAttribute('data-icon') || null,
  //     textContent: targetElement.textContent.trim(),
  //     className: targetElement.className, // Capture FontAwesome icon's className (e.g., 'fa-circle-info')
  //   };
  // };

  // Function to get browser information
  const getBrowserInfo = () => {
    return `${navigator.appName} - ${navigator.appVersion}`;
  };

  // return <div>Tracking User Activity for {username}</div>;
};

export default TrackUserActivity;
