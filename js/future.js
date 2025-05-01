fetch('js/future.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('gallery');

    data.images.forEach(image => {
      // Create a wrapper div
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      // Create the anchor element
      const anchor = document.createElement('a');
      anchor.href = image.url || image.src; // Open full image
      anchor.target = "_blank"; // Open in new tab

      // Create the image element
      const imgElement = document.createElement('img');
      imgElement.src = image.url || image.src;
      imgElement.alt = image.caption;
      imgElement.title = image.caption;

      // Append image to anchor
      anchor.appendChild(imgElement);

      // Create the caption
      const caption = document.createElement('div');
      caption.classList.add('caption');
      caption.textContent = image.caption;

      // Append anchor and caption to the wrapper
      imageContainer.appendChild(anchor);
      imageContainer.appendChild(caption);

      // Append the wrapper to the gallery
      gallery.appendChild(imageContainer);
    });
  })
  .catch(error => console.error('Error loading gallery images:', error));
