import axios from 'axios';

export const uploadImg = async (ev) => {
    // Defining our variables
    const UPLOAD_PRESET = 'ywe6lwct' // Insert yours
    const CLOUD_NAME = 'dklqusztc' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    console.log(FORM_DATA);
    // Sending a post method request to Cloudniarys' API
    try {
         const res = await axios.post(UPLOAD_URL, FORM_DATA)
         return res.data;
    } catch (err) {
        console.error('ERROR!', err)
    }
}



















// FETCH
// export const uploadImg = async (ev) =>{
//     // Defining our variables
//     const UPLOAD_PRESET = '' // Insert yours
//     const CLOUD_NAME = '' // Insert yours
//     const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
//     const FORM_DATA = new FormData();
//     // Building the request body
//     FORM_DATA.append('file', ev.target.files[0])
//     FORM_DATA.append('upload_preset',UPLOAD_PRESET)
//     // Sending a post method request to Cloudniarys' API
//     try {
//         const res = await fetch(UPLOAD_URL, {
//             method: 'POST',
//             body: FORM_DATA
//         })
//         return res.json();
//     } catch(err) {
//         console.error('ERROR!', err)
//     }
// }