export function addPhotos(photos) {
    window.dispatchEvent(new CustomEvent("MP-addPhotos", { detail: photos }));
}
