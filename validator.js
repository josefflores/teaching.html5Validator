function getMetaProperty(tag, property) {
    var metas = document.getElementsByTagName(tag);
    var lang = '';

    if( Object.prototype.toString.call( metas ) !== '[object Array]' )
        metas = [metas];

    //console.log(metas);
    metas.forEach(function(meta, i , arr) {
        if (meta[i].getAttribute(property))
            lang = meta[i].getAttribute(property);
    });

    return lang;
}

function hasTag(tag){
    return document.getElementsByTagName(tag) ? true: false;
}

function tagPresentLog(test, tag, msg){
    console.log(tag, ':', msg, '-', test);
}

function validate(){
    var url = "https://validator.w3.org/nu/?doc=";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){

            var el = document.createElement( 'tmp' );
            el.innerHTML = this.responseText;
            arr = el.getElementsByTagName( 'p' );
            val = false;

            for(i=0; i< arr.length;++i)
                if (arr[i].className === 'success')
                    val = true;

            console.log("w3 validation", '-',val);
        }
    };
    xhttp.open("GET", url+encodeURIComponent(document.URL), true);
    xhttp.send();
}

// HTML5 requirements
window.onload = function(){
    console.log('UML HTML5 TEST VALIDATOR');
    console.log("* some browsers auto generate body and head tag and will throw results off.");

    ['head', 'body'].forEach(function(tag, i, arr){
        tagPresentLog(hasTag(tag), tag, 'The element is present *');
    });
    tagPresentLog((document.title ? true: false),'title', (document.title ));
    [
        {
            elem: 'html',
            prop: 'lang',
            val:'en'
        },
        {   elem:'meta',
            prop: 'charset',
            val: 'utf-8'
        }
    ].forEach(function(test, i, arr){
        var ret = getMetaProperty(test.elem, test.prop) === test.val ? true: false;
        console.log(test.elem, '[', test.prop,']','-', ret);
    });

    validate();
};

