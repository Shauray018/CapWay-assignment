'use client';

import { useFilterStore } from '@/store/filterStore';
import { Button } from '../ui/button';

const CATEGORIES = [
  'All',
  'Orange',
  'Strawberry',
  'Lime',
  'Apple',
  'Banana',
  'Carrot',
  'Tomato',
  'Potato',
  'Onion',
  'Broccoli',
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useFilterStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          onClick={() =>
            setSelectedCategory(category === 'All' ? null : category)
          }
          variant={
            (category === 'All' && !selectedCategory) ||
            selectedCategory === category
              ? 'default'
              : 'outline'
          }
          className={
            (category === 'All' && !selectedCategory) ||
            selectedCategory === category
              ? 'bg-pink-700 hover:bg-pink-800'
              : ''
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}