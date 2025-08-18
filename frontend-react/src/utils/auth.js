
export const saveToken = (access_token,reresh_token) => {
    localStorage.setItem('access_token',access_token);
    localStorage.setItem('refresh_token',reresh_token);
};

export const getToken = ()=> {
    return localStorage.getItem('access_token');
};

export const removeToken = ()=>{
    localStorage.removeItem('acess_token');
    localStorage.removeItem('refresh_token');
};

export const isAuthenticated = () => !!getToken();
