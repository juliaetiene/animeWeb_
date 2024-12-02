function logout() {
    localStorage.removeItem('user');
    window.location.href = "/pages/login.html";
}