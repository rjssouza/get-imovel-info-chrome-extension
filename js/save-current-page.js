function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);

    alert('Texto copiado para área de transferência');
}

var copyImovel = () => {
    function getFromIdealista() {
        var title = $('.main-info__title-main');
        var price = $('.info-data-price');
        var sentence = getSentence(title, price, window.location.href);

        var result = sentence.replace(/[\r\n]+/gm, "");

        return result ? result : null;
    }

    function getFromImovirtual() {
        var title = $('h1[data-cy="adPageAdTitle"]');
        var price = $('strong[data-cy="adPageHeaderPrice"]');
        var sentence = getSentence(title, price, window.location.href);

        var result = sentence.replace(/[\r\n]+/gm, "");

        return result ? result : null;
    }

    function getSentence(title, price, href) {
        if (!$(title).text())
            return '';

        var description = $(title).text().replace(/[-.*+?^${}()|[\]\\]/g, "").trim() + " | " + $(price).text().replace(/ /g, '').trim();
        var sentence = description + " - " + href;

        return sentence;
    }

    var yoo = getFromIdealista() ?? getFromImovirtual();

    fallbackCopyTextToClipboard(yoo);
};

var getLocation = () => {
    function getLocationFromImovirtual() {
        var googleMapsUrl = $('a[title="Informar erros no mapa ou nas imagens para o Google"]').prop('href');
        if (!googleMapsUrl)
            return null;  
            
        var arr = googleMapsUrl.match(/\@[-?\d\.]*\,([-?\d\.]*)/gmi);
        if (arr.length <= 0)
            return null;
    
        return arr[0].replace("@", "");
    }
    
    function getLocationFromIdealista() {
        var googleMapsUrl = $('#sMap').prop('src');
        if (!googleMapsUrl)
            return null;  
      
        var arr = googleMapsUrl.match(/(\d*\.*\d*),(\d*\.*\d*).*&z/gmi);
        if (arr.length <= 0)
            return null;
    
        return arr[0].replace("&z", "");
    }

    var latLong = getLocationFromIdealista() ?? getLocationFromImovirtual();
    var url = `https://www.google.com/maps/search/?api=1&query=${latLong}`;
    
    window.open(url, '_blank').focus();
};

var copyList = () => {
    function getFromIdealista() {
        var result = Array.from(
            $(".item-info-container").map((item, val) => {
                var title = $(".item-link")[item];
                var price = $(".item-price.h2-simulated")[item];
                var container = $(".item-link")[item];
                var href = container ? container.href : 0;
                var sentence = getSentence(title, price, href);
    
                return sentence.replace(/[\r\n]+/gm, "");
            })
        ).join("\r\n");

        return result ? result : null;        
    }
    
    function getFromImovirtual() {
        var result = Array.from(
            $("article").map((item, val) => {
                var title = $(".offer-item-title")[item];
                var price = $(".offer-item-price")[item];
                var container = $("article a[data-tracking-data='{\"touch_point_button\":\"title\"}']")[item];
                var href = container ? container.href : 0;
                var sentence = getSentence(title, price, href);

                return sentence.replace(/[\r\n]+/gm, "");
            })
        ).join("\r\n");

        return result ? result : null;
    }    

    function getSentence(title, price, href){
        var sentence = $(title).text().replace(/[-.*+?^${}()|[\]\\]/g, "").trim() + " | " + $(price).text().replace(/ /g,'').trim() + " - " + href;

        return sentence;
    }

    var yoo = getFromIdealista() ?? getFromImovirtual();

    fallbackCopyTextToClipboard(yoo);
};

// window.onload = function(event){
//     //enter here the action you want to do once loaded
//     copyPageContent();
//     alert('Conteudo salvo no clipboard');
// }
// (function(){ copyImovel(); })();