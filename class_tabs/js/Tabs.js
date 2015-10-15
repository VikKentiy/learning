/**
 * Created by samoylova on 19.06.15.
 */
function Tabs (domElement, options) {
    this.$element      = $(domElement);
    this.$ul           = this.$element.find(this.$ulSelector);
    this.$tabCont      = this.$element.find(this.$tabContainer);
    this.$contentTitle = this.$element.find(this.$contentTitleSelector).toArray();
    this.$content      = this.$element.find(this.$contentSelector).toArray();
    this.$title        = this.$element.find(this.$titleSelector).toArray();
    var self = this;
    this.$ul.on('click', 'a', function(event){
        var id = $(this).attr('href');
        self.$tabCont.find('div').hide();
        $(id).show();
    })
}

Tabs.prototype.$element              = null;
Tabs.prototype.$ulSelector           = '.title';
Tabs.prototype.$ul                   = null;
Tabs.prototype.$tabContainer         = '#content';
Tabs.prototype.$contentTitle         = [];
Tabs.prototype.$contentTitleSelector = 'h3';
Tabs.prototype.$content              = [];
Tabs.prototype.$contentSelector      = 'p';
Tabs.prototype.$title                = [];
Tabs.prototype.$titleSelector        = 'a';

Tabs.prototype.setTitle = function (idx, value) {
    var title = this.$title[idx];
    $(title).text(value);
};

Tabs.prototype.setContentTitle = function(idx, value){
    var title = this.$contentTitle[idx];
    $(title).text(value);
};

Tabs.prototype.setContent = function (idx, value1, value2) {
    if (value2){
        this.setContentTitle(idx, value2);
    }
    var content = this.$content[idx];
    if (value1.nodeType) {
        $(content).html(value1);
    } else if (typeof value1 == 'string') {
        $(content).text(value1);
    }
};
//===============================================================//




var tabs = new Tabs($('#tabs'));










