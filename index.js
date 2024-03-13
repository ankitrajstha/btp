import * as drag_n_drop from './drag_n_drop/script.js';
const resizableComponents = document.querySelectorAll('.resizable');
console.log("Hello")
resizableComponents.forEach(component => {
  let prevWidth = component.offsetWidth;
  let prevHeight = component.offsetHeight;
  component.addEventListener('mousemove', () => {
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
      // const newFontSizeParagraph = baseFontSizeParagraph * ratio;
      // const newLineHeightParagraph = baseLineHeightParagrpah * ratio;
      let newFontSizeParagraph, newLineHeightParagraph;
      if (ratio > 1.3) {
        newFontSizeParagraph = 12 * (ratio - 0.3);
        newLineHeightParagraph = 20 * (ratio - 0.3);
      }
      if (newFontSizeParagraph && newLineHeightParagraph) {
        // Target the paragraph with class technical-debt-content
        const technicalDebtParagraph = component.querySelector('.technical-debt-content');
        if (technicalDebtParagraph) {
          const newFontSizeParagraph = baseFontSizeParagraph * ratio;
          technicalDebtParagraph.style.fontSize = `${newFontSizeParagraph}px`;
          technicalDebtParagraph.style.lineHeight = `${newLineHeightParagraph}px`;
        }
      } else {
        component.style.removeProperty('--base-font-size-paragraph');
        component.style.removeProperty('--base-line-height-paragraph');
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
    component.style.width = '449.33px';
    component.style.height = '129px';
    component.style.removeProperty('--base-font-size-h4');
    component.style.removeProperty('--base-line-height-h4');
    component.style.removeProperty('--base-font-size-paragraph');
    component.style.removeProperty('--base-line-height-paragraph');
  });
});
