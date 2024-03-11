const resizableComponents = document.querySelectorAll('.resizable');

resizableComponents.forEach(component => {
  let prevWidth = component.offsetWidth;
  let prevHeight = component.offsetHeight;
  component.addEventListener('mouseup', () => {
    const width = component.offsetWidth;
    const height = component.offsetHeight;

    const baseWidth = 449.33;
    const baseHeight = 129;
    const baseFontSizeH4 = 16;
    const baseLineHeightH4 = 24;
    const baseFontSizeParagraph = 12;
    const baseLineHeightParagrpah = 20;
    if (width !== prevWidth || height !== prevHeight) {
      const widthRatio = width / baseWidth;
      const heightRatio = height / baseHeight;

      const ratio = Math.max(widthRatio, heightRatio);

      const newFontSizeH4 = baseFontSizeH4 * ratio;
      const newLineHeightH4 = baseLineHeightH4 * ratio;
      const newFontSizeParagraph = baseFontSizeParagraph * ratio;
      const newLineHeightParagraph = baseLineHeightParagrpah * ratio;

      component.style.setProperty('--base-font-size-h4', `${newFontSizeH4}px`);
      component.style.setProperty('--base-line-height-h4', `${newLineHeightH4}px`);
      component.style.setProperty('--base-font-size-paragraph', `${newFontSizeParagraph}px`);
      component.style.setProperty('--base-line-height-paragraph', `${newLineHeightParagraph}px`);

      prevWidth = width;
      prevHeight = height;
    }


  });
});
