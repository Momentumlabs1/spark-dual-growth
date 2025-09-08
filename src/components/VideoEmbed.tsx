import { useState } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface VideoEmbedProps {
  src?: string;
  poster?: string;
  ctaLabel?: string;
  className?: string;
}

const VideoEmbed = ({ 
  src = "", 
  poster = "/placeholder.svg", 
  ctaLabel = "Jetzt starten - Prüfe, wie wir dir helfen können",
  className = ""
}: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`relative max-w-[420px] w-full mx-auto ${className}`}>
      <AspectRatio ratio={9 / 16} className="bg-nf-black rounded-lg overflow-hidden shadow-elegant">
        {!isPlaying ? (
          // Poster/Overlay State
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full bg-gradient-to-b from-nf-black/20 via-nf-black/40 to-nf-black/80 flex flex-col items-center justify-center cursor-pointer group"
            onClick={handlePlay}
          >
            {/* Background Poster */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${poster})` }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nf-black/20 to-nf-black/60" />
            
            {/* Content */}
            <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full">
              {/* Play Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-nf-red/90 rounded-full flex items-center justify-center group-hover:bg-nf-red transition-all duration-300 shadow-red-glow">
                  <Play className="h-8 w-8 text-nf-white ml-1" fill="currentColor" />
                </div>
              </motion.div>
              
              {/* CTA Text */}
              <Button
                variant="outline"
                className="border-nf-white text-nf-white hover:bg-nf-white hover:text-nf-black px-6 py-3 text-sm font-semibold transition-smooth backdrop-blur-sm bg-nf-white/10"
              >
                {ctaLabel}
              </Button>
            </div>
          </motion.div>
        ) : (
          // Video Playing State
          <div className="w-full h-full">
            {src ? (
              src.includes('youtube.com') || src.includes('youtu.be') ? (
                <iframe
                  src={src.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : src.includes('vimeo.com') ? (
                <iframe
                  src={src.replace('vimeo.com/', 'player.vimeo.com/video/')}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={src} type="video/mp4" />
                  Dein Browser unterstützt dieses Video nicht.
                </video>
              )
            ) : (
              <div className="w-full h-full bg-nf-black/80 flex items-center justify-center text-nf-white/60">
                <p>Video wird geladen...</p>
              </div>
            )}
          </div>
        )}
      </AspectRatio>
    </div>
  );
};

export default VideoEmbed;