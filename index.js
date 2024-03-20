const resizableComponents = document.querySelectorAll('.resizable');

const baseWidth = 449.33;
const baseHeight = 129;
const baseFontSizeH4 = 16;
const baseLineHeightH4 = 24;
const baseFontSizeParagraph = 12;
const baseLineHeightParagrpah = 20;
const technicalDebtParagraph = document.querySelector('.technical-debt-content');

// When page realoads update the dimension based on {height, width} value in localStorage
const updateComponentDimensions = (component, width, height) => {
  component.style.width = `${width}px`;
  component.style.height = `${height}px`;
};

resizableComponents.forEach((component, index) => {
  const localStorageKey = `resizable-${index + 1}`;

  // Check if dimensions are stored in local storage
  const storedDimensions = localStorage.getItem(localStorageKey);
  if (storedDimensions) {
    const { width, height } = JSON.parse(storedDimensions);
    updateComponentDimensions(component, width, height);
  }

  component.addEventListener('mouseup', () => {
    const { offsetWidth, offsetHeight } = component;
    localStorage.setItem(localStorageKey, JSON.stringify({ width: offsetWidth, height: offsetHeight }));
  });

  let prevWidth = component.offsetWidth;
  let prevHeight = component.offsetHeight;
  component.addEventListener('mousemove', () => {
    const width = component.offsetWidth;
    const height = component.offsetHeight;

    if (width !== prevWidth && height !== prevHeight) {
      const widthRatio = width / baseWidth;
      const heightRatio = height / baseHeight;

      const ratio = Math.max(widthRatio, heightRatio);

      const newFontSizeH4 = baseFontSizeH4 * ratio;
      const newLineHeightH4 = baseLineHeightH4 * ratio;
      // const newFontSizeParagraph = baseFontSizeParagraph * ratio;
      // const newLineHeightParagraph = baseLineHeightParagrpah * ratio;
      // Check if the current component being resized is the technical debt component
      const isTechnicalDebtComponent = component.classList.contains('technical-debt');
      if (technicalDebtParagraph && isTechnicalDebtComponent && ratio > 1.3) {
        console.log("para sizing")
        const newFontSizeParagraph = baseFontSizeParagraph * (ratio - 0.3);
        const newLineHeightParagraph = baseLineHeightParagrpah * (ratio - 0.3);
        technicalDebtParagraph.style.fontSize = `${newFontSizeParagraph}px`;
        technicalDebtParagraph.style.lineHeight = `${newLineHeightParagraph}px`;
      }

      component.style.setProperty('--base-font-size-h4', `${newFontSizeH4}px`);
      component.style.setProperty('--base-line-height-h4', `${newLineHeightH4}px`);
      // component.style.setProperty('--base-font-size-paragraph', `${newFontSizeParagraph}px`);
      // component.style.setProperty('--base-line-height-paragraph', `${newLineHeightParagraph}px`);

      prevWidth = width;
      prevHeight = height;
    }
  });
  component.addEventListener('dblclick', () => {
    // Remove stored dimensions from local storage
    localStorage.removeItem(localStorageKey);
    component.style.width = `${baseWidth}px`;
    component.style.height = `${baseHeight}px`;
    component.style.removeProperty('--base-font-size-h4');
    component.style.removeProperty('--base-line-height-h4');
    technicalDebtParagraph.style.fontSize = `${baseFontSizeParagraph}px`;
    technicalDebtParagraph.style.lineHeight = `${baseLineHeightParagrpah}px`;
    // component.style.removeProperty('--base-font-size-paragraph');
    // component.style.removeProperty('--base-line-height-paragraph');
  });
});


