// tablesort.js

class TableSortable extends HTMLTableElement {

  constructor() {
    // Always call super first in constructor
    super();
    // do not much here as the initialization is not yet complete
  } // constructor

  connectedCallback() {
    // ... is called when the html element and descendants are ready
    this.addEventListener("click", this.on_click);
  }

  compareText(a, b) {
    if (a.key < b.key) { return -1; }
    else if (a.key > b.key) { return 1; }
    else { return 0; }
  } // compareText


  sortTable(col, fCmp) {
    // get the body element of the table as we like to analyze and shift rows around.
    // @type HTMLTableSectionElement
    var tbody = this.querySelector('tbody');

    // create a list of {key,value} elements to be sorted 
    var data = [];
    tbody.querySelectorAll('tr').forEach(tr => {
      data.push({
        key: tr.children[col].innerText.toLowerCase(),
        val: tr
      })
    });
    // sort and apply to table in ascending order 
    data.sort(fCmp).forEach(r => tbody.appendChild(r.val));
  } // sortTable()


  elementIndex(/** @type HTMLElement */parent, /** @type HTMLElement */node) {
    var idx = -1;
    if (parent && node) {
      var e = parent.firstElementChild;
      while (e) {
        idx++;
        if (e === node) { return (idx); }
        e = e.nextElementSibling;
      }
    }
    return (-1);
  } // elementIndex()


  on_click(/** @type MouseEvent */e) {
    var tar = /** @type HTMLElement */(e.target);

    if (tar.tagName === 'TH') {
      var n = this.elementIndex(tar.parentElement, tar);
      this.sortTable(n, this.compareText);
    } // if
  } // on_click()

} // class

customElements.define('table-sortable', TableSortable, { extends: 'table' });
