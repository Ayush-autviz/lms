import moment from "moment";

const getVideoId = (url: any) => {
  console.log(url, "getyvedioId");
  var id = "";
  if (Boolean(url) && url.includes("v=")) {
    id = url.split("v=")[1];
    if (id != null) {
      return id.includes("&") ? id.split("&")[0] : id;
    }
  } else {
    var arrayUrl = url.split("/");
    if (arrayUrl.length > 3) {
      id = arrayUrl[arrayUrl.length - 1].split("?")[0];
    } else {
      id = arrayUrl[arrayUrl.length - 1];
    }
  }
  return id;
};

const trimText = (desc: string) => {
  if (desc == null) return "Details Not Available";
  let newDesc = desc.split(" ");
  if (newDesc.length < 8) return desc;
  let res = "";
  for (let i = 0; i <= 12 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};

const trimName = (desc: string) => {
  let newDesc = desc.split(" ");
  if (newDesc.length <= 2) return desc;
  let res = "";
  for (let i = 0; i <= 2; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};
const trimDate = (date: any) => {
  return moment(date).format("LL");
};
const calcValidity = (num: any) => {
  var str = `${num}`;
  var sliced = str.slice(0, 10);
  return sliced;
};
const enrollTrimText = (desc: string) => {
  let newDesc = desc.split(" ");
  let res = "";
  for (let i = 0; i <= 9 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  if (newDesc.length <= 10) return res;
  return res + "...";
};
const enrollTrimTextName = (desc: string) => {
  let newDesc = desc.split(" ");
  if (newDesc.length < 3) return desc;
  let res = "";
  for (let i = 0; i <= 3 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};
const checkArrayIsEmpty = (arr: any) => {
  return Array.isArray(arr) ? false : true;
};
let options_: any = {
  observe: "response",
  responseType: "blob",
  headers: {
    Accept: "text/plain",
    "Abp-TenantId": "1",
  },
};
const trimTextName = (desc: string) => {
  let newDesc = desc.split(" ");
  if (desc.length < 10) return desc;
  let res = "";
  for (let i = 0; i <= 8 && i < newDesc.length; i++) {
    res += newDesc[i] + " ";
  }
  return res + "...";
};

export {
  getVideoId,
  trimName,
  trimText,
  trimDate,
  calcValidity,
  enrollTrimText,
  enrollTrimTextName,
  checkArrayIsEmpty,
  trimTextName,
  options_,
};