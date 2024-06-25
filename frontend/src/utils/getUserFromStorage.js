export const getUserFromStorage=()=>{
 const token=    JSON.parse(localStorage.getItem('userInfo')||null);
 return token?.token
}
export const getUsernameFromStorage=()=>{
    const username=    JSON.parse(localStorage.getItem('userInfo')||null);
    return username?.username  
}