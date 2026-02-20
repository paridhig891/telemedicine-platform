import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CloudSyncStatus = () => {
  const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, offline, error
  const [lastSyncTime, setLastSyncTime] = useState(new Date());
  const [pendingChanges, setPendingChanges] = useState(0);

  useEffect(() => {
    // Simulate sync status changes
    const interval = setInterval(() => {
      const statuses = ['synced', 'syncing', 'offline'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      
      if (randomStatus === 'syncing') {
        setSyncStatus('syncing');
        setTimeout(() => {
          setSyncStatus('synced');
          setLastSyncTime(new Date());
          setPendingChanges(0);
        }, 3000);
      } else if (randomStatus === 'offline') {
        setSyncStatus('offline');
        setPendingChanges(Math.floor(Math.random() * 5) + 1);
      } else {
        setSyncStatus('synced');
        setPendingChanges(0);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getSyncStatusConfig = () => {
    switch (syncStatus) {
      case 'synced':
        return {
          icon: 'CloudCheck',
          color: 'text-success',
          bgColor: 'bg-success/10',
          message: 'All data synced',
          description: `Last sync: ${lastSyncTime?.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}`
        };
      case 'syncing':
        return {
          icon: 'CloudUpload',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          message: 'Syncing data...',
          description: 'Please wait while we sync your records'
        };
      case 'offline':
        return {
          icon: 'CloudOff',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          message: 'Offline mode',
          description: `${pendingChanges} changes pending sync`
        };
      case 'error':
        return {
          icon: 'CloudAlert',
          color: 'text-error',
          bgColor: 'bg-error/10',
          message: 'Sync failed',
          description: 'Unable to sync data. Check connection.'
        };
      default:
        return {
          icon: 'Cloud',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          message: 'Unknown status',
          description: ''
        };
    }
  };

  const handleManualSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSyncTime(new Date());
      setPendingChanges(0);
    }, 2000);
  };

  const config = getSyncStatusConfig();

  return (
    <div className={`glass-card border border-white/20 rounded-lg p-3 ${config?.bgColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon 
            name={config?.icon} 
            size={16} 
            className={`${config?.color} ${syncStatus === 'syncing' ? 'animate-pulse' : ''}`} 
          />
          <div>
            <p className="text-sm font-caption font-medium text-foreground">
              {config?.message}
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              {config?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Offline indicator */}
          {syncStatus === 'offline' && pendingChanges > 0 && (
            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
          )}
          
          {/* Manual sync button */}
          {(syncStatus === 'offline' || syncStatus === 'error') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualSync}
              disabled={syncStatus === 'syncing'}
              iconName="RefreshCw"
              iconSize={14}
              className={`w-8 h-8 p-0 ${config?.color} hover:bg-white/10`}
            />
          )}
        </div>
      </div>
      {/* Detailed sync info */}
      {syncStatus === 'offline' && pendingChanges > 0 && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-caption">
              Changes will sync when online
            </span>
            <span className="text-warning font-caption font-medium">
              {pendingChanges} pending
            </span>
          </div>
        </div>
      )}
      {/* Auto-sync indicator */}
      {syncStatus === 'synced' && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Zap" size={10} />
            <span className="font-caption">Auto-sync enabled</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudSyncStatus;