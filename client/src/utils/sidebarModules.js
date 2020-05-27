const generateModules = (isManager, from) => {
  return [
    {
      key: 1,
      nombre: from === 1 ? "Inicio" : "Inventario",
      link: from === 1 ? "/main" : "/inventario",
    },
    {
      key: 2,
      nombre: from === 2 ? "Inicio" : "Ventas",
      link: from === 2 ? "/main" : "/main",
    },
    {
      key: 3,
      nombre: from === 3 ? "Inicio" : isManager ? "Facturas" : "Tus facturas",
      link: from === 3 ? "/main" : "/facturas",
    },
    {
      key: 4,
      nombre: from === 4 ? "Inicio" : "Clientes",
      link: from === 4 ? "/main" : "/clientes",
    },
    isManager
      ? {
          key: 5,
          nombre: from === 5 ? "Inicio" : "Personal",
          link: from === 5 ? "/main" : "/usuarios",
        }
      : null,
    isManager
      ? {
          key: 6,
          nombre: from === 6 ? "Inicio" : "Proveedores",
          link: from === 6 ? "/main" : "/proveedores",
        }
      : null,
  ];
};

export default generateModules;
