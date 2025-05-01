document.addEventListener("DOMContentLoaded", function () {
    fetch("js/influentialfigures.json") // Load image data from a JSON file
        .then(response => response.json())
        .then(data => {
            const images = data.images;
            const carouselImages = document.getElementById("carouselImages");
            const caption = document.getElementById("carouselCaption");
            let currentIndex = 0;

            // Clear any existing images (precaution)
            carouselImages.innerHTML = "";

            // Add all images to the carousel container
            images.forEach((imgData, index) => {
                const img = document.createElement("img");
                img.src = imgData.url;
                img.alt = imgData.alt;
                img.style.display = index === 0 ? "block" : "none"; // Show only the first image
                carouselImages.appendChild(img);
            });

            const imageElements = carouselImages.querySelectorAll("img");
            caption.textContent = images[0].caption || ""; // Set initial caption

            // Function to update image display and caption
            function showImage(index) {
                imageElements.forEach((img, i) => {
                    img.style.display = i === index ? "block" : "none";
                });
                caption.textContent = images[index].caption || "";
            }

            // Left arrow click
            document.getElementById("carouselPrev").addEventListener("click", function (e) {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });

            // Right arrow click
            document.getElementById("carouselNext").addEventListener("click", function (e) {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });

            // Auto-advance the carousel every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000); // 5000 milliseconds = 5 seconds
        })
        .catch(error => {
            console.error("Error loading carousel JSON:", error);
        });
});
