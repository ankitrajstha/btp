/**
 * Import sortablejs library
 * GitHub: https://github.com/SortableJS/Sortable
 */
import Sortable from '../node_modules/sortablejs/modular/sortable.complete.esm.js';

/**
 * Parent elements whose children are made draggable
 */
const highlightsContainer = document.querySelector('.highlights-container');
const upperChartsContainer = document.querySelector('.upper-charts-container');
const lowerChartsContainer = document.querySelector('.lower-charts-container');

/**
 * Common re-usable options for sortablejs
 */
const commonOptions = {
  fallbackTolerance: 3, // So that we can select items on mobile
  animation: 150,
  ghostClass: 'sortable-ghost', // Class name for the drop placeholder
  group: 'highlights-charts-container',
  //store the current sorting order
  store: {
    get: (sortable) => {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split("|") : [];
    },
    set: (sortable) => {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join("|"));
    },
  },
};

const sortableHighlights = Sortable.create(highlightsContainer, commonOptions);
const sortableUpperCharts = Sortable.create(upperChartsContainer, commonOptions);
const sortableLowerCharts = Sortable.create(lowerChartsContainer, commonOptions);
