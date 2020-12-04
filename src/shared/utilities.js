export const parseDuration = (string) => {
  const removedString = ["D", "H", "M"];
  let length = "";
  for (let i = 2; i < string.length - 1; i++) {
    if (removedString.includes(string[i])) {
      length = length + ":";
    } else {
      length = length + string[i];
    }
  }

  return length;
};

export const parseTime = (string) => {
  const postedAt = Date.parse(string);
  const currTime = new Date();

  const timeDiff = new Date(currTime - postedAt);
  const msTimeDiff = timeDiff.getTime();
  let timePosted = "";

  if (msTimeDiff / (1000 * 60) < 1) {
    timePosted = Math.floor(msTimeDiff / 1000);
    timePosted =
      timePosted < 2 ? `${timePosted} second ago` : `${timePosted} seconds ago`;
  } else if (msTimeDiff / (1000 * 60 * 60) < 1) {
    timePosted = Math.floor(msTimeDiff / (1000 * 60));
    timePosted =
      timePosted < 2 ? `${timePosted} minute ago` : `${timePosted} minutes ago`;
  } else if (msTimeDiff / (1000 * 60 * 60 * 24) < 1) {
    timePosted = Math.floor(msTimeDiff / (1000 * 60 * 60));
    timePosted =
      timePosted < 2 ? `${timePosted} hour ago` : `${timePosted} hours ago`;
  } else if (msTimeDiff / (1000 * 60 * 60 * 24 * 7) < 1) {
    timePosted = Math.floor(msTimeDiff / (1000 * 60 * 60 * 24));
    timePosted =
      timePosted < 2 ? `${timePosted} day ago` : `${timePosted} days ago`;
  } else if (msTimeDiff / (1000 * 60 * 60 * 730) < 1) {
    // Approximately 730 hours makes a month
    timePosted = Math.floor(msTimeDiff / (1000 * 60 * 60 * 24 * 7));
    timePosted =
      timePosted < 2 ? `${timePosted} week ago` : `${timePosted} weeks ago`;
  } else if (msTimeDiff / (1000 * 60 * 60 * 8760) < 1) {
    // 8760 hours makes a calender year
    timePosted = Math.floor(msTimeDiff / (1000 * 60 * 60 * 730));
    timePosted =
      timePosted < 2 ? `${timePosted} month ago` : `${timePosted} months ago`;
  } else {
    // It is over a year
    timePosted = Math.floor(msTimeDiff / (1000 * 60 * 60 * 8760));
    timePosted =
      timePosted < 2 ? `${timePosted} year ago` : `${timePosted} years ago`;
  }

  return timePosted;
};

export const parseText = (text, noOfChars) => {
  const textArray = text.split(" ");
  const newArray = [];

  let currCharLength = 0;
  textArray.forEach((currWord, i) => {
    if (currCharLength + currWord.length > noOfChars) {
      return;
    } else {
      currCharLength = currCharLength + currWord.length;
      newArray.push(currWord);
    }
  });

  return `${newArray.join(" ")}...`;
};

export const parseViewCount = (string) => {
  let views = "";
  const truncateDecPlc = (num) =>
    num.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];
  if (string.length <= 3) {
    // views = views
  } else if (string.length <= 6) {
    views = `${Math.floor(+string / 1000)}K`;
  } else if (string.length <= 9) {
    views = truncateDecPlc(+string / 1000000).toString();
    const lastDig = views.slice(-1);
    views = `${
      lastDig === "0" ? views.substring(0, views.length - 2) : views
    }M`;
  } else if (string.length <= 12) {
    views = truncateDecPlc(+string / 1000000000);
    const lastDig = views.slice(-1);
    views = `${
      lastDig === "0" ? views.substring(0, views.length - 2) : views
    }B`;
  }

  return views;
};
