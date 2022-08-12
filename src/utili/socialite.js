const SocialLogin=async (provider,data)=>{
return await axios.post(`api/login/${provider}`).catch((error)=>{
    throw Error(error);
}).then((res)=>{
console.log(res);
});

}