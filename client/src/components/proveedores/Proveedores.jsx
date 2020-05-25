import React from "react";
import SideBar from "../layout/SideBar";

const Proveedores = () => {
  return (
    <div className="side-bar-page">
      <SideBar
        nombre={"Jorge Rivera"}
        modulos={[
          { key: 1, nombre: "productos", link: "inventario" },
          { key: 2, nombre: "ventas", link: "ventas" },
          { key: 3, nombre: "facturas", link: "facturas" },
          { key: 4, nombre: "personal", link: "usuarios" },
          { key: 5, nombre: "reportes", link: "reportes" },
          { key: 6, nombre: "clientes", link: "clientes" },
        ]}
      />

      <div class="wrapper">
        <div class="agregar-proveedor">
          <div class="input-fields">
            <h1>Agregar Proveedor</h1>
            <input type="text" class="input" placeholder="Nombre" />
            <input
              type="text"
              class="input"
              placeholder="Correo Electronico "
            />
            <input type="text" class="input" placeholder="Telefono" />
          </div>
          <div class="mensaje">
            <div class="btn-guardar">Guardar</div>
            <div class="btn-cancelar">Cancelar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedores;