import React from "react";

const TablaProveedores = ({ proveedores }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Productos</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((proveedor) => (
          <tr key={proveedor.id}>
            <td>{proveedor.nombre}</td>
            <td>{proveedor.email}</td>
            <td>{proveedor.email}</td>
            <td>{proveedor.productos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProveedores;
