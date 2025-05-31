import type { ComponentType } from "react";

export default function ItemList({
  items,
  Component,
}: {
  items: { id: string; name: string }[];
  Component: ComponentType<{
    id: string;
    name: string;
    className?: string;
  }>;
}) {
  return items.map((item) => (
    <Component
      key={item.id}
      id={item.id}
      name={item.name}
      className="px-5"
    />
  ));
}
