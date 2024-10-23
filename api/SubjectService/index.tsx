import axios from "axios";
import { baseUrl } from "../../utils";
const getSyllabus = async (access_token: string) => {
  let headers: any = {
    Authorization: `Bearer ${access_token}`,
    "Abp-TenantId": "1",
  };
  try {
    const { data } = await axios.get(
      `${baseUrl}/api/services/app/SubjectService/GetAll`,
      headers
    );
    let filterData = data.result.items.map((e: any) => {
      return e;
    });
    return filterData;
  } catch (error) {
   
  }
};
export { getSyllabus };
