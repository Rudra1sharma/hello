import React from 'react';
import domtoimage from 'dom-to-image';


export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" ,
        image:null
    })
    const [allMeme, setAllMeme] = React.useState([]);
    const [memes, setMemes] = React.useState([]);
    
    React.useEffect(()=>{
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes)
        }
       getMemes()
    },[])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    function HandleChange(event){
        const{name,value}=event.target
        setMeme(prev=>({
            ...prev,
            [name]:value
        }))
    }
    
    function handleDownload() {
        const memeElement = document.getElementById('meme-container');
      
        domtoimage.toBlob(memeElement).then(function (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'meme.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
      }

      function handleImageChange(event) {
        console.log("handleImageChange called");
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        console.log("imageUrl:", imageUrl);
        setMeme((prevMeme) => ({
          ...prevMeme,
          image: imageUrl,
        }));
      }
    
    return (
        <main>
            <div className="form">
                 <div>
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        value={meme.topText}
                        onChange={HandleChange}
                        name="topText"
                    />
                <div className="color-picker">
                <h3 className='top-label'>Top Text Color:</h3>
                    <input 
                         type="color" 
                         className='top-color'
                         value={meme.topTextColor}
                         onChange={HandleChange}
                         name="topTextColor"
                    />
                </div>
                </div>
                 <div>
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        value={meme.bottomText}
                        onChange={HandleChange}
                        name="bottomText"
                    />
                <div className="color-picker">
                <h3 className='top-label'>Bottom Text Color:</h3>
                    <input 
                        type="color" 
                        className='top-color'
                        value={meme.bottomTextColor}
                        onChange={HandleChange}
                        name="bottomTextColor"
                    />
                </div>
                <div>
                <label htmlFor="image">Choose an image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
                </div>

<div className="meme--buttons">
  <a
  className='facebook'
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&picture=${encodeURIComponent(meme.image)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Facebook
  </a>
  <a
  className='twitter'
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&hashtags=meme`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Twitter
  </a>
  <a
  className='insta'
    href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(meme.image)}&caption=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&utm_source=ig_web_copy_share_sheet`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Instagram
  </a>
</div>

                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
                <button className="form--butto" onClick={handleDownload}>
          Download Meme
        </button>
            </div>
            <div id="meme-container" className="meme">
                <img src={meme.image ? meme.image : meme.randomImage} className="meme--image" />
                <h2 id ="top-text" className="meme--text top" style={{color:meme.topTextColor}}>{meme.topText}</h2>
                <h2 id="bottom-text" className="meme--text bottom" style={{color:meme.bottomTextColor}}>{meme.bottomText}</h2>
            </div>
        </main>
    )
}
