/**
 * Converts the grid to a 2D arrays of size (numberOfRows x numberOfColumns) with: 
 *  - true on each cell that has content
 *  - false on each cell that is empty
 * 
 * Example: For a grid of size 3x2 with these items: [{i: 1, x: 0, y: 0, w: 1, h: 1}, {i: 2, x: 1, y: 0, w: 2, h: 1}] 
 * that will look like: 
 *  [1, *, *]
 *  [*, 2, 2]
 * 
 * The output 2D array would be: 
 *  [true, false, false]
 *  [false, true, true]
 * @param {Layout} layout - current layout
 * @param {Number} numberOfColumns - the maximum number of columns that can be displayed in the current breakpoint
 * 
 * @return {Boolean[][]} - a 2D array of the flagged grid
 */
const convertToFlaggedGrid = (layout, numberOfColumns) => {
   // A 2D array of size (numberOfRows x numberOfColumns) to catch the cells that have content
   const flaggedGrid: Boolean[][] = [];

   const numberOfRows = getNumberOfRows(layout);

   // Intitialize all cells of the array to false 
   for (let i = 0; i < numberOfRows; i++) {
     flaggedGrid.push([]);
     for (let j = 0; j < numberOfColumns; j++) {
       flaggedGrid[i].push(false);
     }
   }
 
   // For all the items of the layout, set the corresponding cells to false 
   layout.forEach(({ x, y, w, h, placeholder }) => {
     if(!placeholder) {
       for (let i = y; i < y + h; i++) {
         for (let j = x; j < x + w; j++) {
           flaggedGrid[i][j] = true; 
         }
       }
     }
   });
 
   return flaggedGrid;
 };
 
 /**
  * Calculates the number of rows in the grid
  * @param {Layout} layout - current layout
  * 
  * @return {Number} - the number of rows in the grid
  */
const getNumberOfRows = (layout) => {
   const lastRowIndex = Math.max(...layout.map(({ y }) => y), 0);
   const maxHeightInLastRow = Math.max(
     ...layout.filter(({ y }) => y === lastRowIndex).map(({ h }) => h),
     0,
     );
   return lastRowIndex + maxHeightInLastRow;
 };
 
 
 /**
  * Generates a Layout of all the empty placeholders of the layout, according to the current breakpoint
  * @param {Layout} layout - current layout
  * @param {Number} numberOfColumns - the maximum number of columns that can be displayed in the current breakpoint
  * 
  * @return {Layout} - a layout containing all the empty placeholders
  */
 export function getEmptyPlaceholders(layout, numberOfColumns): Layout {
   const res = []; 
   const flaggedGrid = convertToFlaggedGrid(layout, numberOfColumns); 
   const numberOfRows = getNumberOfRows(layout);
 
   for (let i = 0; i < numberOfRows; i++) {
     for (let j = 0; j < numberOfColumns; j++) {
       if (!flaggedGrid[i][j]) {
         res.push({ x: j, y: i, w: 1, h: 1, i: `placeholder-${i}-${j}`, placeholder: true });
       }
     }
   }
   return res; 
 }