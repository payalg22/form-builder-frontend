export const handleApiRes = (res) => {
    if(res.status === 200) {
        return res.data;
    } else if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"
        alert("Please login and try again");
    } else {
        return res;
    }
    return null;
}