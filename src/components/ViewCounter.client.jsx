import {useEffect, useState} from 'react';

export default function ViewCounter({
  id,
  views: initialViews,
  shouldIncrement = false,
}) {
  const [views, setViews] = useState(initialViews);

  const label = parseInt(views) === 1 ? 'view' : 'views';

  useEffect(() => {
    async function incrementViews() {
      const newViews = await fetch(`/counter?id=${id}`, {
        method: 'POST',
      }).then((r) => r.text());
      setViews(newViews ?? views);
    }

    if (!shouldIncrement) return;

    incrementViews();
  }, [shouldIncrement]);

  return (
    <span className="text-gray-600 dark:text-gray-200 text-sm">
      {views} {label}
    </span>
  );
}
