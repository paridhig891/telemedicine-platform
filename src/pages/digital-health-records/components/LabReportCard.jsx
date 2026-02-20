import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LabReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return { name: 'TrendingUp', color: 'text-error' };
      case 'down':
        return { name: 'TrendingDown', color: 'text-success' };
      case 'stable':
        return { name: 'Minus', color: 'text-muted-foreground' };
      default:
        return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const getResultStatus = (value, range) => {
    const numValue = parseFloat(value);
    const [min, max] = range?.split('-')?.map(v => parseFloat(v?.trim()));
    
    if (numValue < min) return { status: 'low', color: 'text-warning' };
    if (numValue > max) return { status: 'high', color: 'text-error' };
    return { status: 'normal', color: 'text-success' };
  };

  return (
    <div className="glass-card border border-white/20 rounded-lg p-4 hover:shadow-medical-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground">
              {report?.testName}
            </h3>
            <span className="px-2 py-1 rounded-full text-xs font-caption bg-muted text-muted-foreground">
              {report?.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-caption mb-1">
            {report?.labName}
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            {new Date(report.testDate)?.toLocaleDateString('en-IN')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconSize={14}
            className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-white/10 pt-3 space-y-3">
          {report?.results?.map((result, index) => {
            const trendIcon = getTrendIcon(result?.trend);
            const resultStatus = getResultStatus(result?.value, result?.referenceRange);
            
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <p className="font-caption font-medium text-foreground text-sm">
                    {result?.parameter}
                  </p>
                  <p className="text-xs text-muted-foreground font-caption">
                    Reference: {result?.referenceRange} {result?.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`font-mono font-semibold ${resultStatus?.color}`}>
                      {result?.value} {result?.unit}
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {resultStatus?.status?.toUpperCase()}
                    </p>
                  </div>
                  <Icon 
                    name={trendIcon?.name} 
                    size={16} 
                    className={trendIcon?.color} 
                  />
                </div>
              </div>
            );
          })}
          
          {report?.doctorNotes && (
            <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-start space-x-2">
                <Icon name="MessageSquare" size={14} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs font-caption font-medium text-primary mb-1">
                    Doctor's Notes
                  </p>
                  <p className="text-sm text-foreground font-caption">
                    {report?.doctorNotes}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LabReportCard;