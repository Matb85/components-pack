import { mutations, Store } from "@matb85/base-pack";

window.astroPack = Store();
console.log("astroPack ready", window.astroPack);

function addPhotos(
  photos = document.querySelectorAll('.MP-photo:not(.MP-dont-load) > img') as NodeListOf<HTMLImageElement>
) {
  photos.forEach((img) => {
    if (!img.dataset?.prevent?.includes('addtolist'))
      img.addEventListener(
        'load',
        () =>
          mutations.addPhoto(window.astroPack, {
            src: img.dataset.minsrc!,
            srcset: img.dataset.minsrc!,
            group: img.dataset.group!,
            alt: img.alt!
          }),
        { once: true }
      );
    window.astroPack.observer.observe(img);
    const parent = img.parentElement as HTMLElement;
    if (parent.classList.contains('no-hover') || img.dataset?.prevent?.includes('enlargeonclick'))
      return;

    parent.addEventListener('click', () => {
      const multi = img.dataset.multi == '' || img.dataset.multi || 'false';
      const enlarger = multi == 'false' ? 'enlargePhoto' : 'enlargeManyPhotos';
      window.dispatchEvent(
        new CustomEvent(enlarger, { detail: { rect: parent.getBoundingClientRect(), img } })
      );
    });
  });
}

window.addEventListener('load', () => addPhotos());
window.addEventListener('MP-addPhotos', (e) => addPhotos((e as CustomEvent<NodeListOf<HTMLImageElement>>).detail));