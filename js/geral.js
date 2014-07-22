$(document).ready(function(){

    /* --------------------------------FUNÇÕES E LÓGICAS FEITAS POR DOUGLAS JULIÃO -----------------------------*/

    $.ajaxSetup({cache: false}); //Não salvar pagina em cache.

    //Menu - Indice
    $("#menu-indice").menu();

    //variaveis para os numeros randomicos criados em javascript.
    var efeitoentrar = randomefeito();
    var efeitosair = randomefeitosair();

    $("#conteudo-section-direita").load("home.html");
    
    $("#menu-indice li").click(function(){
         var page = $(this).attr("id");
         $("#conteudo-section-direita").load(page+".html");

            
        //Add class para o menu atual
        $('#'+page).addClass('current-menu').siblings().removeClass('current-menu');
    });

});

// FUNÇÃO HIGHTLIGHT  <PRE>.
    function hightlight(){
        $('pre code').each(function(i, e) {
            hljs.highlightBlock(e)
        }); 
    }



/*  //////////////////////////
    // MENU BOTOES INTERNOS //
    //////////////////////////  
    
        hide: será o id ou class usado para esconder e mostrar o conteúdo
        menuLi: pegara o seletor + li .
        slides: retorna um array com os conteúdos específicos.

*/
var botoesMenu = function(hide,menuLi,slides){
    var hidecontent = $(hide),
        menuli = $(menuLi);

    hidecontent.hide();
    menuli.on("click",function(){
        var idbotao = $(this).attr('id'),
            botaoativo = $("#"+idbotao);

        hidecontent.show();

        //seletores dos contents display da página
        var slidesArray = slides;

        //estilo do menu interno quando ativo ou inativo.
        menuli.removeClass('background-active');
        botaoativo.addClass('background-active');

        //console.log(slidesArray);

        $.each(slidesArray,function(i,valor){
            if(i == idbotao){
                valor.effect("slide");
                //console.log(valor);
            }else{
                valor.hide();
            }
        });
    });
};

//função para randomizar os efeitos de entrada de conteúdo
function randomefeito(){
    var numero = Math.floor(Math.random() * 3) + 1;
    var efeitoarray = new Array();
        efeitoarray[1] = "bounce";
        efeitoarray[2] = "shake";
        efeitoarray[3] = "slide";

    return efeitoarray[numero];
}
//função para randomizar os efeitos de saida de conteúdo
function randomefeitosair(){
    var numero = Math.floor(Math.random() *7)+1;
    var efeitoarray = new Array();
    efeitoarray[1] = "blind";
    efeitoarray[2] = "clip";
    efeitoarray[3] = "drop";
    efeitoarray[4] = "explode";
    efeitoarray[5] = "fade";
    efeitoarray[6] = "fold";
    efeitoarray[7] = "puff";

    return efeitoarray[numero];
}
