

$(document).ready(function() {
    let translations = {};
    var timer;

    $('#learn-translate').click( function() {
        // Validates source word input
        sourceWord = $('#source-word').val().trim();
        translationWord =  $('#translation-word').val().trim();

        if (sourceWord.length == 0 || translationWord.length == 0) {
            return;
        }
        if (sourceWord.replace(/\s+/g, " ").split(" ").length > 1) {
            alert("Please enter only one source word!");
            return;
        }
        
        // Check if translation exists before adding it
        if (sourceWord in translations) {
            alert("Translations exists!");
            return;
        }
        else {
            translations[sourceWord] = translationWord
        }
        // Lists translations
        $("ul").empty();
        for (let source in translations) {
            $('#known-translations').append("<li><span>&quot;" + source + "&quot; -> &quot;" + translations[source] + "&quot;&nbsp;&nbsp;</span><span class='remove-link'>Remove</span></li>");
        }
    });

    $('#known-translations').on("click", "span.remove-link", function(){
        // Extract translation key from list item selected for removal
        let item = $(this).closest('li').text();
        var extract = item.match(/^"\w+"/)[0];
        extract = extract.replace(/\"/g, "");
        if (extract in translations) {
            delete translations[extract];
        }
        $(this).closest('li').remove();
    });
    
    $('#translate-box').on('keyup', function (e) {
        // Resets timer on keyup
        if (timer != null) {
            clearTimeout(timer);
        }
        var enteredText = $(this).val();
        timer = setTimeout(function(){translate(enteredText)}, 1000);
    }); 

    $('#translation-word').on('keyup', function (e) {
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            $( "#learn-translate" ).trigger( "click" );
          };
    }); 

    function translate(enteredText) {

        var words = enteredText.trim().replace(/\s+/g, " ").split(" ");
        var wordsTranslated = ""

        words.forEach(function(word) {
            if (word in translations) {
                wordsTranslated += translations[word] + " ";
            }
        });
        wordsTranslated = wordsTranslated.trim();
       
        var resultElement = document.getElementById("translation-result");
        resultElement.textContent = wordsTranslated;
    }

});