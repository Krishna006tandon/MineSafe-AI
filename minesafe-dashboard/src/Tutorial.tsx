
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './Tutorial.css';

interface TutorialStep {
  target: string;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface TutorialProps {
  onComplete: () => void;
  stepsUrl?: string;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete, stepsUrl = '/tutorial-steps.json' }) => {
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [highlightBox, setHighlightBox] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch(stepsUrl);
        const data = await response.json();
        setSteps(data);
      } catch (error) {
        console.error("Failed to fetch tutorial steps:", error);
        // Fallback to default steps if fetch fails
        setSteps([
          { target: '#root', text: 'Welcome to the tutorial!', position: 'center' },
          { target: '.dashboard-header', text: 'This is the main header.', position: 'bottom' },
          { target: '#camera-feed', text: 'Here you can see the camera feed.', position: 'right' },
          { target: '#report-table', text: 'And this is the report table.', position: 'top' },
        ]);
      }
    };
    fetchSteps();
  }, [stepsUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handleBack();
      if (e.key === 'Escape') handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, steps.length]);

  useLayoutEffect(() => {
    if (!isActive || steps.length === 0) return;

    const step = steps[currentStep];
    const targetElement = document.querySelector<HTMLElement>(step.target);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const targetRect = targetElement.getBoundingClientRect();
      targetElement.classList.add('tutorial-highlight');
      setHighlightBox({ top: targetRect.top, left: targetRect.left, width: targetRect.width, height: targetRect.height });

      const tooltipElement = tooltipRef.current;
      if (tooltipElement) {
        const tooltipRect = tooltipElement.getBoundingClientRect();
        let pos = { top: 0, left: 0 };
        const position = step.position || 'bottom';
        const margin = 15;

        switch (position) {
          case 'top':
            pos.top = targetRect.top - tooltipRect.height - margin;
            pos.left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'bottom':
            pos.top = targetRect.bottom + margin;
            pos.left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'left':
            pos.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
            pos.left = targetRect.left - tooltipRect.width - margin;
            break;
          case 'right':
            pos.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
            pos.left = targetRect.right + margin;
            break;
          case 'center':
            pos.top = window.innerHeight / 2 - tooltipRect.height / 2;
            pos.left = window.innerWidth / 2 - tooltipRect.width / 2;
            break;
        }
        
        // Prevent overflow
        if (pos.left < 0) pos.left = margin;
        if (pos.left + tooltipRect.width > window.innerWidth) pos.left = window.innerWidth - tooltipRect.width - margin;
        if (pos.top < 0) pos.top = margin;
        if (pos.top + tooltipRect.height > window.innerHeight) pos.top = window.innerHeight - tooltipRect.height - margin;


        setTooltipPos(pos);
      }
    }
    
    return () => {
      if (targetElement) {
        targetElement.classList.remove('tutorial-highlight');
      }
    };
  }, [currentStep, isActive, steps, theme]);
  
  useEffect(() => {
    // Toggle theme based on system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('tutorialDone', 'true');
    setIsActive(false);
    onComplete();
  };
  
  const handleSkip = () => {
    handleFinish();
  };

  if (!isActive || steps.length === 0) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];

  return (
    <div>
      <div className="tutorial-overlay-box" style={{ top: 0, left: 0, width: '100%', height: highlightBox.top }}></div>
      <div className="tutorial-overlay-box" style={{ top: highlightBox.top, left: 0, width: highlightBox.left, height: highlightBox.height }}></div>
      <div className="tutorial-overlay-box" style={{ top: highlightBox.top, left: highlightBox.left + highlightBox.width, right: 0, height: highlightBox.height }}></div>
      <div className="tutorial-overlay-box" style={{ top: highlightBox.top + highlightBox.height, left: 0, width: '100%', bottom: 0 }}></div>
      <div
        ref={tooltipRef}
        className={`tutorial-tooltip ${theme} ${step.position || 'bottom'}`}
        style={{ top: `${tooltipPos.top}px`, left: `${tooltipPos.left}px` }}
      >
        <div className="tutorial-progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="tutorial-content">
          <p>{step.text}</p>
          <div className="tutorial-footer">
            <span className="tutorial-step-counter">{currentStep + 1} / {steps.length}</span>
            <div className="tutorial-buttons">
              {currentStep > 0 && <button onClick={handleBack}>Back</button>}
              <button onClick={handleNext}>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</button>
              <button onClick={handleSkip} className="skip-button">Skip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
