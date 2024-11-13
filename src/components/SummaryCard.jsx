export default function Card({ title, value }) {
    return (
      <div className="summary-card">
        <h2>{title}</h2>
        <p>{value}</p>
      </div>
    );
  }