import axios from "../common/config/AxiosConfig";
export const fetchAlerts = () => {
    return () => {
        axios
            .get("/orgs/mosip-intern/dependabot/alerts") 
            .then((res) => {
                if (!res.data) { throw new Error("No alerts found"); }
                localStorage.setItem("jwt", res.data.accessToken);
                console.log("-------this is then loginnn------- ", res);
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("hid",res.data.hospitalId);
                localStorage.setItem("role",res.data.roles[0]);
                // if (res.data.users[0].firstLogin)
                //     history.push("/changePassword");
                // else//
                // getAllHospitals();
            })
            .catch((err) => {
                console.log("-----this is catch------", err);
            })
    }
}
