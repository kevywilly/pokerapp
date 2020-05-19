const prod = false;

const base_path = prod ? "https://api.pokerapp.com" : "http://localhost:8080";
const auth_path:string = `${base_path}/auth`;

export const API = {
    base_path,
    auth_path
}
