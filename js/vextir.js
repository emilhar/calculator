/*!
 * @author Emil Hardarson
 */

function calc(){

    // Sækji og skrifa í form
    // Value sýnir íslenska framsetningu á tölunum
    // Numvalue geymir hreina tölu
    var lan = Number(document.getElementById('input1').value.replace(/[^0-9\.]/, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,''));
    document.getElementById('input1').value = lan.toLocaleString().replace(/,/g, '.');
    document.getElementById('input1').setAttribute('numvalue', String(lan));
    var timi = Number(document.getElementById('input2').value);
    var kaup = Number(document.getElementById('input3').value.replace(/[^0-9\.]/, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    document.getElementById('input3').value = kaup.toLocaleString().replace(/,/g, '.');
    document.getElementById('input3').setAttribute('numvalue', String(kaup));

    // Skilgreini stærðir
    var v_i = 0.06/12.0; // Innlendir vextir, 6% árlega
    var v_e = 0.019/12.0; // Erlendir vextir, 1.9% árlega
    monthly_saving = (((lan*v_i)/(1-Math.pow((1+v_i),(-timi*12)))) - ((lan*v_e)/(1-Math.pow((1+v_e),(-timi*12)))));

    var before_tax = 1.6*monthly_saving; // Gerum rað fyrir 49% tekjuskatti -> 1/(1-0.4) ~= 1.6
    var minutes_saved = Math.round(8*60*before_tax/kaup); // Hlutfall umfram vaxtakostnaðar fyrir skatt af mánaðarlaunum margfaldað með fjölda mínútna í vinnudegi
    var weeks_saved = Math.round(48*before_tax/kaup); // Hlutfall umfram vaxtakostnaðar fyrir skatt af mánaðarlaunum margfaldað með fjölda vikna í vinnu 'ári'

    var money_saved = String(Math.round(monthly_saving).toLocaleString().replace(/,/g, '.')); // Upphæðir með íslenskri framsetningu
    var minutes_saved_str = String(minutes_saved);
    var weeks_saved_str = String(weeks_saved);

    // Athuga eintölu eða fleirtölu:
    // Ef tala endar á '1' notum við eintölu
    // Nema ef síðustu tvær eru '11'
    // Dæmi: 591 króna, 7711 mínútur.
    if (minutes_saved_str.slice(-1) == "1" && minutes_saved_str.slice(-2) != "11") {
        var minute_text = "mínútu";
    }
    else {
        var minute_text = "mínútur";
    }
    if (weeks_saved_str.slice(-1) == "1" && weeks_saved_str.slice(-2) != "11") {
        var weeks_text = "vika";
        var er = " er "
    }
    else {
        var weeks_text = "vikur";
        var er = " eru "
    }
    if (money_saved.slice(-1) == "1" && money_saved.slice(-2) != "11") {
        var money_text = "krónu";
    }
    else {
        var money_text = "krónur";
    }

    // Uppfæri reiti í niðurstöðum
    $("#outPut1").html(money_saved + " " + money_text);
    $("#outPut2").html(minutes_saved_str + " " + minute_text);
    $("#outPut3").html(weeks_saved_str + " " + weeks_text);
    $("#outPut4").html(er);

    // Uppfæri lýsingu á niðurstöðum í 'Share' tökkum
    if ( minutes_saved > 0 ) {
        $("#shareBtn").attr('href',"http://www.facebook.com/dialog/feed?app_id=161235287796795&link=https://vidreisn.is/vextir&caption=Reiknivél&quote=Ég%20vinn%20" + minutes_saved_str + "%20"+ minute_text +"%20á%20dag%20fyrir%20séríslenskum%20vöxtum.%20Hvað%20með%20þig?");
        $("#twitterShareBtn").attr('href',href="https://twitter.com/intent/tweet?text=Ég%20vinn%20" + minutes_saved_str + "%20" + minute_text + "%20á%20dag%20fyrir%20séríslenskum%20vöxtum.%20Hvað%20með%20þig?%20https://vidreisn.is/vextir");
    }
    else {
        $("#shareBtn").attr('href',"http://www.facebook.com/dialog/feed?app_id=161235287796795&link=https://vidreisn.is/vextir&caption=Reiknivél");
        $("#twitterShareBtn").attr('href',href="https://twitter.com/intent/tweet?text=%20https://vidreisn.is/vextir");
    }


    // Passa að sparaðar vikur/mínútur verði ekki
    // fáránlega há
    if (weeks_saved <= 52) {
        $("#errorMsg").css("display", "none");
        $("#savingsMsg").css("display", "block");
    }
    else {
        $("#errorMsg").css("display", "block");
        $("#savingsMsg").css("display", "none");
    }

}