import metadata from "./metadata";

const seo = {
  titleTemplate: `%s | ${metadata.brand}`,
  defaultTitle: metadata.brand,
  description: "The perfect place to brain storm your dev side hustle",
  languageAlternatives: [{ hrefLang: "en" }],
};

export default seo;
