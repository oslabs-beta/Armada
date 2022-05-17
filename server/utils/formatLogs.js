const formatLogs = (arr) => {
  arr.pop();
  const trimmed = arr.map((el) => el.split(/[ ]{2,}/));
  const headers = trimmed[0].map((el) => el.toLowerCase().replace(' ', '_'));
  trimmed.shift();
  return trimmed.map((row) => {
    let obj = {};
    row.forEach((r, i) => {
      obj[headers[i]] = row[i];
    });

    return obj;
  });
};

module.exports = formatLogs;
