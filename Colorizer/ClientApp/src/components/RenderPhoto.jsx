import React from 'react'

export default function RenderPhoto(response) {

    if (response != null) {

        var arrayBufferView = new Uint8Array(response);
        var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var img = document.querySelector("#photo");
        img.src = imageUrl;
        return <img id="photo" />
    }
}
