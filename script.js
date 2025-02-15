// Toggle Encode/Decode Sections
document.getElementById('encodeBtn').addEventListener('click', () => {
  document.getElementById('encodeSection').style.display = 'block';
  document.getElementById('decodeSection').style.display = 'none';
});

document.getElementById('decodeBtn').addEventListener('click', () => {
  document.getElementById('decodeSection').style.display = 'block';
  document.getElementById('encodeSection').style.display = 'none';
});

// Encode Message
document.getElementById('encodeMessageBtn').addEventListener('click', async () => {
  const imageFile = document.getElementById('imageInput').files[0];
  const message = document.getElementById('messageInput').value;

  if (!imageFile || !message) {
    alert('Please upload an image and enter a message.');
    return;
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('message', message);

  const response = await fetch('https://backend-f1hw.onrender.com', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    document.getElementById('downloadLink').href = url;
    document.getElementById('downloadLink').style.display = 'block';
  } else {
    alert('Error encoding message.');
  }
});

// Decode Message
document.getElementById('decodeMessageBtn').addEventListener('click', async () => {
  const imageFile = document.getElementById('encodedImageInput').files[0];

  if (!imageFile) {
    alert('Please upload an encoded image.');
    return;
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('https://backend-f1hw.onrender.com', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    document.getElementById('decodedMessage').innerText = data.message;
  } else {
    alert('Error decoding message.');
  }
});
