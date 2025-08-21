import axios from 'axios';
import React, { useEffect } from 'react'
import { getToken } from '../../utils/auth';
import axiosInstance from '../../api/axiosConfig';

const Dashboard = () => {
    const access_token = localStorage.getItem('access_token')
    useEffect(()=>{
        const fetchProtectedData = async()=> {
            try {
                const response = await axiosInstance.get('protected-view/');
                console.log("Success",response.data);
            } catch (error) {
                console.error("Error fecthing data",error);
            }
        }
        fetchProtectedData();

    },[]);
  return (
    <div className='container text-light'>Dashboard</div>
  )
}

export default Dashboard