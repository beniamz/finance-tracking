import axios from 'axios';
import {useState, useEffect} from 'react'

import Form from './components/form'
import List from './components/list'


const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const getDataFromAirtable = async () => {
    try {
    const config = {
      headers : {
        Authorization: "Bearer keyxaXoYLKqfZu5qQ",        
      },
    };

      setLoading(true)
      const response = await axios.get(
        "https://api.airtable.com/v0/app4jQXyVuqELpJIX/Table%201?maxRecords=100&view=Grid%20view", 
        config
        );

        const newData = response.data.records.map(item => ({          
            id: item.id,
            name: item.fields.name,
            description: item.fields.description,
            nominal: item.fields.nominal,
            type: item.fields.type, 
          }))          

        setData(newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataFromAirtable();
  }, []);


  const addData =  async (newData) => {

    try {
    const sendData = JSON.stringify({
      records: [
        {
          fields: newData,          
        }
      ],
    });

    const config = {
      headers : {
        Authorization: "Bearer keyxaXoYLKqfZu5qQ", 
        "Content-Type": "application/json",      
      },
    };

    setPostLoading(true)

    const response = await axios.post(
      'https://api.airtable.com/v0/app4jQXyVuqELpJIX/Table%201',
      sendData, 
      config
    );

    const responseData = response.data.records[0]
    const fixData = {
      id: responseData.id,
      name: responseData.fields.name,
      description: responseData.fields.description,
      nominal: responseData.fields.nominal,
      type: responseData.fields.type,

    }

    setData([...data, fixData])
    } catch (error) {
      console.log(error);
    } finally {
     setPostLoading(false);
    }

    
  }



  const removeData = async (id) => {
    try {
    const axiosParams = {
      method: "delete",
      url: `https://api.airtable.com/v0/app4jQXyVuqELpJIX/Table%201/${id}`,
      headers : {
        Authorization: "Bearer keyxaXoYLKqfZu5qQ", 
        "Content-Type": "application/json",
      },
    };   
    
    setLoading(true);

    await axiosgit(axiosParams);
    
    const newData = data.filter((item) => item.id !== id);

    setData(newData);
    alert("Data berhasil dihapus !");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{
      height:"100vh"
    }}>
    <div className="container text-white" >

      <div className="row mt-5">
        <h5 className="text-center mb-1">Aplikasi Tracking Keuangan </h5>
        <h4 className="text-center text-warning mb-2">WAROENG NENEK HJ. ICIH</h4>
        <div className="d-flex justify-content-center align-items-center">
          <img src="/image.svg" alt="img" 
          style={{
            objectFit: "scale-down",
            width: "10rem"
            }}
          />
        </div>
      </div>
      <div className="row mt-3">
        <List data={data} type="income" bg="success" removeData={removeData} loading={loading} />
        <Form addData={addData} postLoading={postLoading} />
        <List data={data} type="expense" bg="primary" removeData={removeData} loading={loading} />
      </div>

      <div className="row mt-5">
        <p className="text-center mt-10">@copyright: BNI - 2022</p>
      </div>
      
    </div>
    </div>
  )
}

export default App;