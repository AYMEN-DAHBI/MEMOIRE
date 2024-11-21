function _(x){ return document.querySelector(x)}

var webroot = location.protocol+'//'+window.location.host+'/';

var config = {

    'url': webroot,
    'loader': webroot+'gla-adminer/assets/image/loader.gif'

}

if(NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function(callback){
        [].forEach.call(this, callback);
    }
}

var c_ajax = {

    getObj : function(){

        var xhr = false;

        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }

        return xhr;

    },

    load : function(url,data,callback,load){

        var xhr = this.init();
        if(!xhr||!url) return;
        if (xhr.overrideMimeType) xhr.overrideMimeType('text/plain');

        var formData = new FormData();

        for(var i in data){
            formData.append(i, data[i]);
        }


        if(load){

            loadBox();

            xhr.upload.addEventListener("progress", function(e) {
                var per = (e.loaded / e.total) * 100;
                Q('#PR #PRB').style.width = Math.round(per)+'%';
                Q('#PR #PRB #PRP').innerHTML = Math.round(per)+' %';
                Q('#TSZ').innerHTML = Math.round(e.total / 1024);
            }, true);

        }

        xhr.open('POST', config.url+'theme/control/ajax/'+url+'.php', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {

                var result = "";
                if(xhr.responseText) result = xhr.responseText;

                if(callback) callback(result);

            } else {

                return 0;
            }
        }

        xhr.send(formData);

    },

    init : function() {return this.getObj();}

}

// ----- Panier

function panier(ref, add){

    if(add == undefined) add = true

    const p = document.querySelector('#panier')

    c_ajax.load('panier',{'ref':ref,'add':add}, function(data){

        if(data !== 'error') p.innerHTML = data

        if(add == true) alert('Ajouté au panier')

        if(add == false) window.location.reload()

    },false)

}

// ----- Favoris

function favorite(id, e){

    if(e.classList.contains('isfav')){

        e.classList.remove('isfav')
        e.querySelector("span").style.color = "rgba(0,0,0,.2)"

    }else{

        e.classList.add('isfav')
        e.querySelector("span").style.color = "#ff0000"

    }

    c_ajax.load('favorite',{'id':id}, function(data){

        if(data == 'error') alert("Impossible d'ajouter ce produit aux favoris")

    },false)

}

// ----- Slider
/*
var slider = function(childs, slide, time, cw){

    var img = document.querySelectorAll(childs)
    var slider = _(slide);

    if(!time) time = 4000;

    var opt = {

        t : (time * 1000),
        w : cw.innerWidth || cw.clientWidth,
        h : cw.innerHeight || cw.clientHeight

    }

    slider.style.width = (img.length * opt.w)+'px';


    for(var i = 0;i < img.length; i++){

        img[i].style.width = opt.w+'px';
        img[i].style.height = opt.h+'px';

    }

    var j = 1;

    var fade = function(){

        if(j >= (img.length)){

            j = 0;

        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        slider.classList.toggle('anim');

        j++;

    }

    _('#nx').addEventListener('click',function(){
        j++;

        if(j >= (img.length)){

            j = 0;

        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        clearTimeout(fade);

    });

    _('#pr').addEventListener('click',function(){

        if(j == 0){
            j = (img.length - 1);
        }else{
            j--;
        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        clearTimeout(fade);

    });

    setInterval(fade,opt.t);

}

*/

var carousel = function(slide, time){

    var img = document.querySelectorAll(slide+' img')
    var slider = _(slide);

    if(!time) time = 4000;

    var opt = {

        t : (time * 1000),
        w : 300

    }

    slider.style.width = (img.length * opt.w)+'px';


    for(var i = 0;i < img.length; i++){

        img[i].style.width = opt.w+'px';

    }

    var j = 1;

    var fade = function(){

        if(j >= (img.length)){

            j = 0;

        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        j++;

    }

    _('#nx').addEventListener('click',function(){
        j++;

        if(j >= (img.length)){

            j = 0;

        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        clearTimeout(fade);

    });

    _('#pr').addEventListener('click',function(){

        if(j == 0){
            j = (img.length - 1);
        }else{
            j--;
        }

        slider.style.transform = 'translateX(-'+(j * opt.w)+'px)';

        clearTimeout(fade);

    });

    setInterval(fade,opt.t);

}

function menushow(t){

  t.parentNode.classList.toggle("open")

}

var slider = function (childs, slide, time, cw) {

    var img = document.querySelectorAll(childs)
    var slider = _(slide);

    for(x = 0; x < 3; x++){

        document.querySelectorAll(childs).forEach(function (elem) {

            newImg = elem.cloneNode()
            newImg.innerHTML = elem.innerHTML

            slider.appendChild(newImg)

        })

    }

    var img = document.querySelectorAll(childs)

    if (!time) time = 4000;

    var opt = {

        t: (time * 1000),
        w: cw.innerWidth || cw.clientWidth,
        h: cw.innerHeight || cw.clientHeight

    }

    slider.style.width = (img.length * opt.w) + 'px';


    for (var i = 0; i < img.length; i++) {

        img[i].style.width = opt.w + 'px';
        img[i].style.height = opt.h + 'px';

    }

    var j = 1;

    var fade = function () {

        if (j >= (img.length)) {

            j = 0;

        }

        slider.style.transform = 'translateX(-' + (j * opt.w) + 'px)';

        slider.classList.toggle('anim');

        j++;

    }

    _('#nx').addEventListener('click', function () {
        j++;

        if (j >= (img.length)) {

            j = 0;

        }

        slider.style.transform = 'translateX(-' + (j * opt.w) + 'px)';

        clearTimeout(fade);

    });

    _('#pr').addEventListener('click', function () {

        if (j == 0) {
            j = (img.length - 1);
        } else {
            j--;
        }

        slider.style.transform = 'translateX(-' + (j * opt.w) + 'px)';

        clearTimeout(fade);

    });

    setInterval(fade, opt.t);

}
