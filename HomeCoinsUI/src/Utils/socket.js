import { io } from "socket.io-client";
import { ApiContextURL } from "./URLProperties";
const socket = io.connect(ApiContextURL);
export default socket;