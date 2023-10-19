document.addEventListener("DOMContentLoaded", function() {
    // getting background image from storage
    const backgroundImageUrl = localStorage.getItem("backgroundImage");
    if (backgroundImageUrl) {
      document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    }

    const authorLink = localStorage.getItem("authorLink");
    const imagePhotographer = document.getElementById("imagephotographer");
    
    const linkElement = document.createElement("a");
    linkElement.href = authorLink;
    linkElement.textContent = "Image Photographer";
    linkElement.target = "_blank"; // Opens the link in a new tab
    linkElement.classList.add("grey-link");
    
    imagePhotographer.innerHTML = ""; // Clear the content
    imagePhotographer.appendChild(linkElement);
    
    
  });
  
