export function RatingDisplay({ rating }: { rating: number }) {
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return (
    <div>
      {filledStars}
      {emptyStars}
    </div>
  );
}
