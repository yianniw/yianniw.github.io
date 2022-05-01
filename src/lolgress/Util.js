
const isMobile = () => { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); }
const isBlank = (str) => { return (!str || /^\s*$/.test(str)); }

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); return true });
  return images;
}

export {isMobile, isBlank, importAll}