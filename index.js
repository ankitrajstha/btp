const resizableComponents = document.querySelectorAll('.resizable');

resizableComponents.forEach(component => {
  let fontSizeMultiplier = 1;
  component.addEventListener('mouseup', () => {
    const width = component.offsetWidth;
    const height = component.offsetHeight;
    // console.log(height, width)

    const baseWidth = 449.33;
    const baseHeight = 129;
    const baseFontSizeH4 = 16;
    const baseFontSizeParagraph = 12;

    const widthRatio = width / baseWidth;
    const heightRatio = height / baseHeight;

    const newFontSizeH4 = baseFontSizeH4 * widthRatio;
    const newFontSizeParagraph = baseFontSizeParagraph * widthRatio;

    component.style.setProperty('--base-font-size-h4', `${newFontSizeH4}px`);
    component.style.setProperty('--base-font-size-paragraph', `${newFontSizeParagraph}px`);
  });
});
