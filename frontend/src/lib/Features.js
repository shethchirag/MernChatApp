import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") {
    return "video";
  }
  if (fileExt === "mp3" || fileExt === "wav") {
    return "audio";
  }
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  ) {
    return "image";
  }

  return "file";
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/w_${width},dpr_auto/`);
  return newUrl;
};

const getLast7Days = () => {
  const CurrentDate = moment();
  const Last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = CurrentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");
    Last7Days.unshift(dayName);
  }
  return Last7Days;
};

export { fileFormat, transformImage, getLast7Days };
