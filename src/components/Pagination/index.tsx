import styles from './styles.module.scss';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button onClick={() => props.onPageChange(1)} disabled={props.currentPage === 1}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>

      <button onClick={() => props.onPageChange(props.currentPage - 1)} disabled={props.currentPage === 1}>
        <MdOutlineKeyboardArrowLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => props.onPageChange(page)}
          className={page === props.currentPage ? styles.active : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={() => props.onPageChange(props.currentPage + 1)} disabled={props.currentPage === totalPages}>
        <MdOutlineKeyboardArrowRight />
      </button>

      <button onClick={() => props.onPageChange(totalPages)} disabled={props.currentPage === totalPages}>
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
}
