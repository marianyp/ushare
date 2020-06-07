import axios from "axios";

export default function ShareTarget(req, res) {
    res.setHeader("Content-Type", "application/json")
    console.log(req)
    return res.status(200).send(req.body)
    // axios.post('/', {url: })   
}