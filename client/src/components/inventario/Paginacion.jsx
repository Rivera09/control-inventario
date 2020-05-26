import React from "react";

const Paginacion = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`btn ${
              number === currentPage ? "green-btn" : "blue-btn"
            }`}
            onClick={() => paginate(number)}
          >
            <p>{number} </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacion;
