'use client';

import React from 'react';
import JsonContentRenderer from './JsonContentRenderer';
import ContentRenderer from './ContentRenderer';

interface SmartContentRendererProps {
  content: string | any;
  className?: string;
}

const SmartContentRenderer: React.FC<SmartContentRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  // Check if content is JSON (starts with [ or { and contains specific structure)
  const isJsonContent = (content: any): boolean => {
    if (typeof content === 'object' && Array.isArray(content)) {
      return true;
    }
    
    if (typeof content === 'string') {
      const trimmed = content.trim();
      return (trimmed.startsWith('[') || trimmed.startsWith('{')) && 
             trimmed.includes('"type"');
    }
    
    return false;
  };

  // Parse JSON string if needed
  const parseContent = (content: any) => {
    if (typeof content === 'string' && isJsonContent(content)) {
      try {
        return JSON.parse(content);
      } catch (e) {
        return content;
      }
    }
    return content;
  };

  const parsedContent = parseContent(content);

  if (isJsonContent(parsedContent)) {
    return <JsonContentRenderer content={parsedContent} className={className} />;
  }

  return <ContentRenderer content={content} className={className} />;
};

export default SmartContentRenderer;
