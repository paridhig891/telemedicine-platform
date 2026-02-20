import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUpload = ({ onUpload, acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png'] }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      return acceptedTypes?.includes(fileExtension) && file?.size <= 10 * 1024 * 1024; // 10MB limit
    });

    if (validFiles?.length > 0) {
      simulateUpload(validFiles);
    }
  };

  const simulateUpload = (files) => {
    files?.forEach((file, index) => {
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadProgress(null);
            
            // Add to uploaded files
            const newFile = {
              id: Date.now() + index,
              name: file?.name,
              size: file?.size,
              type: file?.type,
              uploadDate: new Date()?.toISOString()
            };
            
            setUploadedFiles(prev => [...prev, newFile]);
            onUpload && onUpload(newFile);
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-muted hover:border-primary/50 hover:bg-muted/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef?.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes?.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-primary" />
          </div>
          
          <div>
            <p className="font-heading font-medium text-foreground mb-1">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground font-caption">
              Supports {acceptedTypes?.join(', ')} up to 10MB each
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="FolderOpen"
            iconPosition="left"
            iconSize={16}
          >
            Browse Files
          </Button>
        </div>
      </div>
      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div className="glass-card border border-white/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Upload" size={16} className="text-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption text-foreground">Uploading...</span>
                <span className="text-sm font-caption text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Uploaded Files */}
      {uploadedFiles?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-heading font-medium text-foreground">
            Recently Uploaded ({uploadedFiles?.length})
          </h4>
          {uploadedFiles?.map((file) => (
            <div key={file?.id} className="glass-card border border-white/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Icon 
                      name={file?.type?.includes('pdf') ? 'FileText' : 'Image'} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-caption font-medium text-foreground">
                      {file?.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {formatFileSize(file?.size)} • {new Date(file.uploadDate)?.toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconSize={14}
                    className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconSize={14}
                    onClick={() => removeFile(file?.id)}
                    className="w-8 h-8 p-0 text-muted-foreground hover:text-error"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;