const Auth = {
    authenticate() {
       localStorage.setItem('token','vaccify');
    },

    signout() {
        localStorage.removeItem('token');
    },
    
    getAuth() {
        return localStorage.getItem('token');
    }
};

export default Auth;