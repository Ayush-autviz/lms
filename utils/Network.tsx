import axios from "axios";
import { baseUrl } from ".";
const MarkIsView = async (header: any, id: any) => {
  try {
    const res = await axios.get(
      `${baseUrl}/app/EnrollMockTest/MarkIsView?id=${id}`,
      header
    );
    return res;
  } catch (error) {
    console.log("MarkView Api", error);
  }
};
export { MarkIsView };
