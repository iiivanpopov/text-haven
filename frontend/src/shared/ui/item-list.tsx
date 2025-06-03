import { ComponentType } from "react";

interface ItemListProps<T> {
  Component: ComponentType<T>;
  items: T[];
  getKey: (item: T) => string | number;
}

export function ItemList<T>({ Component, items, getKey }: ItemListProps<T>) {
  return (
    <>
      {items.map((item) => (
        <Component
          key={getKey(item)}
          {...item}
        />
      ))}
    </>
  );
}
