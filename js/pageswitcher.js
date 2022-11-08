// tab Switcher

const tab_switcher = document.querySelectorAll('[data-switcher]');

for (let i = 0; i < tab_switcher.length; i++){
    const tab_switch = tab_switcher[i];
    const page_id = tab_switch.dataset.tab;

    tab_switch.addEventListener('click', () => {
        document.querySelector('.linkk.isActive').classList.remove('isActive')
        tab_switch.classList.add('isActive')

    })
}





// console.log("home")

const userName = window.prompt('Enter UserName');

document.getElementById('userN').textContent = `Welcome ${userName}`;





// Visitor Count Display 

const countEl = document.getElementById('counter');

visitorCountUpdate();

function visitorCountUpdate(){
fetch('https://api.countapi.xyz/update/shopping/tech/?amount=1')
.then(res => res.json())
.then (res => {
    countEl.innerHTML = res.value;
});

console.log(res.value);
}

//search functionality

function inputFunction() {
let input = document.getElementById('myInput').value
input=input.toLowerCase();
let x = document.getElementsByClassName('box');
  
for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
    }
    else {
        x[i].style.display="list-item";                 
    }
}
}

let addItemId = 0;
function addToCart(item){
addItemId += 1;
let selectedItem = document.createElement('div');
selectedItem.classList.add('cartImg');
selectedItem.setAttribute('id', addItemId)
let img = document.createElement('img')
img.setAttribute('src', item.children[0].currentSrc)
let cartItems = document.getElementById('text-name');
selectedItem.append(img)
cartItems.append(selectedItem)
}

//ADDING AND REMOVING ITEMS FROM CART// LOCALSTRAGE

var cartId = "cart";
 
var localAdapter = {
 
    saveCart: function (object) {
 
        var stringified = JSON.stringify(object);
        localStorage.setItem(cartId, stringified);
        return true;
 
    },
    getCart: function () {
 
        return JSON.parse(localStorage.getItem(cartId));
 
    },
    clearCart: function () {
 
        localStorage.removeItem(cartId);
 
    }
 
};
 
var ajaxAdapter = {
 
    saveCart: function (object) {
 
        var stringified = JSON.stringify(object);
        // do an ajax request here
 
    },
    getCart: function () {
 
        // do an ajax request -- recognize user by cookie / ip / session
        return JSON.parse(data);
 
    },
    clearCart: function () {
 
        //do an ajax request here
 
    }
 
};
 
var storage = localAdapter;
 
var helpers = {
 
    getHtml: function (id) {
 
        return document.getElementById(id).innerHTML;
 
    },
    setHtml: function (id, html) {
 
        document.getElementById(id).innerHTML = html;
        return true;
 
    },
    itemData: function (object) {
 
        var count = object.querySelector(".count"),
            patt = new RegExp("^[1-9]([0-9]+)?$");
        count.value = (patt.test(count.value) === true) ? parseInt(count.value) : 1;
 
        var item = {
 
            name: object.getAttribute('data-name'),
            price: object.getAttribute('data-price'),
            id: object.getAttribute('data-id'),
            count: count.value,
            total: parseInt(object.getAttribute('data-price')) * parseInt(count.value)
 
        };
        return item;
 
    },
    updateView: function () {
 
        var items = cart.getItems(),
            template = this.getHtml('cartT'),
            compiled = _.template(template, {
                items: items
            });
        this.setHtml('cartItems', compiled);
        this.updateTotal();
 
    },
    emptyView: function () {
 
        this.setHtml('cartItems', '<p>Add some items to see</p>');
        this.updateTotal();
 
    },
    updateTotal: function () {
 
        this.setHtml('totalPrice', cart.total + '₹');
 
    }
 
};
 
var cart = {
 
    count: 0,
    total: 0,
    items: [],
    getItems: function () {
 
        return this.items;
 
    },
    setItems: function (items) {
 
        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var _item = this.items[i];
            this.total += _item.total;
        }
 
    },
    clearItems: function () {
 
        this.items = [];
        this.total = 0;
        storage.clearCart();
        helpers.emptyView();
 
    },
    addItem: function (item) {
 
        if (this.containsItem(item.id) === false) {
 
            this.items.push({
                id: item.id,
                name: item.name,
                price: item.price,
                count: item.count,
                total: item.price * item.count
            });
 
            storage.saveCart(this.items);
 
 
        } else {
 
            this.updateItem(item);
 
        }
        this.total += item.price * item.count;
        this.count += item.count;
        helpers.updateView();
 
    },
    containsItem: function (id) {
 
        if (this.items === undefined) {
            return false;
        }
 
        for (var i = 0; i < this.items.length; i++) {
 
            var _item = this.items[i];
 
            if (id == _item.id) {
                return true;
            }
 
        }
        return false;
 
    },
    updateItem: function (object) {
 
        for (var i = 0; i < this.items.length; i++) {
 
            var _item = this.items[i];
 
            if (object.id === _item.id) {
 
                _item.count = parseInt(object.count) + parseInt(_item.count);
                _item.total = parseInt(object.total) + parseInt(_item.total);
                this.items[i] = _item;
                storage.saveCart(this.items);
 
            }
 
        }
 
    }
 
};
 
document.addEventListener('', function () {
 
    if (storage.getCart()) {
 
        cart.setItems(storage.getCart());
        helpers.updateView();
 
    } else {
 
        helpers.emptyView();
 
    }
    var products = document.querySelectorAll('.product button');
    [].forEach.call(products, function (product) {
 
        product.addEventListener('click', function (e) {
 
            var item = helpers.itemData(this.parentNode);
            cart.addItem(item);
 
 
        });
 
    });
 
    document.querySelector('#clear').addEventListener('click', function (e) {
 
        cart.clearItems();
 
    });
 
 
});
