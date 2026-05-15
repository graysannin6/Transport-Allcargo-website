const tireBrands = [
  { name: "Cooper Tires", logo: "assets/logos/cooper-tires.svg" },
  { name: "Kumho Tire", logo: "assets/logos/kumho-tire.svg" },
  { name: "West Lake", logo: "assets/logos/west-lake.svg" },
  { name: "Hercules Tires", logo: "assets/logos/hercules-tires.svg" },
  { name: "Ironman", logo: "assets/logos/ironman.svg" },
  { name: "General Tire", logo: "assets/logos/general-tire.svg" },
  { name: "Firestone", logo: "assets/logos/firestone.svg" },
  { name: "Starfire", logo: "assets/logos/starfire.svg" },
  { name: "Fuzion", logo: "assets/logos/fuzion.svg" },
  { name: "Falken", logo: "assets/logos/falken.svg" },
  { name: "Dunlop", logo: "assets/logos/dunlop.svg" },
  { name: "Continental", logo: "assets/logos/continental.svg" },
  { name: "Bridgestone", logo: "assets/logos/bridgestone.svg" },
  { name: "BFGoodrich", logo: "assets/logos/bfgoodrich.svg" },
  { name: "Laufenn", logo: "assets/logos/laufenn.svg" },
  { name: "Goodyear", logo: "assets/logos/goodyear.svg" },
  { name: "Kelly Tires", logo: "assets/logos/kelly-tires.svg" },
  { name: "Toyo", logo: "assets/logos/toyo.svg" },
  { name: "Pirelli", logo: "assets/logos/pirelli.svg" },
  { name: "Nitto", logo: "assets/logos/nitto.svg" },
  { name: "Yokohama", logo: "assets/logos/yokohama.svg" },
  { name: "Hankook", logo: "assets/logos/hankook.svg" },
  { name: "Michelin", logo: "assets/logos/michelin.svg" },
  { name: "Uniroyal", logo: "assets/logos/uniroyal.svg" },
  { name: "Nexen", logo: "assets/logos/nexen.svg" },
];

const brandSelect = document.querySelector("#preferred-brand");
const brandsGrid = document.querySelector("#brands-grid");
const year = document.querySelector("#year");

const logoAccents = [
  "#e5252a",
  "#ffc928",
  "#2f80ed",
  "#20c997",
  "#f97316",
  "#8b5cf6",
  "#d61f69",
  "#14b8a6",
];

const getInitials = (brand) =>
  brand
    .replace("BFGoodrich", "BFG")
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

const buildBrandImage = (brand, index) => {
  const accent = logoAccents[index % logoAccents.length];
  const secondary = logoAccents[(index + 3) % logoAccents.length];
  const initials = getInitials(brand);
  const displayName = brand.replace(/&/g, "&amp;");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 236" role="img" aria-label="${displayName} brand badge">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#151a22"/>
          <stop offset="0.58" stop-color="#242b36"/>
          <stop offset="1" stop-color="#080b10"/>
        </linearGradient>
        <linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="${accent}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="420" height="236" rx="18" fill="url(#bg)"/>
      <path d="M0 179 C90 138 157 225 246 177 C318 138 367 150 420 113 L420 236 L0 236 Z" fill="#0f131a" opacity="0.86"/>
      <g transform="translate(42 38)">
        <circle cx="56" cy="58" r="48" fill="none" stroke="url(#accent)" stroke-width="12"/>
        <circle cx="56" cy="58" r="27" fill="none" stroke="#f8fafc" stroke-width="5" opacity="0.9"/>
        <path d="M22 25 L90 92 M90 25 L22 92 M9 58 H104 M56 10 V106" stroke="#f8fafc" stroke-width="4" opacity="0.22"/>
      </g>
      <rect x="180" y="44" width="168" height="14" rx="7" fill="url(#accent)"/>
      <text x="180" y="116" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="900" letter-spacing="0">${initials}</text>
      <text x="180" y="154" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="0">${displayName}</text>
      <path d="M290 190 H378" stroke="url(#accent)" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

tireBrands.forEach(({ name }) => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  brandSelect.appendChild(option);
});

tireBrands.forEach(({ name, logo }, index) => {
  const tile = document.createElement("article");
  tile.className = "brand-tile";

  const logoWrap = document.createElement("div");
  logoWrap.className = "brand-logo-frame";

  const image = document.createElement("img");
  image.className = "brand-logo";
  image.src = logo;
  image.alt = `${name} logo`;
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = buildBrandImage(name, index);
    image.alt = `${name} logo unavailable`;
  };

  const nameEl = document.createElement("span");
  nameEl.className = "brand-name";
  nameEl.textContent = name;

  logoWrap.appendChild(image);
  tile.append(logoWrap, nameEl);
  brandsGrid.appendChild(tile);
});

year.textContent = new Date().getFullYear();
