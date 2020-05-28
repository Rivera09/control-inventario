CREATE VIEW Clientes.VIEW_OBTENER_CLIENTES AS
SELECT
    idCliente as id,
    nombre,
    email,
    balance as saldo,
    rtn
FROM
    Clientes.Clientes