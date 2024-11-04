import React from 'react';
import ReactPlayer from 'react-player';

const YouTubeEmbed = ({ url, width = '100%', height = '360px' }) => {
  return (
    <div className='rounded-tr-lg overflow-hidden'> {/* Tailwind classes for rounded corners */}
      <ReactPlayer 
        url={'https://youtu.be/Wh73ZR42XKc'} 
        width={width} 
        height={height} 
        playing={true}  // autoplay enabled
        controls={false} // hides controls
        modestbranding={1} // minimizes YouTube branding
        config={{
          youtube: {
            playerVars: { 
              autoplay: 1, 
              modestbranding: 1, 
              rel: 0, // disables related videos
              controls: 1 
            }
          }
        }}
      />
    </div>
  );
};

export default YouTubeEmbed;