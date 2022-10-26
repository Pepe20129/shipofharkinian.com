import React, { useEffect, useState } from 'react';

export function ElementOnScroll(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
  }
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
      
        // Not possible to set it back to false like this:
        setVisible(true);
        
        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    }, options);
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`elementOnScroll ${isVisible ? 'isVisible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
