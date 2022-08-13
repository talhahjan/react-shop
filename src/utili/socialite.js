import axios from 'axios';
const Socialite=async (userData)=>{
return await axios.post(`api/login/${userData.provider}`, userData).catch((error)=>{
  throw Error(error);
}).then((res)=>{
console.log(res);
});

}



export default Socialite;
