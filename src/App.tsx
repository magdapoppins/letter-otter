import React from "react";

function App() {
  const every_n_chars = 10
  const [imageUrl, setImageUrl] = React.useState<string | undefined>();
  const [text, setText] = React.useState('');
  const previousTextRef = React.useRef('');

  React.useEffect(() => {
    const textHasGrown = previousTextRef.current.length < text.length;
    previousTextRef.current = text

    if (text.length % every_n_chars || !textHasGrown) {
      return;
    }

    fetch("https://api.unsplash.com/photos/random?query=otter",
      {
        headers: {
          authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
        }
      })
      .then(r => r.json())
      .then(d => setImageUrl(d.urls.small))
  }, [text])

  return <div className="App">
    <h1>Letter? Otter!</h1>
    <textarea value={text} onChange={e => setText(e.target.value)}></textarea>
    <img src={imageUrl} />
  </div>;
}

export default App;
