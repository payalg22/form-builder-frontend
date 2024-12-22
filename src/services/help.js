export const handleApiRes = (res) => {
    if(res.status === 200) {
        return res.data;
    } else if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login/new"
        alert("Please login to continue");
    } else {
        alert("Something went wrong.");
    }

    return null;
}