import { useState } from 'react';
import styles from '../styles.module.scss';
import Pagination from '../../Pagination/index';
import { Review } from '../../../@types/model';

type OtherReviewsProps = {
  reviews: Review[];
}

export default function OtherReviews(props: OtherReviewsProps) {
  const user = JSON.parse(localStorage.getItem("currentUser") || '{}');
  const otherReviews = props.reviews.filter((r: Review) => r.user_id !== user.id);

  const [currentReviewPage, setCurrentReviewPage] = useState<number>(1);
  const reviewsPerPage = 5;

  const paginatedReviews = otherReviews.slice(
    (currentReviewPage - 1) * reviewsPerPage,
    currentReviewPage * reviewsPerPage
  );

  const totalReviewPages = Math.ceil(otherReviews.length / reviewsPerPage);

  return (
  <div className={styles.reviewsSection}>
    <h2>Other Reviews</h2>
    {paginatedReviews.length > 0 ? (
      paginatedReviews.map((r: Review) => (
        <div key={r.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <span>Rating: {r.rating} ⭐</span>
            <span className={styles.reviewDates}>
              Created: {new Date(r.created_at).toLocaleDateString()}<br />
              Updated: {new Date(r.updated_at).toLocaleDateString()}
            </span>
          </div>
          <p>{r.comment}</p>
        </div>
      ))
    ) : (
      <p>No reviews available.</p>
    )}
    {totalReviewPages > 1 && (
      <div className={styles.paginationContainer}>
        <Pagination
          totalItems={otherReviews.length}
          itemsPerPage={reviewsPerPage}
          currentPage={currentReviewPage}
          onPageChange={(page) => setCurrentReviewPage(page)}
        />
      </div>
    )}
  </div>
  )
}