import React from 'react';
import styles from './styles.module.scss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {/* Primeira página */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        ⏮️
      </button>

      {/* Página anterior */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ⬅️
      </button>

      {/* Números de páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? styles.active : ""}
        >
          {page}
        </button>
      ))}

      {/* Próxima página */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        ➡️
      </button>

      {/* Última página */}
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
        ⏭️
      </button>
    </div>
  );
}
