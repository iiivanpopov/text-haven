import Storage from "./[id]/page";

export default function StorageRoot() {
  return <Storage params={new Promise((resolve) => resolve({ id: "" }))} />;
}
