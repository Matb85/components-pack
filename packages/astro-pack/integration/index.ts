export function addPhotos(photos: NodeListOf<HTMLImageElement>) {
  window.dispatchEvent(new CustomEvent<NodeListOf<HTMLImageElement>>("MP-addPhotos", { detail: photos }));
}
