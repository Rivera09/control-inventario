import React from "react";

const TablaClientes = ({ clientes }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>RTN</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.rtn}</td>
            <td>{cliente.saldo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaClientes;
