let loaded = false;

export const hasSiteLoaded = () => loaded;
export const markSiteLoaded = () => {
  loaded = true;
};
