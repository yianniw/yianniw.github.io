
const isMobile = () => { return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); }

function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); return true });
  return images;
}

export {isMobile, importAll}