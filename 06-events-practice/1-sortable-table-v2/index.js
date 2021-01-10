export default class SortableTable {
    subElements = {};
    element;
    
    constructor ( header = [], 
                    { data = [],
                      sorted = {
                        id: header.find(item => item.sortable).id,
                        order: 'asc'
                      }
                    } = {} ) {                   
      this.header = header;
      this.data = data;
      this.sorted = sorted;
      this.render();
    }
  
    getTable(data) {
      return `
       <div class="sortable-table">
         ${this.getTableHeader()}
         ${this.getTableBody(data)}
       </div>
      `; 
    }  
  
    getTableHeader() {
      return `
       <div data-element="header" class="sortable-table__header sortable-table__row">
         ${this.header.map(item => this.getHeaderRow(item)).join('')}
       </div>
      `;
    }
  
    getHeaderRow({id, title, sortable}) {
     const order = this.sorted.id === id ? this.sorted.order : 'asc';
     return `
       <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
         <span>${title}</span>
         ${this.getHeaderSortingArrow(id)}
       </div>
     `;
    } 
  
    getHeaderSortingArrow(id) {
     const isOrderExist = this.sorted.id === id ? this.sorted.order : '';
     return isOrderExist ?
        `
         <span data-element="arrow" class="sortable-table__sort-arrow">
           <span class="sort-arrow"></span>
         </span>
      `
                         : '';
    }
  
    getTableBody(data) {
     return `
       <div data-element="body" class="sortable-table__body">
         ${this.getTableRows(this.data)}
       </div>
     `;
   }
  
    getTableRows(data) {
     return data.map(item => 
       `
       <div class="sortable-table__row">
         ${this.getTableRow(item, data)}
       </div>
       `
      ).join('');
    }
  
    getTableRow(item) {
     const cells = this.header.map(({id, template}) => {
     return {
        id,
        template
        };
      });
  
     return cells.map(({id, template}) => {
        return template
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`;
      }).join('');
    }
  
    getSubElements(element) {
     const elements = element.querySelectorAll('[data-element]');
     return [...elements].reduce((accum, subElement) => {
        accum[subElement.dataset.element] = subElement;
  
        return accum;
      }, {});
    }
  
    render() {
      const {id, order} = this.sorted;
      const sortedData = this.sortData(id, order);
  
      const element = document.createElement('div');
      element.innerHTML = this.getTable();
      this.element = element.firstElementChild;
      this.element = element;
  
      this.subElements = this.getSubElements(element);
  
      this.addEventListeners();
    }
  
    sortData(id, order) {
     const arr = [...this.data];
     const column = this.header.find(item => item.id === id);
     const {sortType} = column;
     const  direction = order === 'asc' ? 1 : -1;
  
     return arr.sort((a, b) => {
        switch (sortType) {
          case 'number':
            return direction * (a[id] - b[id]);
          case 'string':
            return direction * a[id].localeCompare(b[id], 'ru');
          case 'custom':
            return direction * customSorting(a, b);
          default:
            return direction * (a[id] - b[id]);
        }
      });    
    }
  
    onSortClick = event => {
     const column = event.target.closest('[data-sortable="true"]');
  
     const toggleOrder = order => {
        const orders = {
          asc: 'desc',
          desc: 'asc'
        };
  
        return orders[order];
      };
  
     if (column) {
        const { id, order } = column.dataset;
        const sortedData = this.sortData(id, toggleOrder(order));
        const arrow = column.querySelector('.sortable-table__sort-arrow');
  
        column.dataset.order = toggleOrder(order);
  
        if (!arrow) {
          column.append(this.subElements.arrow);
        }
  
        this.subElements.body.innerHTML = this.getTableRows(sortedData);
      }
    };
  
    addEventListeners() {
      this.subElements.header.addEventListener('pointerdown', this.onSortClick);
    }
  
    remove() {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
      this.subElements = {};
    }
}
