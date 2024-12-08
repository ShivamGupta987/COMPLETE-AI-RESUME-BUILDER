// import { data } from 'autoprefixer';
// import axios from 'axios';
// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// const axiosClient = axios.create({
//     baseURL: 'http://localhost:1337/api/',
//     headers: {
//         'Content-Type':'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//     }

// })

// const CreateNewResume = (data)=>axiosClient.post('user-resumes',data)


// // const GetUserResume=(userEmail)=>axiosClient.get('user-resumes?filters[userEmail][$eq]='+userEmail)
// const GetUserResume = (userEmail) => axiosClient.get(`user-resumes?filters[userEmail][$eq]=${userEmail}`);

// // const UpdateResumeDetail = (id,data)=>axiosClient.post('user-resumes'+id, data )
// const UpdateResumeDetail = (id, data) => axiosClient.post(`user-resumes/${id}`, data);

// export default {
//     CreateNewResume,
//     GetUserResume,
//     UpdateResumeDetail
// }

import { data } from 'autoprefixer';
import axios from 'axios';
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+"/api",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = (data) => axiosClient.post('user-resumes', data);

const GetUserResume = (userEmail) => axiosClient.get(`user-resumes?filters[userEmail][$eq]=${userEmail}`);

const UpdateResumeDetail = (id, data) => axiosClient.put(`user-resumes/${id}?populate=*`, data);

// populate * get everything from this document
const GetResumeById= (id) => axiosClient.get(`user-resumes/${id}?populate=*`);

const DeleteResumeById=(id)=>axiosClient.delete('user-resumes/'+id);

export default {
    CreateNewResume,
    GetUserResume,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};