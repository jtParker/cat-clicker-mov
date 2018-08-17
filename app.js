var model = {
  selectedCat : null,
  adminView : false,

  cats: [
    {
      name : 'Fluffy',
      image : 'images/cat.jpg',
      clickCount : 0
    },
    {
      name : 'Furry',
      image : 'images/cat2.jpg',
      clickCount : 0
    },
    {
      name : 'Hairy',
      image : 'images/cat3.jpeg',
      clickCount : 0
    },
    {
      name : 'Baldy',
      image : 'images/cat4.jpeg',
      clickCount : 0
    },
    {
      name : 'Mittens',
      image : 'images/cat5.jpg',
      clickCount : 0
    }
  ]
};

var octopus = {

  init : function() {
    model.selectedCat = model.cats[0];

    catView.init();
    catListView.init();
    adminView.init();

  },

  getCats : function() {
    return model.cats;
  },

  getCurrentCat : function() {
    return model.selectedCat;
  },

  setCurrentCat : function(cat) {
    model.selectedCat = cat;
  },

  incrementCat : function() {
    model.selectedCat.clickCount++;
    catView.render();
  },

  setNewValues : function(name, img, clicks) {
    model.selectedCat.name = name;
    model.selectedCat.image = img;
    model.selectedCat.clickCount = clicks;
    catView.render();
  }

};

var catView = {

  init : function() {
    this.nameElem = document.getElementById('cat-name');
    this.clickElem = document.getElementById('cat-clicks');
    this.imgElem = document.getElementById('cat-img');

    this.imgElem.addEventListener('click', function() {
      octopus.incrementCat();
    });

    this.render();
  },

  render : function() {
    var currentCat = octopus.getCurrentCat();
    this.nameElem.innerHTML = currentCat.name;
    this.clickElem.innerHTML = currentCat.clickCount;
    this.imgElem.src = currentCat.image;
  }

};

var catListView = {

  init : function() {
    this.catListElem = document.getElementById('cat-list');

    this.render();
  },

  render : function() {
    var cats = octopus.getCats();

    this.catListElem.innnerHTML = '';

    for(var i = 0; i < cats.length; i++) {
      var cat = cats[i];
      var btn = document.createElement('li');
      btn.textContent = cat.name;

      btn.addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setCurrentCat(catCopy);
            catView.render();
          };
      })(cat));

      this.catListElem.appendChild(btn);
    }
  }
};

var adminView = {

  init : function() {
    var newName, newImg, newClicks;
    this.adminCont = document.getElementById('admin-cont');
    this.adminBtn = document.getElementById('admin-btn');
    this.cancelBtn = document.getElementById('cancel-btn');
    this.saveBtn = document.getElementById('save-btn');
    var adminSec = document.getElementById('admin-section');

    // this.adminCont.addEventListener('click', function(e) {
    //     target = e.target;
    //
    //     if (target === this.adminBtn) {
    //       this.render();
    //     }
    //
    //     if (target === this.cancelBtn) {
    //       this.render();
    //     }
    //
    //     if (target === this.saveBtn) {
    //       newName = document.getElementById('edit-name').value;
    //       newImg = document.getElementById('edit-img').value;
    //       newClicks = document.getElementById('edit-clicks').value;
    //
    //       octopus.setNewValues(newName, newImg, newClicks);
    //     }
    // });
    this.adminBtn.addEventListener('click', function() {
      adminSec.classList.toggle('closed');
    });

    this.cancelBtn.addEventListener('click', function() {
      adminSec.classList.toggle('closed');
    });

    this.saveBtn.addEventListener('click', function() {
      newName = document.getElementById('edit-name').value;
      newImg = document.getElementById('edit-img').value;
      newClicks = document.getElementById('edit-clicks').value;

      octopus.setNewValues(newName, newImg, newClicks);
      adminSec.classList.toggle('closed');
    });
  },
};

octopus.init();
