---
title: "JavaScript image compression and resizing"
date: "2020-09-11"
description: "Compress, resize and manipulate images directly in browser using JavaScript and avoid paying unnecessary costs for network bandwidth."
tags: "javascript image optimization"
---

Uploading and downloading images is a very common feature in modern web applications but exchanging files between client and server can quickly become a high resource consuming task. We must also consider that most Internet traffic comes from mobile devices, so we can expect users to upload photos taken with their phones. Those files can be very heavy (> 10MB) because of the ever increasing camera resolution on new mobile devices.

![baloons](kyle-hinkson-xyXcGADvAwE-unsplash-920x460.jpg)
Photo by [Kyle Hinkson](https://unsplash.com/@kajhinkson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Sharing images in your platform means that users upload their photos to your storage server and then other users download those photos to use them somehow. This task involves much more resources compared to storing a new record in the database. We can expect an higher cost in terms of:

- Upload bandwidth.
- Download bandwidth. In a typical use case, there are many downloads for each image uploaded.
- Storage. Photos and files are typically stored in a disk or in some object storage service. It's important to note that once you save a photo in your storage you must keep it stored throughout the lifetime of the software unless you apply some deletion policy. For this reason storage costs always increase during time, in contrast to bandwidth costs that depend on current usage.

Due to the pandemic emergency for COVID 19, in the period between March and June 2020, Nuvola has become the main hub for teachers, pupils and parents. This situation results in a rapid increase in traffic, as we have already talked about in a [previous article](https://labs.madisoft.it/nuvola-see-a-200-spike-in-traffic-due-to-the-closure-of-schools-for-covid-19/). Furthermore, the needs of schools have changed to address distance learning. For example, students should send homework to teachers and teachers should send corrections back. Until now, this functionality was not needed because this process was done physically in the classroom. This new feature clearly implies file sharing. Talking with our customers we discovered that users prefer to do their homework in their exercise book, take a picture and share it on the platform. This means that most of the shared files are images and, for this reason, the benefit of image compression will be really huge.

## How can image sharing be optimized?

The obvious answer is image compression. However, if image quality is your software primary concern, this technique is probably not right for you. A common solution involves server-side compression, reducing download bandwidth and storage space required. However this approach leads to increased CPU cycles which means an additional cost, even though probably less expensive than download bandwidth.

Thanks to modern browser API we can also reduce unnecessary upload bandwidth compressing images client-side, before uploading them. Reducing bandwidth also means a faster upload because compression time is much smaller than a large file upload request over network.

HTML5 features such as Canvas, FileReader and Blob allow compressing images directly in the browser, resulting in a lower number of bytes the platform needs to upload, store and download.

## A little bit of context from MDN

The [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) provides a means for drawing graphics via JavaScript and the HTML [canvas](https://developer.mozilla.org/it/docs/Web/API/HTMLCanvasElement) element. Among other things, it can be used for animation, game graphics, data visualization, photo manipulation, and real-time video processing. The Canvas API largely focuses on 2D graphics. The WebGL API, which also uses the `<canvas>` element, draws hardware-accelerated 2D and 3D graphics.

The [FileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader) object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read. File objects may be obtained from a FileList object returned as a result of a user selecting files using the [input](https://developer.mozilla.org/it/docs/Web/API/HTMLInputElement) element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.

The [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data. Blobs can represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.

## Image compression steps

1. Read the file using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element with type="file"

```javascript
   const input = document.getElementById(‘input’);
   input.onChange = function(ev) {
   const file = ev.target.files\[0\];
   // Use the file
   };
```

2. Create a Blob with the file data and get its URL with [createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

```javascript
const blobURL = window.URL.createObjectURL(file)
```

3. Create an helper image object and use the blob URL as source

```javascript
const img = new Image()
img.src = blobURL
```

4. Use the `onload` callback to process the image

```javascript
img.onload = function (ev) {
  window.URL.revokeObjectURL(blobURL) // release memory
  // Use the img
}
```

5. Create a canvas element setting the width and height to match the new dimensions of the image.

```javascript
const canvas = document.createElement(‘canvas’);
canvas.width = newWidth;
canvas.height = newHeight;
```

6. Create a 2D context object and draw the image on the canvas

```javascript
const ctx = canvas.getContext(‘2d’);
ctx.drawImage(img, 0, 0, newWidth, newHeight);
```

7. Export the image with the desired output quality

```javascript
canvas.toBlob(
  function (blob) {
    // Handle the compressed image
  },
  mimeType,
  quality
)
```

`mimeType` is the _mime type_ of the result image, like _image/jpeg_, _image/png_ . Value of `quality` ranges from 0 to 1 and represents the quality of the output image. If you don't specify the mime and quality in the `toBlob()` method then default quality will be set and the mime type will be _image/png_. HTMLCanvasElement.toBlob [is not fully supported](https://caniuse.com/#feat=mdn-api_htmlcanvaselement_toblob) by all browsers, see the polyfill section below.

8. (Optional) Show the compressed image in the document

```javascript
document.body.append(canvas)
```

### Polyfill canvas.toBlob

A low performance polyfill based on toDataURL.

```javascript
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function (callback, type, quality) {
        var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
          len = binStr.length,
          arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        callback(new Blob([arr], { type: type || "image/png" }));
      },
    });
  }
}
```

Source: [MDN](https://developer.mozilla.org/it/docs/Web/API/HTMLCanvasElement/toBlob)

## Final code

Try the JS image resizing tool on [Codepen](https://codepen.io/mirco-bellagamba/pen/vYGpBGO).

```html
<div id="root">
  <p>Upload an image and see the result</p>
  <input id="img-input" type="file" accept="image/*" style="display:block" />
</div>
```

```javascript
const MAX_WIDTH = 320
const MAX_HEIGHT = 180
const MIME_TYPE = "image/jpeg"
const QUALITY = 0.7

const input = document.getElementById("img-input")
input.onchange = function (ev) {
  const file = ev.target.files[0] // get the file
  const blobURL = URL.createObjectURL(file)
  const img = new Image()
  img.src = blobURL
  img.onerror = function () {
    URL.revokeObjectURL(this.src)
    // Handle the failure properly
    console.log("Cannot load image")
  }
  img.onload = function () {
    URL.revokeObjectURL(this.src)
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT)
    const canvas = document.createElement("canvas")
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext("2d")
    ctx.drawImage(img, 0, 0, newWidth, newHeight)
    canvas.toBlob(
      blob => {
        // Handle the compressed image. es. upload or save in local state
        displayInfo("Original file", file)
        displayInfo("Compressed file", blob)
      },
      MIME_TYPE,
      QUALITY
    )
    document.getElementById("root").append(canvas)
  }
}

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width
  let height = img.height

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width)
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height)
      height = maxHeight
    }
  }
  return [width, height]
}

// Utility functions for demo purpose

function displayInfo(label, file) {
  const p = document.createElement("p")
  p.innerText = `${label} - ${readableBytes(file.size)}`
  document.getElementById("root").append(p)
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i]
}
```
