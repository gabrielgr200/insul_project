// o loading inicial só deve aparecer uma vez por sessão, mesmo que o
// usuário entre primeiro em outra página (ex: cercas-prontas) e só
// depois navegue para a home
let loaded = false;

export const hasSiteLoaded = () => loaded;
export const markSiteLoaded = () => {
  loaded = true;
};
