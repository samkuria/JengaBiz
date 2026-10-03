import React from 'react';

export default function MetricCard({ title, value }) {
  return (
    <div className="pro-card">
      <h4 className="card-title">{title}</h4>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}