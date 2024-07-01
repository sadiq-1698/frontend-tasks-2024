import { useEffect, useState } from "react";
import "./styles.css";

const PAGE_LIMIT = 18;

const DisplayProducts = ({ products, loading }) => {
  return (
    <div className="products-grid">
      {products.map((prod) => (
        <div
          key={prod.id}
          className={`products-grid__single ${loading ? "loading" : ""}`}
        >
          {prod.title}
        </div>
      ))}
      {loading && <p className="products-loader">Loading...</p>}
    </div>
  );
};

const Pagination = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageNavClick = (pageNum) => {
    setPage(pageNum);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_LIMIT}&skip=${
          PAGE_LIMIT * page - PAGE_LIMIT
        }`
      );
      const data = await res.json();
      setTotalCount(data.total);
      setProducts([...data.products]);
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="pagination-wrapper">
      <DisplayProducts products={products} loading={loading} />

      <button
        disabled={page === 1}
        onClick={() => handlePageNavClick(page - 1)}
      >
        Previous
      </button>

      {[...Array.from({ length: Math.ceil(totalCount / PAGE_LIMIT) })].map(
        (el, idx) => (
          <button
            key={PAGE_LIMIT - idx}
            onClick={() => handlePageNavClick(idx + 1)}
            className={`${page === idx + 1 ? "active" : ""}`}
          >
            {idx + 1}
          </button>
        )
      )}

      <button
        disabled={page === Math.ceil(totalCount / PAGE_LIMIT)}
        onClick={() => handlePageNavClick(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
