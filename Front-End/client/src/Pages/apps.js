const getAppointments =  async () => {
        
    
    const res = await fetch("http://localhost:3001/getappointments",{

      method: "GET",
      headers: {token: localStorage.token}

    });

    const jsonData = await res.json();
    let apps = jsonData.rows;

    console.log("getAppointments ran");


    return apps;

  };
