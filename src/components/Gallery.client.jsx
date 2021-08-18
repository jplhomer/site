import {useCallback, useEffect, useState} from 'react';
import {useMediaGallery, Image, MediaFile} from '@shopify/hydrogen/client';

export default function Gallery() {
  const {mediaGalleryOpen} = useMediaGallery();

  return (
    <>
      <GalleryPreview />
      {mediaGalleryOpen && <GalleryOverlay />}
    </>
  );
}

function GalleryPreview() {
  const {previewImages, setSelectedMedia, setMediaGalleryOpen} =
    useMediaGallery();

  const [hoveredImage, setHoveredImage] = useState();
  const galleryImages = previewImages.slice(1);
  if (!galleryImages.length) {
    return null;
  }

  return (
    <ul className="grid lg:grid-cols-2 gap-10">
      {galleryImages.slice(1).map((image) => {
        return (
          <li
            key={image.id}
            className="cursor-pointer relative"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage()}
          >
            <Image
              className="w-full bg-white rounded-md object-cover cursor-pointer"
              image={image.image}
              options={{
                height: '1000',
                crop: 'center',
              }}
              onClick={() => {
                setMediaGalleryOpen(true);
                setSelectedMedia(image.id);
              }}
            />
            {image.id === hoveredImage && (
              <div className="pointer-events-none bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-xl  text-white rounded-full h-12 w-12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function GalleryInteractive() {
  const {
    previewImages,
    setSelectedMedia,
    selectedMedia,
    getNextMediaID,
    getPreviousMediaID,
    setMediaGalleryOpen,
  } = useMediaGallery();
  const viewNextMedia = useCallback(
    (id) => {
      const nextId = getNextMediaID(id);
      setSelectedMedia(nextId);
    },
    [getNextMediaID, setSelectedMedia],
  );
  const viewPreviousMedia = useCallback(
    (id) => {
      const prevId = getPreviousMediaID(id);
      setSelectedMedia(prevId);
    },
    [getPreviousMediaID, setSelectedMedia],
  );

  useEffect(() => {
    function onKeydown(event) {
      if (event.code.toLowerCase() === 'arrowleft') {
        viewPreviousMedia(selectedMedia.id);
        return;
      }

      if (event.code.toLowerCase() === 'arrowright') {
        viewNextMedia(selectedMedia.id);
      }
    }
    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [viewNextMedia, viewPreviousMedia, selectedMedia]);

  const showPips =
    previewImages.length > 1 && selectedMedia.mediaContentType === 'IMAGE';

  return (
    <div className="z-20 w-full h-full bg-gray-100 relative rounded flex items-center justify-center overflow-hidden">
      {previewImages.length > 1 && (
        <button
          type="button"
          onClick={() => {
            viewPreviousMedia(selectedMedia.id);
          }}
          className="z-10 rounded-full bg-white w-12 h-12 flex items-center justify-center m-5 absolute left-0 top-1/2 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">View previous media</span>
        </button>
      )}

      {previewImages.length > 1 && (
        <button
          type="button"
          onClick={() => {
            viewNextMedia(selectedMedia.id);
          }}
          className="z-10 rounded-full bg-white w-12 h-12 flex items-center justify-center m-5 absolute right-0 top-1/2 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">View next media</span>
        </button>
      )}

      {showPips && (
        <ul className="flex items-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {previewImages.map((image, index) => (
            <button
              type="button"
              key={image.id}
              onClick={() => {
                setSelectedMedia(image.id);
              }}
              className={`z-10 rounded-full bg-white m-2 ${
                image.id === selectedMedia.id ? 'h-3 w-3' : 'h-2 w-2'
              }`}
            >
              <span className="sr-only">View media {index}</span>
            </button>
          ))}
        </ul>
      )}

      <MediaFile className="h-full object-cover" media={selectedMedia} />

      <button
        type="button"
        className="z-50 absolute top-8 right-8"
        onClick={() => setMediaGalleryOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

function GalleryOverlay() {
  const {setMediaGalleryOpen} = useMediaGallery();

  useEffect(() => {
    function onKeydown(event) {
      if (event.code.toLowerCase() !== 'escape') {
        return;
      }
      setMediaGalleryOpen(false);
    }

    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [setMediaGalleryOpen]);

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-30">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-60"
        onClick={() => {
          setMediaGalleryOpen(false);
        }}
      />
      <div className="max-w-7xl w-11/12 h-5/6">
        <GalleryInteractive />
      </div>
    </div>
  );
}
