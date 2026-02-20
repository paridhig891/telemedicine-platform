import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Webcam from 'react-webcam'

const VideoPlayer = ({ 
  isFullscreen, 
  onToggleFullscreen, 
  isMuted, 
  onToggleMute, 
  isVideoEnabled, 
  onToggleVideo,
  onEndCall,
  connectionQuality = 'excellent'
}) => {
  const videoRef = useRef(null);
  const doctorVideoRef = useRef(null);
  const [isDoctorVideoMinimized, setIsDoctorVideoMinimized] = useState(false);
  const [doctorVideoPosition, setDoctorVideoPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mock video stream initialization
    if (videoRef?.current) {
      videoRef.current.srcObject = null; // Would be actual stream in production
    }
  }, []);

  const handleDoctorVideoMouseDown = (e) => {
    if (isFullscreen) {
      setIsDragging(true);
      const rect = doctorVideoRef?.current?.getBoundingClientRect();
      setDragOffset({
        x: e?.clientX - rect?.left,
        y: e?.clientY - rect?.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isFullscreen) {
      const newX = e?.clientX - dragOffset?.x;
      const newY = e?.clientY - dragOffset?.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 150;
      
      setDoctorVideoPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const getConnectionQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionQualityIcon = () => {
    switch (connectionQuality) {
      case 'excellent': return 'Wifi';
      case 'good': return 'Wifi';
      case 'poor': return 'WifiOff';
      default: return 'Wifi';
    }
  };

  return (
    <div className={`relative bg-slate-900 rounded-xl overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-500 rounded-none' : 'h-96 lg:h-[500px]'
    }`}>
      {/* Main Patient Video */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
         // poster="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop"
         poster="turn on the video"
        /> 
        
        {/* Video Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30">{isVideoEnabled?(<Webcam className='w-full h-full' />):(<div className='text-white ml-96 mt-56'>turn on the video</div>)}
       
          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between ">
            <div className="flex items-center space-x-3">
              <div className="glass-card px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse-medical" />
                  <span className="text-white text-sm font-caption">Live</span>
                </div>
              </div>
              
              <div className="glass-card px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getConnectionQualityIcon()} 
                    size={14} 
                    className={`${getConnectionQualityColor()}`} 
                  />
                  <span className="text-white text-sm font-caption capitalize">
                    {connectionQuality}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFullscreen}
                iconName={isFullscreen ? "Minimize2" : "Maximize2"}
                iconSize={16}
                className="glass-card text-white hover:bg-white/20"
              />
              
              <Button
                variant="destructive"
                size="sm"
                onClick={onEndCall}
                iconName="PhoneOff"
                iconSize={16}
                className="bg-error hover:bg-error/80"
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="glass-card rounded-full p-2">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMute}
                  iconName={isMuted ? "MicOff" : "Mic"}
                  iconSize={18}
                  className={`w-10 h-10 rounded-full ${
                    isMuted 
                      ? 'bg-error text-white hover:bg-error/80' :'text-white hover:bg-white/20'
                  }`}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleVideo}
                  iconName={isVideoEnabled ? "Video" : "VideoOff"}
                  iconSize={18}
                  className={`w-10 h-10 rounded-full ${
                    !isVideoEnabled 
                      ? 'bg-error text-white hover:bg-error/80' :'text-white hover:bg-white/20'
                  }`}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Monitor"
                  iconSize={18}
                  className="w-10 h-10 rounded-full text-white hover:bg-white/20"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconSize={18}
                  className="w-10 h-10 rounded-full text-white hover:bg-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Doctor Video Overlay */}
      <div
        ref={doctorVideoRef}
        className={`absolute bg-slate-800 rounded-lg overflow-hidden border-2 border-white/20 cursor-move ${
          isFullscreen 
            ? 'w-48 h-36' :'w-32 h-24 bottom-4 right-4'
        } ${isDoctorVideoMinimized ? 'w-12 h-12' : ''}`}
        style={isFullscreen ? {
          left: `${doctorVideoPosition?.x}px`,
          top: `${doctorVideoPosition?.y}px`
        } : {}}
        onMouseDown={handleDoctorVideoMouseDown}
      >
        {!isDoctorVideoMinimized ? (
          <> <Webcam />
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
               poster="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop"
            />
            <div className="absolute top-1 right-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDoctorVideoMinimized(true)}
                iconName="Minimize2"
                iconSize={12}
                className="w-6 h-6 p-0 text-white hover:bg-white/20"
              />
            </div>
            <div className="absolute bottom-1 left-1">
              <span className="text-xs text-white font-caption bg-black/50 px-1 rounded">
                Dr. Sarah Wilson
              </span>
            </div>
          </>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-primary cursor-pointer"
            onClick={() => setIsDoctorVideoMinimized(false)}
          >
            <Icon name="User" size={16} color="white" />
          </div>
        )}
      </div>
      {/* Patient Info Overlay */}
      <div className="absolute top-4 left-4">
        <div className="glass-card px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-therapeutic flex items-center justify-center">
              <Icon name="User" size={14} color="white" />
            </div>
            <div>
              <p className="text-white text-sm font-caption font-medium">
                Rajesh Kumar
              </p>
              <p className="text-white/70 text-xs font-caption">
                Patient ID: #P2024-0892
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;