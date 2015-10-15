/**
 * Created by samoylova on 19.06.15.
 */
 Storage = function(){
        this.data = [];
        this.dataMap = {};
    };
    Storage.prototype.data = [];
    Storage.prototype.dataMap = {};
    Storage.prototype.add = function (object){
        if(this.dataMap[object.id]) {
            throw new Error("item with id '" + object.id + "' already exists");
        }
        this.dataMap[object.id] = object;
        this.data.push(object);
        this.onAdd(object);
    };
    Storage.prototype.remove = function (id){
        var
                item = this.dataMap[id],
                itemIdx = this.data.indexOf(item);
        this.data.splice(itemIdx, 1);
        delete this.dataMap[id];

        this.onRem(item);
    };
    Storage.prototype.edit = function (id, property, value){

        var item = this.dataMap[id];
        item[property] = value;
        this.onEdit(item, property, value);
    };

    Storage.prototype.on = function(eventName, callback){
        $.aop.after({method: eventName, target: this}, callback);
    };

    Storage.prototype.onAdd = function(object) {
        return object;
    };
    Storage.prototype.onRem = function(object) {
        return object;
    };
    Storage.prototype.onEdit = function(item, prop, val) {
        return {item: item, prop: prop, val: val};
    };


    List = function(id, options){
        $.extend(this, options);
        this.$element = $(id);
        this.$ul      = $('<ul></ul>');
        this.$element.append(this.$ul);

    };

    List.prototype.namespace = 'List';
    List.prototype.addItem  = function(value, id) {
        id = id || List.autoincrement();
        id = this.namespace + id;

        if(this.$ul.find('#' + id).length) {
            throw new Error("item with id '" + id + "' already exists");
        }
        this.$ul.append('<li id="'+ id + '">' + value + '</li>');
    };

    List.prototype.removeItem = function(id) {
        this.$ul.find('#' + this.namespace + id).remove();
    };
    List.prototype.editItem = function(id, value) {
        id = this.namespace + id;
        var idx  = this.$ul.find('#' + id);
        idx.html(value);


    };


    List.__counter__ = 0;
    List.autoincrement = function(){
         List.__counter__++;
        return List.__counter__;
    };


    StorageAwareList = function(id, options) {
        List.apply(this, arguments);
        var self      = this;
        
        this.storage.on('onAdd', function(object){
            self.addItem(object.name, object.id);
        });
        this.storage.on('onRem', function(object){
            self.removeItem(object.id);
        });
        this.storage.on('onEdit', function(params){
            self.editItem(params.item.id, params.val);
        })
    };

    StorageAwareList.prototype = Object.create(List.prototype);

    var store = new Storage();
    var list = new StorageAwareList('#list', {
        storage: store
    });

    store.add({id: 5, name: 'John Lennon'});
    store.add({id: 6, name: 'Jvghkohn Lennon'});
    store.add({id: 4, name: 'John Levhjknnon'});










